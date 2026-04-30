# doddl Content Handoff — Salvaged from `mealtime-set-v2`

Source: `sections/mealtime-set-v2.liquid` (schema defaults, lines 422–555).
Target: `/pages/mealtime-development-box` and per-stage MDB pages.
Status: extracted 2026-04-30 for content writer review before Phase 1B build.

This document captures all reusable copy from the v2 mealtime-set section that will be retired at go-live. The Liquid section itself is not Impact-conventions compliant and will not be reused — this is a **content-only** handoff. Use this copy as a starting point; rewrite, expand, or replace as needed.

---

## 1. FAQs (6 questions, verbatim)

These are the existing FAQ defaults from the `faq` block. They are well-written, parent-friendly, and on-brand. Recommend lifting directly into the MDB hub page `collection_faq` metafield (or page metafield equivalent), then outputting via `FAQPage` JSON-LD per build-brief B.5.

### Q1
**My baby keeps throwing the spoon. Is that normal?**

Completely normal, and actually a good sign - it means they are engaging with it. Keep placing it back down. Every throw-and-retrieve is a motor skills workout. Consistency is key.

### Q2
**When should I move to the toddler cutlery?**

Around 12 months is a good guide, but follow your child's lead. When they are confidently picking up the baby cutlery and making attempts to feed themselves, they are ready to progress.

### Q3
**Do I need to teach my child how to hold the handle?**

No - that is the whole point of the design. The ergonomic shape naturally encourages the correct grip. Trust the product. Over-correcting can reduce confidence and slow progress.

### Q4
**When can I remove the suction from the bowl?**

When your toddler is not constantly sweeping the bowl off the tray, try the non-slip base. You can switch back any time. Some meals or environments still benefit from suction even at 2 years old.

### Q5
**Is the toddler knife really safe?**

Yes. The doddl toddler knife has a specially designed blade that can cut soft foods but is safe for small hands. The handle teaches the downward push motion, not a sawing motion.

### Q6
**My child is 3 and still struggling. Should I be worried?**

Every child develops at their own pace. The doddl set is used by occupational therapists with children who have developmental delays. If you have specific concerns, we always recommend speaking to your health visitor or GP.

---

## 2. Stage copy (from `stage_guide` block)

Section umbrella heading: **"Growing with your child"**

The existing file defines **3 stages**. The MDB locked URL architecture requires **4 stages** (Stage 1–4). **Stage 4 (3–5 years) does not exist and must be written from scratch — see Section 3 below.**

### Stage 1 — First Foods (6–12 months)

- **Stage name:** First Foods
- **Age range:** 6–12 months
- **Panel heading:** First foods, first wins
- **Body copy:** ⚠️ **Missing — no default in source. Needs writing.**

**Signs your child is ready:**
1. Sitting in a high chair with support
2. Reaching and grasping objects reliably
3. Bringing hand to mouth confidently
4. Showing real interest in what you eat

**Products for this stage:**

| # | Product name | Bullet 1 | Bullet 2 |
|---|---|---|---|
| 1 | Baby Spoon and Fork | Ergonomic handle for tiny fists | Soft tip, safe for gums |
| 2 | 2-in-1 Suction Bowl | Suction base keeps it in place | Converts to non-slip when ready |
| 3 | 2-in-1 Plate | Raised back helps scoop food | Suction base option available |

---

### Stage 2 — Building Control (12–18 months)

- **Stage name:** Building Control
- **Age range:** 12–18 months
- **Panel heading:** More confident, more independent
- **Body copy:** ⚠️ **Missing — no default in source. Needs writing.**

**Signs your child is ready:**
1. Getting food to mouth more reliably
2. Showing a clear hand preference
3. Attempting to scoop independently
4. Eating a wider range of textures

**Products for this stage:**

| # | Product name | Bullet 1 | Bullet 2 |
|---|---|---|---|
| 1 | Toddler Spoon and Fork | Wider handle for developing grip | Encourages correct hold naturally |
| 2 | 2-in-1 Suction Bowl | Switch to non-slip base when ready | Great for thicker foods and mashes |
| 3 | 2-in-1 Plate | Raised edges help load the fork | Ideal for finger foods too |

---

### Stage 3 — Growing Skills (18 months – 3 years)

