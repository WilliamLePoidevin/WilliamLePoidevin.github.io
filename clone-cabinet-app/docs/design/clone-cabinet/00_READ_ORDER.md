# Reading order for this package

1. `design_handoff_clone_cabinet_app/START_HERE.md` — how to set up the repo and build order
2. `design_handoff_clone_cabinet_app/README.md` — the authoritative UI/UX/motion/token spec
3. `INTEGRATION_GUIDE.md` — how the real dataset (this project's actual research) replaces the
   handoff's fictional seed data, including the live confidence-voting mechanic and known gaps
4. `CLONE_CABINET_UX_SPEC.md` — feature spec for Trade, Rating, Discover, and the community
   confidence system, covering functionality the design handoff doesn't fully detail yet
5. `data/` — the transformed, ready-to-use fragrances.json / lineage.json / houses.json
6. `source_data/` — the original pairing-centric dataset and the transform script that produced
   `data/`, kept in case the transform needs to be re-run (e.g. after the disputed-entry manual
   review described in INTEGRATION_GUIDE.md Section 5)
