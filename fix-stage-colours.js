const fs = require('fs');

// ── 1. CSS: make stage pill bg match badge colour ──────────────────────────
let liquid = fs.readFileSync('sections/stage-journey-tabs.liquid', 'utf8');

const pillCSS = `
  /* Stage pill — match each stage badge colour */
  #shopify-section-{{ section.id }} [id$="-0"] .stage-tabs__pill { background-color: {{ section.settings.s0_badge_color | default: "#C8901A" }}; }
  #shopify-section-{{ section.id }} [id$="-1"] .stage-tabs__pill { background-color: {{ section.settings.s1_badge_color | default: "#C4717A" }}; }
  #shopify-section-{{ section.id }} [id$="-2"] .stage-tabs__pill { background-color: {{ section.settings.s2_badge_color | default: "#8B7BAF" }}; }
  #shopify-section-{{ section.id }} [id$="-3"] .stage-tabs__pill { background-color: {{ section.settings.s3_badge_color | default: "#3A8A7D" }}; }
  #shopify-section-{{ section.id }} [id$="-4"] .stage-tabs__pill { background-color: {{ section.settings.s4_badge_color | default: "#6B7280" }}; }

  /* Hide stage 4 tab and panel when disabled */
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="4"],
  #shopify-section-{{ section.id }} [id$="-4"].stage-tabs__panel {
    {% unless section.settings.show_stage_4 %}display: none !important;{% endunless %}
  }
`;

liquid = liquid.replace('</style>', pillCSS + '\n</style>');
fs.writeFileSync('sections/stage-journey-tabs.liquid', liquid);
console.log('Liquid CSS updated');

// ── 2. Add show_stage_4 schema setting ────────────────────────────────────
// Find the s4_badge_color setting and insert show_stage_4 after it
liquid = fs.readFileSync('sections/stage-journey-tabs.liquid', 'utf8');
liquid = liquid.replace(
  /("id":\s*"s4_badge_color"[^}]+\}),/,
  '$1,\n    { "type": "checkbox", "id": "show_stage_4", "label": "Show Stage 4 tab", "default": false },'
);
fs.writeFileSync('sections/stage-journey-tabs.liquid', liquid);
console.log('Schema setting added');

// ── 3. index.json: explicitly set show_stage_4 false ──────────────────────
const d = JSON.parse(fs.readFileSync('templates/index.json', 'utf8'));
d.sections.stage_journey_tabs.settings.show_stage_4 = false;
fs.writeFileSync('templates/index.json', JSON.stringify(d, null, 2));
console.log('index.json: show_stage_4 = false');
