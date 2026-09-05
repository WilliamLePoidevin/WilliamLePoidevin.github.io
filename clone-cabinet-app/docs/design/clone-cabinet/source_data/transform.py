import json, re, hashlib

data = json.load(open('/home/claude/drydown-dupe-db/dupeData.json'))
houses_meta = {h['id']: h for h in data['houses']}

def slug(s, prefix):
    h = hashlib.md5(s.lower().encode()).hexdigest()[:8]
    return f"{prefix}-{h}"

# Normalizes a free-text inspiration/brand string into a clean dedup key.
# Source data sometimes bakes sourcing annotations directly into the name field
# ("Blue Talisman (both the EDP and Extrait versions, per source)") or combines
# two disputed candidates in one string. Strip that back to the bare name so the
# same real fragrance doesn't fragment into multiple objects.
KNOWN_SPELLING_VARIANTS = {
    "bleu talisman": "blue talisman",
    "cuir beluga": "cuir béluga",
}

def normalize_name(raw):
    s = raw.strip()
    # Drop anything from the first " (" onward (parenthetical annotations)
    s = re.split(r"\s*\(", s)[0]
    # Drop anything from the first " / " onward (disputed dual-candidate strings)
    s = re.split(r"\s*/\s*", s)[0]
    s = s.strip().rstrip(",")
    key = s.lower()
    key = KNOWN_SPELLING_VARIANTS.get(key, key)
    return s, key

def normalize_brand(raw):
    s = raw.strip()
    s = re.split(r"\s*/\s*", s)[0].strip()
    return s, s.lower()

# Confidence-tier -> seed vote tally + display confidence, per the agreed seeding table.
TIER_SEED = {
    "strong-consensus": {"confirmVotes": 15, "disputeVotes": 0, "confidence": 95, "verified": True},
    "contested":        {"confirmVotes": 5,  "disputeVotes": 1, "confidence": 70, "verified": False},
    "loose":            {"confirmVotes": 2,  "disputeVotes": 0, "confidence": 40, "verified": False},
    "community-verified": {"confirmVotes": 10, "disputeVotes": 0, "confidence": 85, "verified": False},
}
DISPUTED_SEED = {"confirmVotes": 5, "disputeVotes": 5, "confidence": 50, "verified": False}

fragrances = {}   # id -> fragrance object
lineage = {}      # id -> list of relation objects
fragrance_key_to_id = {}  # (name_key, house_key) -> id

def get_or_create_fragrance(raw_name, raw_house, is_dupe, house_id=None, region=None):
    display_name, name_key = normalize_name(raw_name)
    display_house, house_key = normalize_brand(raw_house)
    key = (name_key, house_key)
    if key in fragrance_key_to_id:
        return fragrance_key_to_id[key]
    fid = slug(name_key + "|" + house_key, "cc")
    fragrance_key_to_id[key] = fid
    fragrances[fid] = {
        "id": fid,
        "name": display_name,
        "house": display_house,
        "houseId": house_id,           # null for originals (not one of our clone houses)
        "isDupe": is_dupe,
        # Fields the source dataset does not contain — left explicit and null
        # rather than fabricated. See INTEGRATION_GUIDE.md "Fields left unpopulated".
        "year": None, "concentration": None, "accords": [], "score": None,
        "image": None, "thesis": None, "longevity": None, "projection": None,
        "sillage": None, "valueScore": None, "owners": None, "traders": None,
        "reviews": None, "family": None, "region": region, "price": None,
    }
    lineage[fid] = []
    return fid

added = 0
skipped_disputed_multi = []

for e in data['entries']:
    dupe_house_id = e['dupeHouse']
    hmeta = houses_meta.get(dupe_house_id, {})
    dupe_id = get_or_create_fragrance(
        e['dupeName'], hmeta.get('name', dupe_house_id),
        is_dupe=True, house_id=dupe_house_id, region=hmeta.get('country')
    )
    # fold in fields we DO have for the dupe side
    frag = fragrances[dupe_id]
    if e.get('priceUSD') is not None:
        frag['valueScore'] = e['priceUSD']
    if e.get('family'):
        frag['family'] = e['family']

    seed = dict(DISPUTED_SEED) if e.get('disputed') else dict(TIER_SEED.get(e['confidence'], TIER_SEED['loose']))
    source_note = e.get('note', '')[:180]

    orig_id = get_or_create_fragrance(e['inspiration'], e['inspirationBrand'], is_dupe=False)

    # Bidirectional lineage, matching the prototype's pattern exactly.
    lineage[dupe_id].append({
        "id": orig_id, "relation": "inspiration",
        "verified": seed["verified"], "confidence": seed["confidence"],
        "confirmVotes": seed["confirmVotes"], "disputeVotes": seed["disputeVotes"],
        "source": source_note, "disputed": bool(e.get('disputed')),
    })
    lineage[orig_id].append({
        "id": dupe_id, "relation": "interpretation",
        "verified": seed["verified"], "confidence": seed["confidence"],
        "confirmVotes": seed["confirmVotes"], "disputeVotes": seed["disputeVotes"],
        "source": source_note, "disputed": bool(e.get('disputed')),
    })
    added += 1

# Houses -> their house schema
out_houses = []
for h in data['houses']:
    count = sum(1 for e in data['entries'] if e['dupeHouse'] == h['id'])
    out_houses.append({
        "id": h['id'], "name": h['name'],
        "region": h.get('country'), "founded": h.get('founded'),
        "count": count, "note": h.get('packagingNote'),
    })

print(f"pairings processed: {added}")
print(f"unique fragrance objects created: {len(fragrances)}")
print(f"houses: {len(out_houses)}")

json.dump(list(fragrances.values()), open('fragrances.json', 'w'), indent=2)
json.dump(lineage, open('lineage.json', 'w'), indent=2)
json.dump(out_houses, open('houses.json', 'w'), indent=2)
