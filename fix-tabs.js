const fs = require('fs');

const d = JSON.parse(fs.readFileSync('templates/index.json', 'utf8'));
if (!d.sections.stage_journey_tabs.settings) d.sections.stage_journey_tabs.settings = {};
Object.assign(d.sections.stage_journey_tabs.settings, {
  s0_name: 'Preparing',
  s1_name: 'First Foods',
  s2_name: 'Building Control',
  s3_name: 'Growing Skills',
  s4_name: 'Little Adult',
  s0_badge_color: '#F5E3B7',
  s1_badge_color: '#F9DFE0',
  s2_badge_color: '#EEEAF2',
  s3_badge_color: '#9ECFC6',
  s4_badge_color: '#9CA3AF'
});
fs.writeFileSync('templates/index.json', JSON.stringify(d, null, 2));
console.log('Done');
