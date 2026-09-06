-- Clone Cabinet v1.2 — lineage voting backend.
--
-- Scope is deliberately narrow: this backs ONLY the lineage confirm/dispute vote count,
-- the one feature the local-only build has always documented as impossible without a real
-- backend (every browser saw the same seed and only its own vote moved). Fragrances, houses,
-- and lineage relations themselves stay as bundled static JSON — there is no reason to move
-- genuinely static reference data into a live database.
--
-- Security model: the app has no accounts, so a "voter" is just a random UUID a browser
-- generates once and keeps in localStorage (src/data/voterId.ts) — the same trust level the
-- local-only version already had (one identity per browser). Because that id is not a real
-- authenticated identity, the anon key must NEVER be allowed to write vote counts directly
-- (a malicious client could otherwise set confirm_votes to anything it likes). Instead:
--   - RLS is enabled with no policies, and all privileges are revoked from anon/authenticated
--     on the raw table, so it is unreachable directly.
--   - All reads and writes go through SECURITY DEFINER functions that only ever increment by
--     inserting one row per (relation_key, voter_id) and compute counts by counting real rows.
--
-- Idempotent — safe to paste into the Supabase SQL Editor more than once.

create table if not exists cc_lineage_votes (
    relation_key text not null,
    voter_id uuid not null,
    vote_type text not null check (vote_type in ('confirm', 'dispute')),
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now()),
    primary key (relation_key, voter_id)
);

create index if not exists idx_cc_lineage_votes_relation_key on cc_lineage_votes (relation_key);

alter table cc_lineage_votes enable row level security;
-- No policies are created — RLS with zero policies denies all direct access by default.
revoke all on cc_lineage_votes from anon, authenticated;

-- Real, non-fakeable tally for one relation.
create or replace function get_vote_counts(p_relation_key text)
returns table(confirm_count bigint, dispute_count bigint)
language sql
security definer
set search_path = public
stable
as $$
    select
        count(*) filter (where vote_type = 'confirm') as confirm_count,
        count(*) filter (where vote_type = 'dispute') as dispute_count
    from cc_lineage_votes
    where relation_key = p_relation_key;
$$;

grant execute on function get_vote_counts(text) to anon, authenticated;

-- Cast (or retract, if repeating the same choice) one voter's vote on one relation, and
-- return the resulting real counts in the same round trip.
create or replace function cast_lineage_vote(p_relation_key text, p_voter_id uuid, p_vote_type text)
returns table(confirm_count bigint, dispute_count bigint)
language plpgsql
security definer
set search_path = public
as $$
begin
    if p_vote_type not in ('confirm', 'dispute') then
        raise exception 'invalid vote_type: %', p_vote_type;
    end if;

    -- Voting the same way again is a toggle-off, mirroring the original local-only behavior.
    if exists (
        select 1 from cc_lineage_votes
        where relation_key = p_relation_key and voter_id = p_voter_id and vote_type = p_vote_type
    ) then
        delete from cc_lineage_votes where relation_key = p_relation_key and voter_id = p_voter_id;
    else
        insert into cc_lineage_votes (relation_key, voter_id, vote_type, updated_at)
        values (p_relation_key, p_voter_id, p_vote_type, timezone('utc', now()))
        on conflict (relation_key, voter_id)
        do update set vote_type = excluded.vote_type, updated_at = timezone('utc', now());
    end if;

    return query select * from get_vote_counts(p_relation_key);
end;
$$;

grant execute on function cast_lineage_vote(text, uuid, text) to anon, authenticated;

-- Used by Settings' "Clear all local data" so retracting local data also retracts this
-- device's votes from the shared tally, rather than leaving orphaned influence behind.
create or replace function clear_voter_votes(p_voter_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
    delete from cc_lineage_votes where voter_id = p_voter_id;
$$;

grant execute on function clear_voter_votes(uuid) to anon, authenticated;
