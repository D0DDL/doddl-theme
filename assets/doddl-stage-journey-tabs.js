/**
 * <stage-journey-tabs> — homepage stage navigator.
 * - Tab click: toggle aria-selected + active class on tab and panel
 * - URL deep-link: ?stage=N activates that tab on connect (no auto-scroll)
 * - Best-value highlight: scans [data-product-tags] for 'best-value' tag and applies .is-best-value
 * - Theme editor lifecycle: re-runs init on shopify:section:load and shopify:block:select
 * - Idempotent customElements.define guard
 */
(function () {
  if (window.customElements && customElements.get('stage-journey-tabs')) return;

  class StageJourneyTabs extends HTMLElement {
    constructor() {
      super();
      this._onTabClick = this._onTabClick.bind(this);
    }

    connectedCallback() {
      this._tabs = Array.from(this.querySelectorAll('[data-stage-tab]'));
      this._panels = Array.from(this.querySelectorAll('[data-stage-panel]'));

      this._tabs.forEach((tab) => tab.addEventListener('click', this._onTabClick));

      this._highlightBestValue();
      this._activateFromUrl();
    }

    disconnectedCallback() {
      if (!this._tabs) return;
      this._tabs.forEach((tab) => tab.removeEventListener('click', this._onTabClick));
    }

    _onTabClick(event) {
      const stage = event.currentTarget.getAttribute('data-stage-tab');
      this.activate(stage);
    }

    activate(stage) {
      this._tabs.forEach((tab) => {
        const isActive = tab.getAttribute('data-stage-tab') === stage;
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        tab.classList.toggle('is-active', isActive);
      });
      this._panels.forEach((panel) => {
        const isActive = panel.getAttribute('data-stage-panel') === stage;
        panel.classList.toggle('is-active', isActive);
        panel.setAttribute('aria-hidden', isActive ? 'false' : 'true');
      });
    }

    _activateFromUrl() {
      try {
        const params = new URLSearchParams(window.location.search);
        const stage = params.get('stage');
        if (stage === null) return;
        const exists = this._tabs.some((t) => t.getAttribute('data-stage-tab') === stage);
        if (exists) this.activate(stage);
      } catch (e) {
        /* no-op — older browsers / SSR contexts */
      }
    }

    _highlightBestValue() {
      const cards = this.querySelectorAll('[data-product-tags]');
      cards.forEach((card) => {
        const raw = (card.getAttribute('data-product-tags') || '').toLowerCase();
        const tags = raw.split(',').map((t) => t.trim());
        if (tags.indexOf('best-value') !== -1) {
          card.classList.add('is-best-value');
        }
      });
    }
  }

  customElements.define('stage-journey-tabs', StageJourneyTabs);

  /* Shopify theme editor lifecycle: re-init JS when a section/block is reloaded.
     The custom element's connectedCallback will fire on its own when the DOM is replaced,
     so this is mostly a safety net for nested-block re-renders. */
  document.addEventListener('shopify:section:load', function (event) {
    const root = event.target.querySelector('stage-journey-tabs');
    if (root && typeof root.connectedCallback === 'function') {
      root.connectedCallback();
    }
  });
})();

// Shopify theme editor: re-init when editor selects this section
document.addEventListener('shopify:section:select', (e) => {
  const comp = e.target.querySelector('stage-journey-tabs');
  if (comp && typeof comp.connectedCallback === 'function') comp.connectedCallback();
});