- **Stage name:** Growing Skills
- **Age range:** 18 months – 3 years
- **Panel heading:** Ready for the full set
- **Body copy:** ⚠️ **Missing — no default in source. Needs writing.**

**Signs your child is ready:**
1. Using fork and spoon with confidence
2. Interested in cutting their own food
3. Eating most family meals
4. Sitting at the table independently

**Products for this stage:**

| # | Product name | Bullet 1 | Bullet 2 |
|---|---|---|---|
| 1 | Toddler Knife | Safe blade cuts soft food only | Teaches downward push motion |
| 2 | Toddler Spoon and Fork | Full grip control developing | Works alongside the knife |
| 3 | 2-in-1 Plate | Stable surface for cutting practice | Raised back guides food onto utensil |

---

## 3. Stage 4 (3–5 years) — MISSING, MUST BE WRITTEN

🚨 **This stage does not exist in the source file.** It is required by the locked URL architecture (`/pages/mealtime-development-box-stage-4-3-5-years` and `/collections/toddler-cutlery-stage-4-3-5-years`). The content writer must produce all of the following before Phase 1B build can complete the MDB stage panels and the homepage stage-journey-tabs section:

| Field | Status |
|---|---|
| Stage name | Missing — suggested working title: "Eating Independently" or "Family Meals" |
| Age range | 3–5 years (locked) |
| Panel heading | Missing |
| Body copy (2–3 sentences) | Missing |
| Sign 1 | Missing |
| Sign 2 | Missing |
| Sign 3 | Missing |
| Sign 4 | Missing |
| Product 1 — name + 2 bullets + image + URL | Missing |
| Product 2 — name + 2 bullets + image + URL | Missing |
| Product 3 — name + 2 bullets + image + URL | Missing |

**Tone/structure should match Stages 1–3 above** (4 short sign bullets, 3 product cards with 2 bullets each, parent-friendly, no clinical language). The stage 4 child is using cutlery confidently at family meals; product focus likely shifts toward the metal toddler / children's set, full plates, and possibly bib retirement.

---

## 4. Other gaps to flag for the writer

These apply across **all** stages including the existing 1–3:

| Gap | Where | Required by build-brief |
|---|---|---|
| Body copy (2–3 sentences) for Stages 1, 2, 3 | Per stage panel | Yes — build-brief D.5 / Section 6 specifies body copy per stage |
| Product images (real assets) | All 12+ product cards across stages | Yes |
| Product page URLs | All 12+ product cards | Yes |
| Stage panel "Expert quote" + attribution | Per stage | Build-brief 4.3 / 6.x — required for trust + LLM citation |
| Stage panel "Next stage teaser" | Per stage | Build-brief 4.3 — required for cross-panel flow |

---

## 5. Out of scope for this handoff

The source file also contains:

- **`intro_guide` block** with 4 age milestones (6–7m, 8–9m, 10–12m, 12+m) — useful for `/pages/mealtime-development-box-stage-1-6-12-months` if a milestone breakdown is wanted there. Not extracted here per scope; available in `sections/mealtime-set-v2.liquid` lines 519–531 if needed.
- **`banner` block** eyebrow/heading/body defaults — page-level intro copy. Not stage-specific.
- **`hotspots` block** — uses default hotspot text for 3 products (Baby Spoon and Fork, 2-in-1 Suction Bowl, 2-in-1 Plate). Same products as Stage 1; descriptions overlap.
- **Homepage stage-journey-tabs (Stage 0)** — separate gap. The homepage section requires Stage 0 (0–6 months, weaning prep, Klaviyo email-capture instead of product grid). Not part of MDB; flagged here so it isn't missed when the homepage build begins.

---

## 6. Writer checklist before build

- [ ] Stage 4 (3–5 years): all fields above
- [ ] Stage 1–3: body copy (2–3 sentences each)
- [ ] Stage 1–4: expert quote + attribution
- [ ] Stage 1–4: next stage teaser copy
- [ ] All product image assets sourced
- [ ] All product URLs confirmed against locked URL architecture in `CLAUDE.md`
- [ ] FAQs reviewed — keep, edit, or replace any of the 6 above
- [ ] Stage 0 (homepage only): full content per build-brief Section 3.3
