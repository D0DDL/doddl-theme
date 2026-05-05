const fs = require('fs');
let c = fs.readFileSync('sections/stage-journey-tabs.liquid', 'utf8');

// Find the sub-heading CSS rule and fix it properly:
// - Keep font-size using the CSS variable (so the slider works)
// - Force text-align left permanently
// - Use the existing heading colour variable
const oldRule = /#shopify-section-\{\{ section\.id \}\} \.stage-tabs__sub-heading \{[^}]+\}/;
const newRule = `#shopify-section-{{ section.id }} .stage-tabs__sub-heading {
    margin: var(--spacing-4) 0 var(--spacing-4);
    font-weight: 800;
    font-size: var(--tabs-sub-heading-size);
    color: rgb(var(--text-primary));
    text-align: left;
  }`;

if (oldRule.test(c)) {
  c = c.replace(oldRule, newRule);
  console.log('Sub-heading CSS fixed');
} else {
  console.log('ERROR: rule not found - searching...');
  const idx = c.indexOf('.stage-tabs__sub-heading');
  console.log('Found at:', idx, c.substring(idx, idx + 200));
}

fs.writeFileSync('sections/stage-journey-tabs.liquid', c);
