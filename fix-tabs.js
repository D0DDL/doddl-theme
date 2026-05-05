const fs = require('fs');

// --- Fix stage-journey-tabs.liquid ---
let c = fs.readFileSync('sections/stage-journey-tabs.liquid', 'utf8');

// Fix 1: sub-heading CSS — left aligned, large, bold
c = c.replace(
  /#shopify-section-\{\{ section\.id \}\} \.stage-tabs__sub-heading \{[^}]+\}/,
  '#shopify-section-{{ section.id }} .stage-tabs__sub-heading {\n    text-align: left;\n    font-size: 32px;\n    font-weight: 800;\n    color: rgb(var(--text-primary));\n    margin: 0 0 var(--spacing-4);\n  }'
);

// Fix 2: per-stage badge and active colours
const stageCSS = `
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="0"] .stage-tabs__tab-badge { background: {{ section.settings.s0_badge_color | default: "#E8A020" }}; color: #fff; }
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="1"] .stage-tabs__tab-badge { background: {{ section.settings.s1_badge_color | default: "#2DD4BF" }}; color: #fff; }
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="2"] .stage-tabs__tab-badge { background: {{ section.settings.s2_badge_color | default: "#A78BFA" }}; color: #fff; }
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="3"] .stage-tabs__tab-badge { background: {{ section.settings.s3_badge_color | default: "#60A5FA" }}; color: #fff; }
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="4"] .stage-tabs__tab-badge { background: {{ section.settings.s4_badge_color | default: "#9CA3AF" }}; color: #fff; }
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="0"].is-active .stage-tabs__tab-name { color: {{ section.settings.s0_badge_color | default: "#E8A020" }}; }
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="1"].is-active .stage-tabs__tab-name { color: {{ section.settings.s1_badge_color | default: "#2DD4BF" }}; }
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="2"].is-active .stage-tabs__tab-name { color: {{ section.settings.s2_badge_color | default: "#A78BFA" }}; }
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="3"].is-active .stage-tabs__tab-name { color: {{ section.settings.s3_badge_color | default: "#60A5FA" }}; }
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="4"].is-active .stage-tabs__tab-name { color: {{ section.settings.s4_badge_color | default: "#9CA3AF" }}; }
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="0"].is-active { border-bottom-color: {{ section.settings.s0_badge_color | default: "#E8A020" }}; }
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="1"].is-active { border-bottom-color: {{ section.settings.s1_badge_color | default: "#2DD4BF" }}; }
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="2"].is-active { border-bottom-color: {{ section.settings.s2_badge_color | default: "#A78BFA" }}; }
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="3"].is-active { border-bottom-color: {{ section.settings.s3_badge_color | default: "#60A5FA" }}; }
  #shopify-section-{{ section.id }} .stage-tabs__tab[data-stage-tab="4"].is-active { border-bottom-color: {{ section.settings.s4_badge_color | default: "#9CA3AF" }}; }
`;
c = c.replace('</style>', stageCSS + '\n</style>');

fs.writeFileSync('sections/stage-journey-tabs.liquid', c);
console.log('section file written');

// --- Fix index.json ---
const d = JSON.parse(fs.readFileSync('templates/index.json', 'utf8'));
if (!d.sections.stage_journey_tabs.settings) d.sections.stage_journey_tabs.settings = {};
Object.assign(d.sections.stage_journey_tabs.settings, {
  s0_name: 'Preparing',
  s1_name: 'First Foods',
  s2_name: 'Building Control',
  s3_name: 'Growing Skills',
  s4_name: 'Little Adult',
  s0_badge_color: '#E8A020',
  s1_badge_color: '#2DD4BF',
  s2_badge_color: '#A78BFA',
  s3_badge_color: '#60A5FA',
  s4_badge_color: '#9CA3AF'
});
fs.writeFileSync('templates/index.json', JSON.stringify(d, null, 2));
console.log('index.json written');
