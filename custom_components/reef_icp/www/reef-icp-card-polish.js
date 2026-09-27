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
            dosingTitle: "Dosierempfehlung des Labors",
            low: "Zu niedrig",
            high: "Zu hoch",
            ideal: "Im Soll",
            dose: "Dosierung",
            note: "Hinweis",
          }
        : {
            title: "Laboratory assessment",
            dosingTitle: "Laboratory dosing recommendation",
            low: "Too low",
            high: "Too high",
            ideal: "In range",
            dose: "Dose",
            note: "Note",
          };
    }

    const REEF_ICP_LAB_PARAMETERS = [
      ["relative density", "Relative Dichte"],
      ["relative dichte", "Relative Dichte"],
      ["conductivity", "Leitfähigkeit"],
      ["leitfähigkeit", "Leitfähigkeit"],
      ["alkalinity", "Alkalinität"],
      ["alkalinität", "Alkalinität"],
      ["molybdenum", "Molybdän"],
      ["molybdän", "Molybdän"],
      ["molybdaen", "Molybdän"],
      ["strontium", "Strontium"],
      ["magnesium", "Magnesium"],
      ["potassium", "Kalium"],
      ["phosphate", "Phosphat"],
      ["phosphat", "Phosphat"],
      ["manganese", "Mangan"],
      ["mangan", "Mangan"],
      ["silicium", "Silizium"],
      ["silicon", "Silizium"],
      ["silizium", "Silizium"],
      ["fluorine", "Fluorid"],
      ["fluoride", "Fluorid"],
      ["fluorid", "Fluorid"],
      ["bromide", "Bromid"],
      ["bromid", "Bromid"],
      ["calcium", "Calcium"],
      ["nitrate", "Nitrat"],
      ["nitrat", "Nitrat"],
      ["nitrite", "Nitrit"],
      ["nitrit", "Nitrit"],
      ["sulphate", "Sulfat"],
      ["sulfate", "Sulfat"],
      ["sulfat", "Sulfat"],
      ["sulphur", "Schwefel"],
      ["sulfur", "Schwefel"],
      ["schwefel", "Schwefel"],
      ["salinity", "Salinität"],
      ["salinität", "Salinität"],
      ["density", "Dichte"],
      ["dichte", "Dichte"],
      ["iodine", "Iod"],
      ["iod", "Iod"],
      ["boron", "Bor"],
      ["bor", "Bor"],
      ["copper", "Kupfer"],
      ["kupfer", "Kupfer"],
      ["iron", "Eisen"],
      ["eisen", "Eisen"],
      ["nickel", "Nickel"],
      ["zinc", "Zink"],
      ["zink", "Zink"],
      ["lithium", "Lithium"],
      ["barium", "Barium"],
      ["vanadium", "Vanadium"],
      ["selenium", "Selen"],
      ["selen", "Selen"],
      ["ph", "pH"],
    ];

    function reefIcpLabParameterName(name, language) {
      const value = String(name || "").trim();
      if (language !== "de") return value;
      const normalized = value.toLocaleLowerCase();
      const found = REEF_ICP_LAB_PARAMETERS.find(([alias]) => alias === normalized);
      return found?.[1] || value;
    }

    function reefIcpRegexEscape(value) {
      return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    function reefIcpParseLabAssessment(text) {
      const raw = String(text || "").replace(/\s+/g, " ").trim();
      if (!raw || !/\b(lower|increase|ideal)\b/i.test(raw)) return [];

      // Match complete "<known parameter> · <status>" pairs. This deliberately
      // does not infer parameter boundaries from the text between two statuses.
      // It prevents pairs such as "Iodine Strontium" from becoming one chip.
      const aliases = [...new Set(REEF_ICP_LAB_PARAMETERS.map(([alias]) => alias))]
        .sort((a, b) => b.length - a.length)
        .map(reefIcpRegexEscape)
        .join("|");
      const pairPattern = new RegExp(
        `(?:^|[\\s,;·])(${aliases})\\s*[·:]\\s*(lower|increase|ideal)\\b`,
        "gi"
      );

      const items = [];
      const seen = new Set();
      for (const match of raw.matchAll(pairPattern)) {
        const name = String(match[1] || "").trim();
        const status = String(match[2] || "").toLowerCase();
        const key = `${name.toLocaleLowerCase()}|${status}`;
        if (!name || seen.has(key)) continue;
        seen.add(key);
        items.push({ name, status });
      }
      return items;
    }

    function reefIcpParseLabDosing(text) {
      let raw = String(text || "").replace(/\s+/g, " ").trim();
      if (!raw || /\b(lower|increase|ideal)\b/i.test(raw) || !/\bml\b/i.test(raw)) {
        return null;
      }

      raw = raw
        .replace(/^\s*produkt\s+dosierung\s*/i, "")
        .replace(/^\s*product\s+dosing\s*/i, "")
        .trim();

      // Oceamo writes several recommendations as one continuous sentence.
      // Parse known product starts first so instructions such as
      // "insgesamt, aufgeteilt auf 20 Tage" stay with the preceding product.
      const oceamoProductPattern =
        /\b((?:Oceamo\s+)?(?:Single\s+Elements?|Add-On)\s+[A-Za-zÄÖÜäöüß0-9+.-]+)\b/gi;
      const starts = [...raw.matchAll(oceamoProductPattern)];

      if (starts.length) {
        const rows = [];
        let trailingNote = "";

        for (let i = 0; i < starts.length; i += 1) {
          const current = starts[i];
          const next = starts[i + 1];
          const product = String(current[1] || "").trim();
          const segmentStart = current.index + current[0].length;
          const segmentEnd = next ? next.index : raw.length;
          let segment = raw.slice(segmentStart, segmentEnd).trim();

          // A repeated product name can introduce preparation/use instructions,
          // e.g. "Oceamo Add-On P 2 ml Oceamo Add-On P in 1l ... täglich 2,7 ml".
          // Merge repeated adjacent product blocks into one recommendation.
          if (
            rows.length &&
            rows[rows.length - 1].product.toLocaleLowerCase() === product.toLocaleLowerCase()
          ) {
            const previous = rows[rows.length - 1];
            const daily = segment.match(/\btäglich\s+(\d+(?:[.,]\d+)?)\s*ml\b/i);
            const solution = segment.match(/\bin\s+(\d+(?:[.,]\d+)?)\s*l\s+Osmosewasser\s+mischen\b/i);

            if (solution) {
              previous.preparation = `in ${solution[1].replace(".", ",")} l Osmosewasser mischen`;
            }
            if (daily) {
              previous.daily = `${daily[1].replace(".", ",")} ml täglich`;
              segment = segment.slice(daily.index + daily[0].length).trim();
            }
            if (segment) trailingNote = segment.replace(/^[,;·.:\s]+/, "").trim();
            continue;
          }

          const dose = segment.match(/^(\d+(?:[.,]\d+)?)\s*ml\b/i);
          if (!dose) continue;

          const row = {
            product,
            amount: String(dose[1] || "").replace(".", ","),
            frequency: "",
            preparation: "",
            daily: "",
          };

          let remainder = segment.slice(dose[0].length).trim();

          const period = remainder.match(
            /^(?:insgesamt,?\s*)?aufgeteilt\s+auf\s+(\d+)\s+Tage\b/i
          );
          if (period) {
            row.frequency = `insgesamt · aufgeteilt auf ${period[1]} Tage`;
            remainder = remainder.slice(period[0].length).trim();
          }

          const solution = remainder.match(
            /^in\s+(\d+(?:[.,]\d+)?)\s*l\s+Osmosewasser\s+mischen\b/i
          );
          if (solution) {
            row.preparation = `in ${solution[1].replace(".", ",")} l Osmosewasser mischen`;
            remainder = remainder.slice(solution[0].length).trim();
          }

          const daily = remainder.match(
            /^(?:Von\s+dieser\s+Gebrauchslösung\s+)?täglich\s+(\d+(?:[.,]\d+)?)\s*ml\b/i
          );
          if (daily) {
            row.daily = `${daily[1].replace(".", ",")} ml täglich`;
            remainder = remainder.slice(daily[0].length).trim();
          }

          if (remainder) trailingNote = remainder.replace(/^[,;·.:\s]+/, "").trim();
          rows.push(row);
        }

        if (rows.length) {
          return { rows, note: trailingNote };
        }
      }

      // Generic fallback for other laboratories. Keep the conservative parser
      // so unknown formats are not forcefully reinterpreted.
      const dosePattern =
        /(.+?)\s+(\d+(?:[.,]\d+)?)\s*ml\b(?:\s*(\d+\s*[x×]\s*(?:täglich|taeglich|wöchentlich|woechentlich|pro\s+woche|daily|weekly)))?/gi;
      const rows = [];
      let lastEnd = 0;
      let match;

      while ((match = dosePattern.exec(raw)) !== null) {
        const product = String(match[1] || "")
          .replace(/^[,;·:\s]+|[,;·:\s]+$/g, "")
          .trim();
        if (!product) continue;

        rows.push({
          product,
          amount: String(match[2] || "").replace(".", ","),
          frequency: String(match[3] || "").replace(/\s+/g, " ").trim(),
          preparation: "",
          daily: "",
        });
        lastEnd = dosePattern.lastIndex;
      }

      if (!rows.length) return null;
      const note = raw.slice(lastEnd).replace(/^[,;·:\s]+/, "").trim();
      return { rows, note };
    }

    function reefIcpLabGroupHtml(status, items, language, labels) {
      if (!items.length) return "";

      const meta = {
        lower: { label: labels.low, icon: "mdi:arrow-down", className: "is-low" },
        increase: { label: labels.high, icon: "mdi:arrow-up", className: "is-high" },
        ideal: { label: labels.ideal, icon: "mdi:check", className: "is-ideal" },
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
            ${items.map((item) => {
              const name = reefIcpLabParameterName(item.name, language);
              return `<span>${reefIcpEscape(name)}</span>`;
            }).join("")}
          </div>
        </section>
      `;
    }

    function reefIcpLabDosingHtml(parsed, labels) {
      return `
        <div class="lab-dosing-list-v01511">
          ${parsed.rows.map((row) => `
            <div class="lab-dosing-row-v01511">
              <div class="lab-dosing-product-v01511">${reefIcpEscape(row.product)}</div>
              <div class="lab-dosing-dose-v01511">
                <strong>${reefIcpEscape(row.amount)} ml${row.frequency ? " insgesamt" : ""}</strong>
                ${row.frequency ? `<span>${reefIcpEscape(row.frequency.replace(/^insgesamt\s*·\s*/i, ""))}</span>` : ""}
                ${row.preparation ? `<span>${reefIcpEscape(row.preparation)}</span>` : ""}
                ${row.daily ? `<strong class="lab-dosing-daily-v01512">→ ${reefIcpEscape(row.daily)}</strong>` : ""}
              </div>
            </div>
          `).join("")}
          ${parsed.note ? `
            <div class="lab-dosing-note-v01511">
              <ha-icon icon="mdi:information-outline"></ha-icon>
              <span>${reefIcpEscape(parsed.note)}</span>
            </div>
          ` : ""}
        </div>
      `;
    }

    function polishLaboratoryAssessment(card) {
      const shadow = card?.shadowRoot;
      if (!shadow) return;

      const panel = shadow.querySelector("details.laboratory-panel");
      if (!panel) return;

      const report = panel.querySelector(".laboratory-report-text");
      if (!report || report.dataset.reefIcpAssessmentV01511 === "true") return;

      const valueNode = report.querySelector(":scope > div");
      if (!valueNode) return;

      const language = reefIcpCardLanguage(card);
      const labels = reefIcpLabText(language);
      const rawText = valueNode.textContent;
      const heading = report.querySelector(":scope > strong");

      const items = reefIcpParseLabAssessment(rawText);
      if (items.length) {
        const groups = {
          lower: items.filter((item) => item.status === "lower"),
          increase: items.filter((item) => item.status === "increase"),
          ideal: items.filter((item) => item.status === "ideal"),
        };

        if (heading) heading.textContent = labels.title;
        valueNode.classList.add("lab-assessment-groups-v0159");
        valueNode.innerHTML = [
          reefIcpLabGroupHtml("lower", groups.lower, language, labels),
          reefIcpLabGroupHtml("increase", groups.increase, language, labels),
          reefIcpLabGroupHtml("ideal", groups.ideal, language, labels),
        ].join("");
        report.classList.add("lab-assessment-v0159");
        report.dataset.reefIcpAssessmentV01511 = "true";
        return;
      }

      const dosing = reefIcpParseLabDosing(rawText);
      if (dosing) {
        if (heading) heading.textContent = labels.dosingTitle;
        valueNode.classList.add("lab-dosing-v01511");
        valueNode.innerHTML = reefIcpLabDosingHtml(dosing, labels);
        report.classList.add("lab-assessment-v0159", "lab-dosing-report-v01511");
        report.dataset.reefIcpAssessmentV01511 = "true";
      }
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

        .lab-dosing-list-v01511 {
          display: grid;
          gap: 0;
        }
        .lab-dosing-row-v01511 {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 12px;
          align-items: center;
          padding: 10px 2px;
          border-top: 1px solid color-mix(in srgb, var(--divider-color) 58%, transparent);
        }
        .lab-dosing-row-v01511:first-child { border-top: 0; }
        .lab-dosing-product-v01511 {
          min-width: 0;
          font-size: 0.82rem;
          line-height: 1.35;
          font-weight: 650;
          color: var(--primary-text-color);
        }
        .lab-dosing-dose-v01511 {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 2px;
          white-space: nowrap;
        }
        .lab-dosing-dose-v01511 strong {
          font-size: 0.84rem;
          color: var(--info-color, #4b9fe1);
        }
        .lab-dosing-dose-v01511 span {
          font-size: 0.70rem;
          color: var(--secondary-text-color);
        }
        .lab-dosing-daily-v01512 {
          margin-top: 2px;
        }
        .lab-dosing-note-v01511 {
          display: flex;
          gap: 7px;
          align-items: flex-start;
          margin-top: 7px;
          padding: 9px 10px;
          border-radius: 10px;
          font-size: 0.74rem;
          line-height: 1.4;
          color: var(--secondary-text-color);
          background: color-mix(in srgb, var(--info-color, #4b9fe1) 7%, transparent);
        }
        .lab-dosing-note-v01511 ha-icon {
          flex: 0 0 auto;
          --mdc-icon-size: 17px;
          color: var(--info-color, #4b9fe1);
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

          .lab-dosing-row-v01511 {
            grid-template-columns: 1fr;
            gap: 4px;
            padding-block: 9px;
          }
          .lab-dosing-dose-v01511 {
            align-items: flex-start;
            flex-direction: row;
            gap: 7px;
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
