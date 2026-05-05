const fs = require('fs');
let c = fs.readFileSync('sections/stage-journey-tabs.liquid', 'utf8');

// The intro wrapper is centering everything. Fix it to be full-width left-aligned.
c = c.replace(
  /#shopify-section-\{\{ section\.id \}\} \.stage-tabs__intro \{[^}]+\}/,
  `#shopify-section-{{ section.id }} .stage-tabs__intro {
    text-align: left;
    padding: var(--spacing-6) var(--container-gutter) var(--spacing-4);
    max-width: 100%;
    margin: 0;
  }`
);

fs.writeFileSync('sections/stage-journey-tabs.liquid', c);
console.log('Done -', c.includes('text-align: left') ? 'left align confirmed' : 'WARNING: check file');
