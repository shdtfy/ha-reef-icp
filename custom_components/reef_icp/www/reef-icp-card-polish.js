    const REEF_ICP_POLISH_VERSION = "0.15.9";

    const REEF_ICP_PRECISION = new Map([
      ["salinität", 1],
      ["salinity", 1],
      ["leitfähigkeit", 1],
      ["conductivity", 1],
      ["dichte", 4],
      ["density", 4],
      ["relative dichte", 4],
      ["relative density", 4],
      ["ph", 2],
      ["alkalinität", 2],
      ["alkalinity", 2],
      ["co₂", 2],
      ["co2", 2],
    ]);

    function reefIcpLocale(language) {
      return language === "de" ? "de-DE" : "en-GB";
    }

    function reefIcpParseDisplayedNumber(text) {
      const match = String(text || "").trim().match(/^(-?\d+(?:[.,]\d+)?)(\s+.*)?$/);
      if (!match) return null;

      const numericText = match[1].replace(",", ".");
      const value = Number(numericText);
      if (!Number.isFinite(value)) return null;

      return {
        value,
        suffix: match[2] || "",
        sourceDecimals: (numericText.split(".")[1] || "").length,
      };
    }

    function reefIcpMeasurementDigits(name, unit, value, sourceDecimals) {
      const normalizedName = String(name || "").trim().toLocaleLowerCase();
      if (REEF_ICP_PRECISION.has(normalizedName)) {
        return REEF_ICP_PRECISION.get(normalizedName);
      }

      const normalizedUnit = String(unit || "").trim().toLocaleLowerCase();
      if (normalizedUnit === "mg/l" && Math.abs(value) >= 1000) {
        return 0;
      }

      return Math.min(sourceDecimals, 6);
    }

    function reefIcpFormatMeasurementRow(row, language) {
      const valueNode = row.querySelector(".measurement-value > span");
      const nameNode = row.querySelector(".measurement-name");
      if (!valueNode || !nameNode) return;

      const parsed = reefIcpParseDisplayedNumber(valueNode.textContent);
      if (!parsed) return;

      const digits = reefIcpMeasurementDigits(
        nameNode.textContent,
        parsed.suffix.trim(),
        parsed.value,
        parsed.sourceDecimals
      );

      const formatted = new Intl.NumberFormat(reefIcpLocale(language), {
        minimumFractionDigits: 0,
        maximumFractionDigits: digits,
        useGrouping: true,
      }).format(parsed.value);

      valueNode.textContent = `${formatted}${parsed.suffix}`;
    }

    function reefIcpCardLanguage(card) {
      const language =
        card?._language ||
        card?.hass?.language ||
        card?._hass?.language ||
        document?.documentElement?.lang ||
        "en";
      return String(language).toLowerCase().startsWith("de") ? "de" : "en";
    }

    function polishMeasurementNumbers(card) {
      const shadow = card?.shadowRoot;
      if (!shadow) return;

      const language = reefIcpCardLanguage(card);

      // Target the stable base-card rows directly. The v0156 class is added by a
      // separate UI layer and is therefore intentionally not required here.
      shadow.querySelectorAll(".measurement").forEach((row) => {
        reefIcpFormatMeasurementRow(row, language);
      });
    }

    function polishInjectStyles(card) {
      const shadow = card?.shadowRoot;
      if (!shadow || shadow.querySelector("style[data-reef-icp-polish-v0159]")) return;

      shadow
        .querySelectorAll(
          "style[data-reef-icp-polish-v0157], style[data-reef-icp-polish-v0158]"
        )
        .forEach((node) => node.remove());

      const style = document.createElement("style");
      style.dataset.reefIcpPolishV0159 = "true";
      style.textContent = `
        .measurement-row-v0156 .history-indicator {
          opacity: 0.48 !important;
          color: var(--secondary-text-color) !important;
          --mdc-icon-size: 18px !important;
          transition: opacity 120ms ease, color 120ms ease;
        }
        .measurement-row-v0156.history-enabled:hover .history-indicator,
        .measurement-row-v0156.history-enabled:focus-visible .history-indicator {
          opacity: 0.82 !important;
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
            opacity: 0.50 !important;
            --mdc-icon-size: 17px !important;
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
      if (!Card || Card.prototype.__reefIcpPolishV0159Patched) return;

      const originalRender = Card.prototype._render;
      if (typeof originalRender !== "function") return;

      Card.prototype._render = function (...args) {
        const result = originalRender.apply(this, args);
        try {
          polishInject(this);
        } catch (error) {
          console.warn("Reef ICP 0.15.9 polish layer failed", error);
        }
        return result;
      };

      Card.prototype.__reefIcpPolishV0159Patched = true;

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
