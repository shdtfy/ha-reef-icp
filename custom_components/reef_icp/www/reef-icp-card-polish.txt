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



    function reefIcpEscape(value) {
      return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function reefIcpLabText(language) {
      return language === "de"
        ? {
            title: "Bewertung des Labors",
            low: "Zu niedrig",
            high: "Zu hoch",
            ideal: "Im Soll",
            other: "Weitere Hinweise",
          }
        : {
            title: "Laboratory assessment",
            low: "Too low",
            high: "Too high",
            ideal: "In range",
            other: "Additional notes",
          };
    }

    function reefIcpLabParameterName(name, language) {
      const value = String(name || "").trim();
      if (language !== "de") return value;

      const map = new Map([
        ["relative density", "Relative Dichte"],
        ["density", "Dichte"],
        ["salinity", "Salinität"],
        ["alkalinity", "Alkalinität"],
        ["calcium", "Calcium"],
        ["magnesium", "Magnesium"],
        ["potassium", "Kalium"],
        ["strontium", "Strontium"],
        ["boron", "Bor"],
        ["bromide", "Bromid"],
        ["fluoride", "Fluorid"],
        ["iodine", "Iod"],
        ["sulfur", "Schwefel"],
        ["sulphur", "Schwefel"],
        ["sulfate", "Sulfat"],
        ["sulphate", "Sulfat"],
        ["molybdenum", "Molybdän"],
        ["silicon", "Silizium"],
        ["zinc", "Zink"],
        ["nickel", "Nickel"],
        ["manganese", "Mangan"],
        ["iron", "Eisen"],
        ["copper", "Kupfer"],
        ["phosphate", "Phosphat"],
        ["nitrite", "Nitrit"],
        ["nitrate", "Nitrat"],
      ]);

      return map.get(value.toLocaleLowerCase()) || value;
    }

    function reefIcpParseLabAssessment(text) {
      const raw = String(text || "").replace(/\s+/g, " ").trim();
      if (!raw) return [];

      // Laboratory text is emitted as repeated "<parameter> · <status>" pairs.
      // Split only at known status tokens so multi-word parameter names stay intact.
      const statusPattern = /\s*[·:]\s*(lower|increase|ideal)\b/gi;
      const matches = [...raw.matchAll(statusPattern)];
      if (!matches.length) return [];

      const items = [];
      let start = 0;

      matches.forEach((match, index) => {
        const name = raw.slice(start, match.index).replace(/^[,;·\s]+|[,;·\s]+$/g, "");
        const status = String(match[1] || "").toLowerCase();
        if (name) items.push({ name, status });

        const nextStart = match.index + match[0].length;
        const nextMatch = matches[index + 1];
        start = nextStart;

        if (nextMatch) {
          const between = raw.slice(nextStart, nextMatch.index);
          const separator = Math.max(between.lastIndexOf(","), between.lastIndexOf(";"));
          if (separator >= 0) start = nextStart + separator + 1;
        }
      });

      return items;
    }

    function reefIcpLabGroupHtml(status, items, language, labels) {
      if (!items.length) return "";

      const meta = {
        lower: {
          label: labels.low,
          icon: "mdi:arrow-down",
          className: "is-low",
        },
        increase: {
          label: labels.high,
          icon: "mdi:arrow-up",
          className: "is-high",
        },
        ideal: {
          label: labels.ideal,
          icon: "mdi:check",
          className: "is-ideal",
        },
      }[status];

      return `
        <section class="lab-assessment-group-v0159 ${meta.className}">
          <div class="lab-assessment-group-head-v0159">
            <span class="lab-assessment-status-v0159">
              <ha-icon icon="${meta.icon}"></ha-icon>
              <strong>${reefIcpEscape(meta.label)}</strong>
            </span>
            <span class="lab-assessment-count-v0159">${items.length}</span>
          </div>
          <div class="lab-assessment-values-v0159">
            ${items
              .map((item) => {
                const name = reefIcpLabParameterName(item.name, language);
                const escaped = reefIcpEscape(name);
                return `<span>${escaped}</span>`;
              })
              .join("")}
          </div>
        </section>
      `;
    }

    function polishLaboratoryAssessment(card) {
      const shadow = card?.shadowRoot;
      if (!shadow) return;

      const panel = shadow.querySelector("details.laboratory-panel");
      if (!panel) return;

      const report = panel.querySelector(".laboratory-report-text");
      if (!report || report.dataset.reefIcpAssessmentV0159 === "true") return;

      const valueNode = report.querySelector(":scope > div");
      if (!valueNode) return;

      const language = reefIcpCardLanguage(card);
      const labels = reefIcpLabText(language);
      const items = reefIcpParseLabAssessment(valueNode.textContent);
      if (!items.length) return;

      const groups = {
        lower: items.filter((item) => item.status === "lower"),
        increase: items.filter((item) => item.status === "increase"),
        ideal: items.filter((item) => item.status === "ideal"),
      };

      const heading = report.querySelector(":scope > strong");
      if (heading) heading.textContent = labels.title;

      valueNode.classList.add("lab-assessment-groups-v0159");
      valueNode.innerHTML = [
        reefIcpLabGroupHtml("lower", groups.lower, language, labels),
        reefIcpLabGroupHtml("increase", groups.increase, language, labels),
        reefIcpLabGroupHtml("ideal", groups.ideal, language, labels),
      ].join("");

      report.classList.add("lab-assessment-v0159");
      report.dataset.reefIcpAssessmentV0159 = "true";
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


        .lab-assessment-v0159 {
          display: grid !important;
          gap: 10px !important;
          padding: 12px 0 2px !important;
          border-top: 1px solid color-mix(in srgb, var(--divider-color) 70%, transparent) !important;
          background: transparent !important;
        }
        .lab-assessment-v0159 > strong {
          font-size: 0.76rem !important;
          line-height: 1.2 !important;
          font-weight: 800 !important;
          letter-spacing: 0.055em !important;
          text-transform: uppercase !important;
          color: color-mix(in srgb, var(--info-color, #4b9fe1) 78%, var(--primary-text-color)) !important;
        }
        .lab-assessment-groups-v0159 {
          display: grid !important;
          gap: 0 !important;
        }
        .lab-assessment-group-v0159 {
          display: grid;
          grid-template-columns: minmax(118px, 0.34fr) minmax(0, 1fr);
          gap: 12px;
          align-items: start;
          padding: 10px 2px;
          border-top: 1px solid color-mix(in srgb, var(--divider-color) 58%, transparent);
        }
        .lab-assessment-group-v0159:first-child { border-top: 0; }
        .lab-assessment-group-head-v0159 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 7px;
          min-width: 0;
        }
        .lab-assessment-status-v0159 {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          min-width: 0;
          font-size: 0.82rem;
          font-weight: 760;
        }
        .lab-assessment-status-v0159 ha-icon { --mdc-icon-size: 17px; }
        .lab-assessment-count-v0159 {
          min-width: 23px;
          padding: 3px 6px;
          border-radius: 999px;
          text-align: center;
          font-size: 0.68rem;
          line-height: 1;
          font-weight: 800;
          background: color-mix(in srgb, currentColor 9%, transparent);
        }
        .lab-assessment-group-v0159.is-low .lab-assessment-status-v0159,
        .lab-assessment-group-v0159.is-high .lab-assessment-status-v0159 {
          color: var(--warning-color, #f9a825);
        }
        .lab-assessment-group-v0159.is-ideal .lab-assessment-status-v0159 {
          color: var(--success-color, #43a047);
        }
        .lab-assessment-values-v0159 {
          display: flex;
          flex-wrap: wrap;
          gap: 5px 6px;
          min-width: 0;
        }
        .lab-assessment-values-v0159 > span {
          display: inline-flex;
          align-items: center;
          min-height: 25px;
          padding: 3px 8px;
          border-radius: 999px;
          font-size: 0.75rem;
          line-height: 1.2;
          font-weight: 620;
          color: var(--primary-text-color);
          background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
          box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 64%, transparent);
        }
        .lab-assessment-group-v0159.is-ideal .lab-assessment-values-v0159 {
          opacity: 0.72;
        }

        @media (max-width: 560px) {

          .lab-assessment-group-v0159 {
            grid-template-columns: 1fr;
            gap: 7px;
            padding-block: 9px;
          }
          .lab-assessment-group-head-v0159 {
            justify-content: flex-start;
          }
          .lab-assessment-count-v0159 { margin-left: auto; }
          .lab-assessment-values-v0159 > span {
            min-height: 24px;
            padding-inline: 7px;
            font-size: 0.72rem;
          }

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
      polishLaboratoryAssessment(card);
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
