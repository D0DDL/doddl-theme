const fs = require('fs');

// Fix 1: stage-intro section — padding-top 56px is too big, bring it down
let intro = fs.readFileSync('sections/stage-intro.liquid', 'utf8');
intro = intro.replace('"default": 56', '"default": 24');
fs.writeFileSync('sections/stage-intro.liquid', intro);
console.log('stage-intro default padding-top reduced to 24px');

// Fix 2: stage-journey-tabs — remove the 40px padding-top on .stage-tabs__intro
// and the 80px padding-bottom on .section wrapper
let tabs = fs.readFileSync('sections/stage-journey-tabs.liquid', 'utf8');

tabs = tabs.replace(
  /#shopify-section-\{\{ section\.id \}\} \.stage-tabs__intro \{[^}]+\}/,
  `#shopify-section-{{ section.id }} .stage-tabs__intro {
    text-align: left;
    padding: var(--spacing-4) var(--container-gutter) var(--spacing-4);
    max-width: 100%;
    margin: 0;
  }`
);

tabs = tabs.replace(
  /#shopify-section-\{\{ section\.id \}\} \.section \{[^}]+\}/,
  `#shopify-section-{{ section.id }} .section {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }`
);

// If .section rule doesn't exist yet, add it before </style>
if (!tabs.includes('padding-top: 0 !important')) {
  tabs = tabs.replace('</style>', `  #shopify-section-{{ section.id }} .section {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }\n</style>`);
}

fs.writeFileSync('sections/stage-journey-tabs.liquid', tabs);
console.log('stage-journey-tabs padding fixed');

// Fix 3: set padding_top to 24 in index.json
const d = JSON.parse(fs.readFileSync('templates/index.json', 'utf8'));
if (!d.sections.stage_intro) d.sections.stage_intro = { type: 'stage-intro', settings: {} };
d.sections.stage_intro.settings.padding_top = 24;
d.sections.stage_intro.settings.padding_bottom = 8;
fs.writeFileSync('templates/index.json', JSON.stringify(d, null, 2));
console.log('index.json padding values set');
