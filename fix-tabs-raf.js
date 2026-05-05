const fs = require('fs');
let c = fs.readFileSync('assets/doddl-stage-journey-tabs.js', 'utf8');

// The file uses 2-space indentation (method bodies at 6 spaces).
// Match exact whitespace from the source.
const oldCB =
`    connectedCallback() {
      this._tabs = Array.from(this.querySelectorAll('[data-stage-tab]'));
      this._panels = Array.from(this.querySelectorAll('[data-stage-panel]'));

      this._tabs.forEach((tab) => tab.addEventListener('click', this._onTabClick));

      this._highlightBestValue();
      this._activateFromUrl();
    }`;

const newCB =
`    connectedCallback() {
      requestAnimationFrame(() => this._init());
    }

    _init() {
      this._tabs = Array.from(this.querySelectorAll('[data-stage-tab]'));
      this._panels = Array.from(this.querySelectorAll('[data-stage-panel]'));
      this._tabs.forEach((tab) => tab.addEventListener('click', this._onTabClick));
      this._highlightBestValue();
      this._activateFromUrl();
    }`;

if (!c.includes(oldCB)) {
  console.error('BODY NOT FOUND - dumping connectedCallback area:');
  const idx = c.indexOf('connectedCallback');
  console.log(JSON.stringify(c.substring(idx, idx + 400)));
  process.exit(1);
}

c = c.replace(oldCB, newCB);
console.log('connectedCallback → rAF + _init replacement done');

// Update all event handler call sites to prefer _init over connectedCallback
c = c.replace(
  /root\.connectedCallback\(\)/g,
  'root._init ? root._init() : root.connectedCallback()'
);
c = c.replace(
  /comp\.connectedCallback\(\)/g,
  'comp._init ? comp._init() : comp.connectedCallback()'
);
console.log('Event handler call sites updated');

fs.writeFileSync('assets/doddl-stage-journey-tabs.js', c);
console.log('File written');
console.log('Has _init:', c.includes('_init()'));
console.log('Has requestAnimationFrame:', c.includes('requestAnimationFrame'));
