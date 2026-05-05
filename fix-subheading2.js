const fs = require('fs');

// Fix 1: Increase sub_heading_size range max in the section schema
let c = fs.readFileSync('sections/stage-journey-tabs.liquid', 'utf8');

c = c.replace(
  /"id":\s*"sub_heading_size"[^}]+}/,
  `"id": "sub_heading_size", "type": "range", "label": "Sub-heading size", "min": 12, "max": 56, "step": 2, "unit": "px", "default": 32}`
);

fs.writeFileSync('sections/stage-journey-tabs.liquid', c);
console.log('Schema range fixed - max now 56px');

// Fix 2: Save the sub_heading_size value into index.json so it actually applies
const d = JSON.parse(fs.readFileSync('templates/index.json', 'utf8'));
if (!d.sections.stage_journey_tabs.settings) d.sections.stage_journey_tabs.settings = {};
d.sections.stage_journey_tabs.settings.sub_heading_size = 32;
fs.writeFileSync('templates/index.json', JSON.stringify(d, null, 2));
console.log('index.json: sub_heading_size set to 32px');
