const fs = require('fs');

// ── 1. Add s0_heading_2 through s3_heading_2 to schema ─────────────────────
let liquid = fs.readFileSync('sections/stage-journey-tabs.liquid', 'utf8');

[0,1,2,3].forEach(i => {
  const target = `{ "type": "text", "id": "s${i}_heading", "label": "Panel headline"`;
  const insert = `, { "type": "text", "id": "s${i}_heading_2", "label": "Headline accent word (stage colour)", "info": "Displays after main headline in the stage colour. Leave blank for single-colour heading." }`;
  if (liquid.includes(target)) {
    const idx = liquid.indexOf(target);
    const closeIdx = liquid.indexOf('}', idx);
    liquid = liquid.slice(0, closeIdx + 1) + insert + liquid.slice(closeIdx + 1);
    console.log(`Added s${i}_heading_2 schema`);
  } else {
    console.log(`WARNING: s${i}_heading not found in schema`);
  }
});

// ── 2. Add CSS for accent heading span ─────────────────────────────────────
const headingAccentCSS = `
  /* Split-colour panel heading */
  #shopify-section-{{ section.id }} .stage-tabs__heading-accent {
    display: inline;
  }
  #shopify-section-{{ section.id }} [id$="-0"] .stage-tabs__heading-accent { color: {{ section.settings.s0_badge_color | default: "#C8901A" }}; }
  #shopify-section-{{ section.id }} [id$="-1"] .stage-tabs__heading-accent { color: {{ section.settings.s1_badge_color | default: "#C4717A" }}; }
  #shopify-section-{{ section.id }} [id$="-2"] .stage-tabs__heading-accent { color: {{ section.settings.s2_badge_color | default: "#8B7BAF" }}; }
  #shopify-section-{{ section.id }} [id$="-3"] .stage-tabs__heading-accent { color: {{ section.settings.s3_badge_color | default: "#3A8A7D" }}; }
`;
liquid = liquid.replace('</style>', headingAccentCSS + '\n</style>');

// ── 3. Add heading2_key assign after heading_key assign ────────────────────
// Actual line: {%- assign heading_key = s | append: '_heading' -%}
// (uses pre-built variable s, not 's' | append: i)
const headingKeyPattern = /(\{%-?\s*assign\s+heading_key\s*=\s*s\s*\|\s*append:\s*'_heading'\s*-?%\})/;
const headingKey2Insert = `\n      {%- assign heading2_key = s | append: '_heading_2' -%}`;
if (headingKeyPattern.test(liquid)) {
  liquid = liquid.replace(headingKeyPattern, `$1${headingKey2Insert}`);
  console.log('heading2_key assign added');
} else {
  console.log('WARNING: heading_key assign not found — check loop structure');
}

// ── 4. Add accent span to heading HTML ─────────────────────────────────────
const oldHeadingRender = /(<h3[^>]*class="stage-tabs__panel-heading"[^>]*>)([\s\S]*?)(<\/h3>)/;
const match = liquid.match(oldHeadingRender);
if (match) {
  const newHeadingRender = `$1$2{%- if section.settings[heading2_key] != blank -%} <span class="stage-tabs__heading-accent">{{ section.settings[heading2_key] | escape }}</span>{%- endif -%}$3`;
  liquid = liquid.replace(oldHeadingRender, newHeadingRender);
  console.log('Heading accent span added to HTML');
} else {
  console.log('WARNING: heading HTML not found');
}

fs.writeFileSync('sections/stage-journey-tabs.liquid', liquid);
console.log('Liquid file written');

// ── 5. index.json — raw.indexOf skips the /* */ comment header ─────────────
const raw = fs.readFileSync('templates/index.json', 'utf8');
const jsonStart = raw.indexOf('{');
const d = JSON.parse(raw.slice(jsonStart));
const s = d.sections.stage_journey_tabs.settings;

s.tab_image_size = 120;
s.sub_heading_size = 40;

s.s0_heading = 'Preparing for';
s.s0_heading_2 = 'weaning';
s.s1_heading = 'Explore,';
s.s1_heading_2 = 'taste, try';
s.s2_heading = 'Watch ME';
s.s2_heading_2 = 'Go!';
s.s3_heading = 'Independence:';
s.s3_heading_2 = 'unlocked';

d.sections.stage_journey_tabs.settings = s;
const output = raw.slice(0, jsonStart) + JSON.stringify(d, null, 2);
fs.writeFileSync('templates/index.json', output);
console.log('index.json updated');
