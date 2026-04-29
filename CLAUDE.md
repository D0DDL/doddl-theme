# doddl Theme — Claude Code Context

## Project
Shopify theme development for doddl.com — children's cutlery and tableware brand.
Store: doddl-ltd.myshopify.com
Live theme: client-doddl/main (#179387498792)
Dev theme: Development Journey - Migration - 30Apr25 (#186189316392)

NEVER modify the live theme. All work happens in the dev theme only.

## High-Risk Files — Edit Only With Explicit Instruction
- layout/theme.liquid — global layout, hreflang tags, live international markets depend on this
- config/settings_data.json — live content values set via theme editor, overwriting will wipe merchant content
- templates/index.json — homepage section layout

## Stack & Apps
- Theme base: client-doddl/main (custom, Dawn-derived)
- Translations: Translate & Adapt app — never hardcode language strings
- Reviews: Opinew
- Email capture: Klaviyo
- Quiz: Octane AI
- Video: Tolstoy
- Upsell: Essential Upsell
- Payments messaging: Klarna On-Site Messaging
- Sections: Section Store (audit required before editing affected pages)

## Market Architecture
- UK: doddl.com (primary, en-GB)
- US: doddl.com/en-us/ (Shopify Markets — activation pending Phase 1C)
- DE: doddlbaby.de → migrating to doddl.com/de/ in Phase 2 (do not touch until Phase 2 briefed)

## Locked URL Architecture

### New Collections
/collections/weaning-stage-0-6-months
/collections/baby-cutlery-stage-1-6-12-months
/collections/toddler-cutlery-stage-2-12-18-months
/collections/toddler-cutlery-stage-3-18-months-3-years
/collections/toddler-cutlery-stage-4-3-5-years
/collections/bibs

### Renamed Collections (handle changes)
/collections/baby-cutlery (was discover-baby-cutlery)
/collections/toddler-cutlery (was discover-toddler-cutlery)
/collections/plates-and-bowls (was discover-plates-bowls)
/collections/bundles-and-kits (was gifting)

### New Pages
/pages/sen-feeding-journey
/pages/sen-feeding-journey-just-starting-out
/pages/sen-feeding-journey-finding-their-grip
/pages/sen-feeding-journey-building-confidence
/pages/sen-feeding-journey-eating-independently
/pages/mealtime-development-box
/pages/mealtime-development-box-stage-1-6-12-months
/pages/mealtime-development-box-stage-2-12-18-months
/pages/mealtime-development-box-stage-3-18-months-3-years
/pages/mealtime-development-box-stage-4-3-5-years
/pages/research-and-development

## Key File Locations
- templates/index.json — homepage section order
- layout/theme.liquid — global wrapper, hreflang, header/footer scripts
- config/settings_data.json — theme settings values
- sections/ — all Liquid section components
- templates/ — page type templates (JSON)
- assets/ — CSS, JS, images
- locales/ — translation strings

## Brand
Children's cutlery and tableware. Developmental journey positioning.
Tone: warm, knowledgeable, parent-friendly. Never clinical.
UK English primary. US English for /en-us/ content.

## Git Discipline
Commit before and after every session.
Format: "session end: [what was completed]"
Never commit directly to a phase without human review of preview URL first.

## Current Phase
Phase 1A — dev environment set up, baseline committed.
Next: Section Store audit, then Phase 1B template build.
