const fs = require('fs');
let c = fs.readFileSync('assets/doddl-stage-journey-tabs.js', 'utf8');

// shopify:section:load is already handled inside the IIFE.
// Add the missing shopify:section:select handler so the component
// re-activates when an editor user clicks the section in the sidebar.
const selectFix = `
// Shopify theme editor: re-init when editor selects this section
document.addEventListener('shopify:section:select', (e) => {
  const comp = e.target.querySelector('stage-journey-tabs');
  if (comp && typeof comp.connectedCallback === 'function') comp.connectedCallback();
});
`;

// Only append if not already present
if (!c.includes('shopify:section:select')) {
  c = c + selectFix;
  fs.writeFileSync('assets/doddl-stage-journey-tabs.js', c);
  console.log('shopify:section:select handler added');
} else {
  console.log('shopify:section:select already present — no change needed');
}
