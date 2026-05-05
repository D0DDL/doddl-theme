const fs = require('fs');
const d = JSON.parse(fs.readFileSync('templates/index.json', 'utf8'));
if (!d.sections.stage_journey_tabs.settings) d.sections.stage_journey_tabs.settings = {};
Object.assign(d.sections.stage_journey_tabs.settings, {
  s0_badge_color: '#C8901A',
  s1_badge_color: '#C4717A',
  s2_badge_color: '#8B7BAF',
  s3_badge_color: '#3A8A7D',
  s4_badge_color: '#6B7280'
});
fs.writeFileSync('templates/index.json', JSON.stringify(d, null, 2));
console.log('Done');
