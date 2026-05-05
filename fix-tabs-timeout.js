const fs = require('fs');
let c = fs.readFileSync('assets/doddl-stage-journey-tabs.js', 'utf8');

// requestAnimationFrame doesn't reliably fire during initial HTML parse.
// setTimeout(fn, 0) fires after the current task and is guaranteed.
c = c.replace(
  'requestAnimationFrame(() => this._init())',
  'setTimeout(() => this._init(), 0)'
);

if (!c.includes('setTimeout(() => this._init(), 0)')) {
  console.error('REPLACEMENT FAILED');
  process.exit(1);
}

fs.writeFileSync('assets/doddl-stage-journey-tabs.js', c);
console.log('Done - rAF replaced with setTimeout');
