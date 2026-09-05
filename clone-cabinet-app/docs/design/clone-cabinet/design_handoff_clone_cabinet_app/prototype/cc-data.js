/* Clone Cabinet — seeded demo data. Fictional houses and fragrances; no real-world claims. */
window.CC = (function () {
  const IMG = ["luminous-capsule.png","object-portrait.png","cabinet-craft.png","porcelain-object.png",
               "amber-flacon.png","black-flacon.png","detail-crop.png","hero-lockup-object.png"];

  // id, name, house, year, conc, accords, score, img, thesis, long, proj, sill, value, owners, traders, reviews, family, region, price
  const ROWS = [
    ["cc-01","Luminous Capsule","Maison Verrier",2021,"Extrait",["Amber","Incense","Woody"],9.1,0,"A cold amber built around a single lit chamber.",88,64,59,72,137,42,214,"Amber","France","$$$$"],
    ["cc-02","Object Portrait","Atelier Nord",2019,"EDP",["Iris","Powder","Cedar"],8.7,1,"Iris kept at conservation temperature.",74,52,48,81,96,18,143,"Woody","Sweden","$$$"],
    ["cc-03","Cabinet Craft","House of Ledger",2016,"EDP",["Leather","Tobacco","Fig"],8.4,2,"Cabinet leather, warmed by hand.",81,70,66,69,212,57,308,"Leather","England","$$$"],
    ["cc-04","Porcelain Study","Studio Blanc",2023,"EDT",["Musk","Rice","Neroli"],8.2,3,"Clean without being clinical.",58,44,39,88,64,9,71,"Musk","Japan","$$"],
    ["cc-05","Amber Flacon 07","Dar Al Qamar",2018,"Extrait",["Oud","Amber","Rose"],9.0,4,"Taif rose folded into resin.",94,82,78,61,158,64,266,"Amber","UAE","$$$$"],
    ["cc-06","Black Flacon","Verrier Privé",2020,"Parfum",["Vetiver","Smoke","Salt"],8.6,5,"Vetiver read as mineral, not green.",79,57,54,74,88,21,112,"Aromatic","France","$$$$"],
    ["cc-07","Detail No. 4","Independent — R. Kaur",2022,"EDP",["Fig","Milk","Bay"],8.9,6,"Fig milk, six ingredients, no filler.",66,49,45,92,41,6,38,"Gourmand","India","$$"],
    ["cc-08","Archive Lockup","Maison Verrier",2013,"EDP",["Amber","Labdanum","Clove"],8.8,7,"The formula before the reformulation.",85,61,57,44,73,31,96,"Amber","France","$$$$"],
    ["cc-09","Chamber 09","Maison Verrier",2024,"Extrait",["Incense","Myrrh","Stone"],8.5,0,"Incense with the windows open.",83,55,51,70,52,11,44,"Amber","France","$$$$"],
    ["cc-10","Nord Vetiver","Atelier Nord",2017,"EDP",["Vetiver","Grapefruit","Moss"],8.3,5,"Cold vetiver, no sweetness allowed.",72,58,55,79,118,26,167,"Aromatic","Sweden","$$"],
    ["cc-11","Ledger Fig","House of Ledger",2020,"EDT",["Fig","Cedar","Green"],7.9,6,"Fig leaf read as wood.",61,47,43,84,143,19,131,"Fresh","England","$$"],
    ["cc-12","Qamar Oud 12","Dar Al Qamar",2015,"Extrait",["Oud","Saffron","Leather"],9.2,4,"Cambodian oud, no rose to soften it.",96,86,84,52,101,48,189,"Amber","UAE","$$$$"],
    ["cc-13","Rose Mineral","Dar Al Qamar",2022,"EDP",["Rose","Mineral","Pepper"],8.6,4,"Taif rose over wet stone.",77,63,60,73,84,22,97,"Floral","UAE","$$$"],
    ["cc-14","Studio Rice","Studio Blanc",2021,"EDT",["Rice","Almond","Musk"],8.0,3,"Rice water and a clean shirt.",55,41,37,90,72,14,63,"Musk","Japan","$$"],
    ["cc-15","Blanc Neroli","Studio Blanc",2019,"EDP",["Neroli","Petitgrain","Honey"],8.1,3,"Neroli with the bitterness kept in.",63,52,48,82,67,12,58,"Fresh","Japan","$$"],
    ["cc-16","Privé Salt","Verrier Privé",2023,"Parfum",["Salt","Ambergris","Driftwood"],8.7,5,"Ambergris without the beach cliché.",81,59,56,66,49,15,52,"Aromatic","France","$$$$"],
    ["cc-17","Kaur Bay","Independent — R. Kaur",2024,"EDP",["Bay","Clove","Cocoa"],8.4,6,"Bay leaf and cocoa nib, nothing else.",68,54,50,89,28,4,21,"Gourmand","India","$$"],
    ["cc-18","Editions No. 1","Cabinet Editions",2025,"Extrait",["Amber","Iris","Vanilla"],8.9,7,"The house's first release, and it knows it.",86,66,62,64,34,7,29,"Amber","Italy","$$$$"],
    ["cc-19","Editions Leather","Cabinet Editions",2025,"EDP",["Leather","Birch","Plum"],8.2,2,"Birch tar, kept polite.",75,64,61,76,26,5,18,"Leather","Italy","$$$"],
    ["cc-20","Nord Iris Grey","Atelier Nord",2014,"EDP",["Iris","Ash","Vetiver"],9.0,1,"Iris as grey pigment, not powder.",78,50,46,49,59,29,88,"Woody","Sweden","$$$$"],
  ];

  const fragrances = ROWS.map((r) => ({
    id: r[0], name: r[1], house: r[2], year: r[3], concentration: r[4], accords: r[5], score: r[6],
    image: IMG[r[7]], thesis: r[8], longevity: r[9], projection: r[10], sillage: r[11], valueScore: r[12],
    owners: r[13], traders: r[14], reviews: r[15], family: r[16], region: r[17], price: r[18],
    meta: [r[2], r[4], r[3]].join(" · "),
    accordLine: r[5].join(" / ").toUpperCase(),
  }));
  fragrances.find((f) => f.id === "cc-08").discontinued = true;
  fragrances.find((f) => f.id === "cc-20").discontinued = true;

  const byId = (id) => fragrances.find((f) => f.id === id) || fragrances[0];
  const pick = (...ids) => ids.map(byId);

  const houses = [
    { name: "Maison Verrier", region: "France · Grasse", founded: 1974, count: 3, note: "Amber, incense, and cold light." },
    { name: "Atelier Nord", region: "Sweden · Malmö", founded: 2009, count: 3, note: "Iris and vetiver, nothing warm." },
    { name: "House of Ledger", region: "England · London", founded: 1988, count: 3, note: "Leather kept in a wooden room." },
    { name: "Studio Blanc", region: "Japan · Kyoto", founded: 2016, count: 3, note: "Clean, quiet, exact." },
    { name: "Dar Al Qamar", region: "UAE · Dubai", founded: 1996, count: 3, note: "Oud and Taif rose, uncompromised." },
    { name: "Verrier Privé", region: "France · Paris", founded: 2011, count: 2, note: "The mineral line of the Verrier house." },
    { name: "Independent — R. Kaur", region: "India · Mumbai", founded: 2021, count: 2, note: "Six ingredients or fewer." },
    { name: "Cabinet Editions", region: "Italy · Milan", founded: 2025, count: 2, note: "New house, old restraint." },
  ];

  const collectors = [
    { handle: "@vasari", name: "Imre Vasari", level: "Curator", verified: true, trades: 64, region: "EU · Vienna", followers: "4.1k", following: 212, statement: "Ambers, resins, and anything reformulated badly.", accuracy: "98%", shipping: "1.2 days", response: "94%", contribution: "182 reviews", cabinet: ["cc-01","cc-08","cc-09","cc-12","cc-05","cc-20"] },
    { handle: "@nrahman", name: "Nadia Rahman", level: "Collector", verified: true, trades: 38, region: "UK · London", followers: "2.6k", following: 341, statement: "Oud maximalist. Will trade for Taif rose.", accuracy: "96%", shipping: "1.8 days", response: "89%", contribution: "74 reviews", cabinet: ["cc-05","cc-12","cc-13","cc-03"] },
    { handle: "@tlind", name: "Theo Lindqvist", level: "Connoisseur", verified: true, trades: 121, region: "SE · Malmö", followers: "9.3k", following: 88, statement: "Vetiver, mineral, salt. Nothing sweet.", accuracy: "99%", shipping: "0.9 days", response: "97%", contribution: "410 reviews", cabinet: ["cc-06","cc-10","cc-16","cc-02","cc-20"] },
    { handle: "@marisol", name: "Marisol Peña", level: "Enthusiast", verified: false, trades: 7, region: "MX · CDMX", followers: "310", following: 176, statement: "Building a first cabinet, slowly.", accuracy: "—", shipping: "2.6 days", response: "72%", contribution: "9 reviews", cabinet: ["cc-04","cc-11","cc-14"] },
    { handle: "@yadeyemi", name: "Yusuf Adeyemi", level: "Collector", verified: true, trades: 45, region: "US · Chicago", followers: "1.9k", following: 254, statement: "Leathers and tobacco. Decants welcome.", accuracy: "95%", shipping: "1.5 days", response: "91%", contribution: "63 reviews", cabinet: ["cc-03","cc-19","cc-17","cc-01"] },
    { handle: "@hsato", name: "Hana Sato", level: "Curator", verified: true, trades: 52, region: "JP · Kyoto", followers: "5.4k", following: 119, statement: "Iris, powder, and quiet.", accuracy: "97%", shipping: "1.1 days", response: "95%", contribution: "204 reviews", cabinet: ["cc-02","cc-20","cc-14","cc-15","cc-04"] },
    { handle: "@ebraun", name: "Elias Braun", level: "Collector", verified: false, trades: 12, region: "DE · Berlin", followers: "740", following: 402, statement: "Discontinued only.", accuracy: "88%", shipping: "3.1 days", response: "68%", contribution: "17 reviews", cabinet: ["cc-08","cc-20","cc-03"] },
    { handle: "@pnair", name: "Priya Nair", level: "Enthusiast", verified: true, trades: 19, region: "IN · Mumbai", followers: "1.2k", following: 288, statement: "Fig, milk, rice. Soft things.", accuracy: "94%", shipping: "2.0 days", response: "86%", contribution: "31 reviews", cabinet: ["cc-07","cc-17","cc-11","cc-14"] },
  ];
  const byHandle = (h) => collectors.find((c) => c.handle === h) || collectors[0];

  const reviews = [
    { id: "r1", fragrance: "cc-01", author: "Imre Vasari", level: "Curator", verified: true, score: 9.2, context: "Owns · 50ml · batch 21B", date: "12 Aug", body: "The chamber note is real — there is a cold, lit quality in the first twenty minutes that nothing else in my cabinet does. Batch 21B is drier than 19A.", reactions: [{ label: "Helpful", count: 84 }, { label: "Accurate", count: 41 }] },
    { id: "r2", fragrance: "cc-01", author: "Theo Lindqvist", level: "Connoisseur", verified: true, score: 8.4, context: "Sampled · 2ml decant", date: "4 Aug", body: "Excellent construction, but the amber turns slightly sweet on skin after an hour. Projection is modest for an extrait.", reactions: [{ label: "Good comparison", count: 27 }] },
    { id: "r3", fragrance: "cc-01", author: "Hana Sato", level: "Curator", verified: true, score: 9.0, context: "Owns · 100ml", date: "28 Jul", body: "Wears like a conservation studio: precise, quiet, faintly mineral. The interpretations are louder and less interesting.", reactions: [{ label: "Helpful", count: 62 }, { label: "Accurate", count: 30 }] },
    { id: "r4", fragrance: "cc-05", author: "Nadia Rahman", level: "Collector", verified: true, score: 9.4, context: "Owns · 75ml", date: "21 Aug", body: "The rose is Taif and it is not hiding. Resin closes over it after forty minutes and stays for the day.", reactions: [{ label: "Helpful", count: 51 }] },
    { id: "r5", fragrance: "cc-05", author: "Yusuf Adeyemi", level: "Collector", verified: true, score: 8.8, context: "Owns · 10ml decant", date: "9 Aug", body: "Closer to Luminous Capsule than most people admit, but warmer and less architectural. Worth owning both.", reactions: [{ label: "Good comparison", count: 44 }, { label: "Accurate", count: 12 }] },
    { id: "r6", fragrance: "cc-03", author: "Elias Braun", level: "Collector", verified: false, score: 8.1, context: "Owns · 100ml · 2018 batch", date: "30 Jul", body: "Leather is beautiful for two hours, then the fig takes over. The older batch held longer.", reactions: [{ label: "Helpful", count: 19 }] },
    { id: "r7", fragrance: "cc-12","author": "Theo Lindqvist", level: "Connoisseur", verified: true, score: 9.1, context: "Owns · 50ml", date: "18 Aug", body: "Uncompromising oud. If you need it to be wearable at the office, this is not the bottle.", reactions: [{ label: "Accurate", count: 38 }] },
    { id: "r8", fragrance: "cc-07", author: "Priya Nair", level: "Enthusiast", verified: true, score: 9.0, context: "Owns · 30ml", date: "2 Aug", body: "Fig milk done without sugar. Six ingredients and you can count them, which is the point.", reactions: [{ label: "Helpful", count: 33 }] },
    { id: "r9", fragrance: "cc-06", author: "Hana Sato", level: "Curator", verified: true, score: 8.6, context: "Sampled · 2ml", date: "27 Jul", body: "Salt and smoke over vetiver. Quiet, but it lasts and never turns sweet.", reactions: [{ label: "Helpful", count: 22 }] },
    { id: "r10", fragrance: "cc-20", author: "Imre Vasari", level: "Curator", verified: true, score: 9.0, context: "Owns · 50ml · pre-2016", date: "14 Jul", body: "Grey iris, ash, no powder. The current formulation is thinner; buy pre-2016 if you can find it.", reactions: [{ label: "Accurate", count: 57 }, { label: "Helpful", count: 41 }] },
  ];
  const reviewsFor = (id) => reviews.filter((r) => r.fragrance === id);

  const listings = [
    { id: "t-01", fragranceId: "cc-05", condition: "Full Presentation", fill: 92, presentation: "Box + pouch", handle: "@nrahman", wants: "Luminous Capsule, Archive Lockup", group: "verified", posted: "2 days ago", size: "75ml", batch: "18C" },
    { id: "t-02", fragranceId: "cc-08", condition: "Test Sprays Missing", fill: 88, presentation: "Bottle only", handle: "@vasari", wants: "Vetiver, anything mineral", group: "following", posted: "5 hours ago", size: "50ml", batch: "13A" },
    { id: "t-03", fragranceId: "cc-03", condition: "Decant", fill: 100, presentation: "10ml decant", handle: "@yadeyemi", wants: "Open to offers", group: "following", posted: "1 day ago", size: "10ml", batch: "20B" },
    { id: "t-04", fragranceId: "cc-06", condition: "Sealed", fill: 100, presentation: "Full presentation", handle: "@ebraun", wants: "Discontinued Verrier only", group: "seeking", posted: "3 days ago", size: "50ml", batch: "23A" },
    { id: "t-05", fragranceId: "cc-02", condition: "Partial", fill: 61, presentation: "Bottle only", handle: "@hsato", wants: "Porcelain Study", group: "network", posted: "6 days ago", size: "50ml", batch: "19B" },
    { id: "t-06", fragranceId: "cc-12", condition: "Full Presentation", fill: 74, presentation: "Box + pouch", handle: "@tlind", wants: "Chamber 09, Privé Salt", group: "verified", posted: "9 hours ago", size: "50ml", batch: "15A" },
    { id: "t-07", fragranceId: "cc-07", condition: "Decant", fill: 100, presentation: "5ml decant", handle: "@pnair", wants: "Open to offers", group: "network", posted: "4 days ago", size: "5ml", batch: "22A" },
    { id: "t-08", fragranceId: "cc-20", condition: "Partial", fill: 43, presentation: "Bottle only", handle: "@ebraun", wants: "Archive Lockup", group: "seeking", posted: "1 week ago", size: "50ml", batch: "14B" },
  ];

  // Four lineage groups, several relationship types each.
  const lineage = {
    "cc-01": [
      { id: "cc-08", relation: "original", verified: true, confidence: 100, source: "Editorial · house archive" },
      { id: "cc-09", relation: "flanker", verified: true, confidence: 81, source: "Editorial · house archive" },
      { id: "cc-05", relation: "interpretation", verified: true, confidence: 92, source: "Editorial · confirmed" },
      { id: "cc-18", relation: "interpretation", verified: false, confidence: 84, source: "412 collectors" },
      { id: "cc-03", relation: "alternative", verified: false, confidence: 78, source: "268 collectors" },
      { id: "cc-06", relation: "similar", verified: false, confidence: 71, source: "119 collectors" },
    ],
    "cc-05": [
      { id: "cc-12", relation: "original", verified: true, confidence: 100, source: "Editorial · house archive" },
      { id: "cc-13", relation: "flanker", verified: true, confidence: 88, source: "Editorial · house archive" },
      { id: "cc-01", relation: "inspiration", verified: true, confidence: 92, source: "Editorial · confirmed" },
      { id: "cc-18", relation: "alternative", verified: false, confidence: 76, source: "203 collectors" },
    ],
    "cc-03": [
      { id: "cc-19", relation: "interpretation", verified: false, confidence: 83, source: "154 collectors" },
      { id: "cc-11", relation: "flanker", verified: true, confidence: 79, source: "Editorial · house archive" },
      { id: "cc-17", relation: "similar", verified: false, confidence: 64, source: "61 collectors" },
    ],
    "cc-02": [
      { id: "cc-20", relation: "original", verified: true, confidence: 100, source: "Editorial · house archive" },
      { id: "cc-04", relation: "alternative", verified: false, confidence: 68, source: "97 collectors" },
      { id: "cc-14", relation: "similar", verified: false, confidence: 59, source: "44 collectors" },
    ],
  };

  const cabinet = [
    { id: "cc-01", status: "In Cabinet", acquired: "Mar 2023", year: 2023, size: "50ml", fill: 74, value: 410, worn: 9, last: "3 days ago", season: "Autumn" },
    { id: "cc-03", status: "In Cabinet", acquired: "Nov 2021", year: 2021, size: "100ml", fill: 48, value: 260, worn: 4, last: "2 weeks ago", season: "Winter" },
    { id: "cc-05", status: "For Trade", acquired: "Jun 2022", year: 2022, size: "75ml", fill: 92, value: 620, worn: 2, last: "1 month ago", season: "Winter" },
    { id: "cc-06", status: "In Cabinet", acquired: "Feb 2024", year: 2024, size: "50ml", fill: 88, value: 295, worn: 12, last: "Yesterday", season: "Summer" },
    { id: "cc-08", status: "Archived", acquired: "Aug 2019", year: 2019, size: "50ml", fill: 12, value: 540, worn: 0, last: "8 months ago", season: "Autumn" },
    { id: "cc-04", status: "Sampled", acquired: "Jan 2025", year: 2025, size: "2ml", fill: 30, value: 18, worn: 1, last: "5 weeks ago", season: "Spring" },
    { id: "cc-10", status: "In Cabinet", acquired: "May 2020", year: 2020, size: "100ml", fill: 66, value: 180, worn: 7, last: "1 week ago", season: "Summer" },
    { id: "cc-16", status: "In Cabinet", acquired: "Sep 2024", year: 2024, size: "50ml", fill: 95, value: 340, worn: 5, last: "4 days ago", season: "Summer" },
    { id: "cc-20", status: "For Trade", acquired: "Dec 2018", year: 2018, size: "50ml", fill: 39, value: 480, worn: 1, last: "3 months ago", season: "Winter" },
    { id: "cc-07", status: "Seeking", acquired: "—", year: 0, size: "—", fill: 0, value: 0, worn: 0, last: "—", season: "—" },
    { id: "cc-12", status: "Seeking", acquired: "—", year: 0, size: "—", fill: 0, value: 0, worn: 0, last: "—", season: "—" },
  ];

  const notifications = [
    { group: "Today", items: [
      { kind: "trade", title: "Nadia Rahman proposed a trade", detail: "Amber Flacon 07 · for Luminous Capsule", time: "18m", signal: true },
      { kind: "lineage", title: "Lineage updated · Luminous Capsule", detail: "Editions No. 1 confirmed as interpretation", time: "2h", signal: true },
      { kind: "follow", title: "Theo Lindqvist added Privé Salt", detail: "Now in his cabinet · 14 scents", time: "5h", signal: false },
    ]},
    { group: "This Week", items: [
      { kind: "verify", title: "Cabinet Verified · shipping confirmed", detail: "Trade t-03 delivered · condition matched", time: "2d", signal: true },
      { kind: "availability", title: "Archive Lockup available from a trusted seller", detail: "50ml · $540 · verified member", time: "3d", signal: false },
      { kind: "follow", title: "Hana Sato reviewed Nord Iris Grey", detail: "9.0 · \"Grey iris, ash, no powder.\"", time: "4d", signal: false },
    ]},
    { group: "Earlier", items: [
      { kind: "lineage", title: "Three new interpretations logged", detail: "Cabinet Craft group · community reported", time: "2w", signal: false },
      { kind: "trade", title: "Trade completed with Yusuf Adeyemi", detail: "Cabinet Craft decant · condition accurate", time: "3w", signal: false },
    ]},
  ];

  const me = {
    name: "Alex Renard", handle: "@arenard", level: "Collector", verified: true, region: "US · New York",
    followers: "1.4k", following: 186, statement: "Ambers and mineral vetivers. Slowly replacing everything sweet.",
    trades: 23, accuracy: "97%", shipping: "1.4 days", response: "92%", contribution: "48 reviews",
  };

  const purchaseLinks = [
    { seller: "Verrier Boutique", note: "House direct · 50ml", trust: "Authorised", price: "$385" },
    { seller: "The Archive Shop", note: "Verified retailer · 100ml", trust: "Verified", price: "$610" },
    { seller: "Decant Registry", note: "Member decant · 10ml", trust: "Member", price: "$74" },
  ];

  return { fragrances, byId, pick, houses, collectors, byHandle, reviews, reviewsFor, listings,
           lineage, cabinet, notifications, me, purchaseLinks };
})();
