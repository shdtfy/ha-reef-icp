const REEF_ICP_POLISH_VERSION = "0.15.7";

function polishIntegerText(text, language) {
  if (!text) return text;
  const match = String(text).match(/^(\s*)(-?\d{4,})(\s+.*)$/);
  if (!match) return text;
  const value = Number(match[2]);
  if (!Number.isFinite(value)) return text;
  const locale = language === "de" ? "de-DE" : "en-GB";
  return `${match[1]}${new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(value)}${match[3]}`;
}

function polishMeasurementNumbers(card) {
  const shadow = card?.shadowRoot;
  if (!shadow) return;
  const language = card?._language === "de" ? "de" : "en";
  shadow
    .querySelectorAll(".measurement-row-v0156 .measurement-value > span")
    .forEach((node) => {
      const current = node.textContent || "";
      const formatted = polishIntegerText(current, language);
      if (formatted !== current) node.textContent = formatted;
    });
}

function polishInjectStyles(card) {
  const shadow = card?.shadowRoot;
  if (!shadow || shadow.querySelector("style[data-reef-icp-polish-v0157]")) return;
  const style = document.createElement("style");
  style.dataset.reefIcpPolishV0157 = "true";
  style.textContent = `
    .measurement-row-v0156 .history-indicator {
      opacity: 0.64 !important;
      color: color-mix(in srgb, var(--secondary-text-color) 78%, var(--primary-color) 22%) !important;
      --mdc-icon-size: 19px !important;
      transition: opacity 120ms ease, color 120ms ease;
    }
    .measurement-row-v0156.history-enabled:hover .history-indicator,
    .measurement-row-v0156.history-enabled:focus-visible .history-indicator {
      opacity: 0.92 !important;
      color: var(--primary-color) !important;
    }
    .action-plan-panel-v0155 {
      margin-top: 10px !important;
      margin-bottom: 12px !important;
    }
    .action-plan-summary-v0155 {
      min-height: 58px !important;
      padding: 8px 12px !important;
      gap: 9px !important;
    }
    .action-plan-summary-icon-v0155 {
      width: 35px !important;
      height: 35px !important;
      border-radius: 11px !important;
    }
    .action-plan-summary-icon-v0155 ha-icon { --mdc-icon-size: 20px !important; }
    .action-plan-summary-copy-v0155 { gap: 1px !important; }

    @media (max-width: 560px) {
      .action-plan-panel-v0155 { margin: 9px 7px 11px !important; }
      .action-plan-summary-v0155 {
        min-height: 54px !important;
        padding: 7px 10px !important;
        gap: 8px !important;
      }
      .action-plan-summary-icon-v0155 {
        width: 33px !important;
        height: 33px !important;
      }
      .measurement-row-v0156 .history-indicator {
        opacity: 0.68 !important;
        --mdc-icon-size: 18px !important;
      }
    }
  `;
  shadow.appendChild(style);
}

function polishInject(card) {
  polishInjectStyles(card);
  polishMeasurementNumbers(card);
}

customElements.whenDefined("reef-icp-card").then(() => {
  const Card = customElements.get("reef-icp-card");
  if (!Card || Card.prototype.__reefIcpPolishV0157Patched) return;
  const originalRender = Card.prototype._render;
  if (typeof originalRender !== "function") return;

  Card.prototype._render = function (...args) {
    const result = originalRender.apply(this, args);
    try {
      polishInject(this);
    } catch (error) {
      console.warn("Reef ICP 0.15.7 polish layer failed", error);
    }
    return result;
  };

  Card.prototype.__reefIcpPolishV0157Patched = true;
  document.querySelectorAll("reef-icp-card").forEach((card) => {
    try {
      card._render?.();
    } catch (_error) {
      // Normal Home Assistant lifecycle will render it on the next state update.
    }
  });
});

console.info(
  `%c REEF-ICP-POLISH ${REEF_ICP_POLISH_VERSION} `,
  "background:#005b59;color:white;font-weight:700;"
);
