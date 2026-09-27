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

    function reefIcpCalculatedDailyDose(row, language) {
      if (row?.daily || !row?.amount || !row?.frequency) return "";

      const daysMatch = String(row.frequency).match(/(?:aufgeteilt\s+auf\s+)?(\d+)\s*(?:Tage|days?)\b/i);
      if (!daysMatch) return "";

      const amount = Number(String(row.amount).replace(",", "."));
      const days = Number(daysMatch[1]);
      if (!Number.isFinite(amount) || !Number.isFinite(days) || amount <= 0 || days <= 0) {
        return "";
      }

      const daily = amount / days;
      const rounded = Math.round((daily + Number.EPSILON) * 100) / 100;
      const formatted = rounded
        .toLocaleString(language === "de" ? "de-DE" : "en-US", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });

      return language === "de"
        ? `${formatted} ml täglich`
        : `${formatted} ml daily`;
    }

    function reefIcpLabDosingHtml(parsed, labels, language = "de") {
      return `
        <div class="lab-dosing-list-v01511">
          ${parsed.rows.map((row) => {
            const calculatedDaily = reefIcpCalculatedDailyDose(row, language);
            const displayedDaily = row.daily || calculatedDaily;
            return `
              <div class="lab-dosing-row-v01511">
                <div class="lab-dosing-product-v01511">${reefIcpEscape(row.product)}</div>
                <div class="lab-dosing-dose-v01511">
                  <strong>${reefIcpEscape(row.amount)} ml${row.frequency ? (language === "de" ? " insgesamt" : " total") : ""}</strong>
                  ${row.frequency ? `<span>${reefIcpEscape(row.frequency.replace(/^insgesamt\s*·\s*/i, ""))}</span>` : ""}
                  ${row.preparation ? `<span>${reefIcpEscape(row.preparation)}</span>` : ""}
                  ${displayedDaily ? `<strong class="lab-dosing-daily-v01512">→ ${reefIcpEscape(displayedDaily)}</strong>` : ""}
                </div>
              </div>
            `;
          }).join("")}
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
        valueNode.innerHTML = reefIcpLabDosingHtml(dosing, labels, language);
        report.classList.add("lab-assessment-v0159", "lab-dosing-report-v01511");
        report.dataset.reefIcpAssessmentV01511 = "true";
      }
    }



    function polishStockingProfile(card) {
      const shadow = card?.shadowRoot;
      if (!shadow) return;

      const panel = shadow.querySelector(".profile-insights-panel");
      if (!panel || panel.dataset.reefProfilePolished === "1") return;

      const language = reefIcpCardLanguage(card);
      const content = panel.querySelector(".profile-insight-content");
      const system = content?.querySelector(".recommendation-system");
      const groups = [...(content?.querySelectorAll(".profile-context-group") || [])];
      if (!content || !system || !groups.length) return;

      const rawContext = String(system.textContent || "").trim();
      const profileName = rawContext
        .replace(/^Kontext für\s+/i, "")
        .replace(/^Context for\s+/i, "")
        .trim() || "—";

      const itemCount = content.querySelectorAll(".profile-insight-item").length;

      system.classList.add("profile-hero-v01514");
      system.innerHTML = `
        <span class="profile-hero-icon-v01514">
          <ha-icon icon="mdi:fishbowl-outline"></ha-icon>
        </span>
        <span class="profile-hero-copy-v01514">
          <small>${language === "de" ? "Besatzprofil" : "Stocking profile"}</small>
          <strong>${reefIcpEscape(profileName)}</strong>
        </span>
        <span class="profile-hero-stats-v01514">
          <span>${itemCount} ${language === "de" ? (itemCount === 1 ? "relevanter Wert" : "relevante Werte") : (itemCount === 1 ? "relevant value" : "relevant values")}</span>
        </span>
      `;

      const contextMeta = (label) => {
        const normalized = String(label || "").toLocaleLowerCase();
        if (normalized.includes("karbonat") || normalized.includes("carbonate")) {
          return { icon: "mdi:chart-bell-curve-cumulative", key: "carbonate" };
        }
        if (normalized.includes("nähr") || normalized.includes("nutrient")) {
          return { icon: "mdi:sprout-outline", key: "nutrients" };
        }
        if (normalized.includes("salinit") || normalized.includes("salinity")) {
          return { icon: "mdi:waves-arrow-up", key: "salinity" };
        }
        return { icon: "mdi:flask-outline", key: "general" };
      };

      groups.forEach((group) => {
        const head = group.querySelector(".profile-group-head");
        const title = head?.querySelector("strong");
        if (!head || !title) return;

        const meta = contextMeta(title.textContent);
        group.classList.add("profile-context-group-v01514", `profile-context-${meta.key}-v01514`);

        if (!head.querySelector(".profile-context-icon-v01514")) {
          const icon = document.createElement("span");
          icon.className = "profile-context-icon-v01514";
          icon.innerHTML = `<ha-icon icon="${meta.icon}"></ha-icon>`;
          head.insertBefore(icon, title);
        }

        title.classList.add("profile-context-title-v01514");
        head.querySelector(".profile-attention")?.classList.add("profile-attention-v01514");

        group.querySelectorAll(".profile-insight-item").forEach((item) => {
          item.classList.add("profile-insight-item-v01514");
          item.querySelector(".profile-insight-value")?.classList.add("profile-insight-value-v01514");

          item.querySelectorAll(".profile-signal").forEach((signal) => {
            signal.classList.add("profile-signal-v01514");
            const signalText = String(signal.textContent || "").toLocaleLowerCase();
            if (
              signalText.includes("außerhalb") ||
              signalText.includes("auffällig") ||
              signalText.includes("outside") ||
              signalText.includes("flagged")
            ) {
              signal.classList.add("is-warning");
            } else if (
              signalText.includes("steigt") ||
              signalText.includes("fällt") ||
              signalText.includes("rising") ||
              signalText.includes("falling")
            ) {
              signal.classList.add("is-trend");
            }
          });
        });
      });

      content.querySelector(".profile-basis-note")?.classList.add("profile-basis-note-v01514");
      panel.dataset.reefProfilePolished = "1";
    }


    function reefIcpInterpretationText(language) {
      return language === "de"
        ? {
            overview: "Aufbereitung des Laborberichts",
            original: "Originaltext des Labors",
            originalHint: "Unverändert aus dem importierten Laborbericht",
            general: "Allgemeiner Hinweis",
            high: "Erhöht",
            low: "Zu niedrig",
            deficiency: "Mangel",
            action: "Maßnahme",
            note: "Hinweis",
          }
        : {
            overview: "Laboratory report overview",
            original: "Original laboratory text",
            originalHint: "Unchanged from the imported laboratory report",
            general: "General note",
            high: "Elevated",
            low: "Too low",
            deficiency: "Deficiency",
            action: "Action",
            note: "Note",
          };
    }

    const REEF_ICP_INTERPRETATION_TOPICS = [
      { key: "alkalinity", de: "Alkalinität (KH)", en: "Alkalinity (KH)", icon: "mdi:flask-outline", terms: ["alkalinität", "alkalinity", " kh "] },
      { key: "calcium", de: "Calcium", en: "Calcium", icon: "mdi:water-plus-outline", terms: ["calcium"] },
      { key: "iodine", de: "Iod", en: "Iodine", icon: "mdi:eyedropper-variant", terms: ["iodmangel", "iod ", "iod.", "iodine"] },
      { key: "zinc", de: "Zink", en: "Zinc", icon: "mdi:cog-outline", terms: ["zink", "zinc"] },
      { key: "molybdenum", de: "Molybdän", en: "Molybdenum", icon: "mdi:atom-variant", terms: ["molybdän", "molybdenum"] },
      { key: "lithium", de: "Lithium", en: "Lithium", icon: "mdi:atom", terms: ["lithium"] },
      { key: "phosphate", de: "Phosphat", en: "Phosphate", icon: "mdi:sprout-outline", terms: ["phosphat", "phosphate"] },
      { key: "nitrate", de: "Nitrat", en: "Nitrate", icon: "mdi:leaf-outline", terms: ["nitrat", "nitrate"] },
      { key: "silicon", de: "Silicium", en: "Silicon", icon: "mdi:blur", terms: ["silicium", "silizium", "silicon"] },
      { key: "magnesium", de: "Magnesium", en: "Magnesium", icon: "mdi:atom-variant", terms: ["magnesium"] },
      { key: "potassium", de: "Kalium", en: "Potassium", icon: "mdi:atom-variant", terms: ["kalium", "potassium"] },
      { key: "strontium", de: "Strontium", en: "Strontium", icon: "mdi:atom-variant", terms: ["strontium"] },
      { key: "bromide", de: "Bromid", en: "Bromide", icon: "mdi:atom-variant", terms: ["bromid", "bromide"] },
    ];

    function reefIcpInterpretationSentences(raw) {
      return String(raw || "")
        .replace(/\s+/g, " ")
        .trim()
        .split(/(?<=[.!?])\s+(?=[A-ZÄÖÜ])/)
        .map((value) => value.trim())
        .filter(Boolean);
    }

    function reefIcpInterpretationTopic(sentence) {
      const haystack = ` ${String(sentence || "").toLocaleLowerCase()} `;
      return REEF_ICP_INTERPRETATION_TOPICS.find((topic) =>
        topic.terms.some((term) => haystack.includes(term))
      ) || null;
    }

    function reefIcpInterpretationBadge(text, language) {
      const t = reefIcpInterpretationText(language);
      const value = String(text || "").toLocaleLowerCase();
      if (/(mangel|deficien)/.test(value)) return { tone: "low", label: t.deficiency };
      if (/(zu niedrig|too low|sehr gering|very low)/.test(value)) return { tone: "low", label: t.low };
      if (/(deutlich erhöht|stark erhöht|erhöht|elevated|high)/.test(value)) return { tone: "high", label: t.high };
      if (/(pausier|reduzier|kontroll|prüf|check|pause|reduce|dose|dosier|wasserwechsel|water change)/.test(value)) {
        return { tone: "action", label: t.action };
      }
      return { tone: "note", label: t.note };
    }

    function polishLaboratoryInterpretation(card) {
      const shadow = card?.shadowRoot;
      if (!shadow) return;

      const panel = shadow.querySelector("details.interpretation-panel");
      const content = panel?.querySelector(":scope > .interpretation-text");
      if (!panel || !content || content.dataset.reefIcpInterpretationPolished === "1") return;

      const raw = String(content.textContent || "").replace(/\s+/g, " ").trim();
      if (!raw) return;

      const language = reefIcpCardLanguage(card);
      const t = reefIcpInterpretationText(language);
      const sentences = reefIcpInterpretationSentences(raw);
      if (!sentences.length) return;

      const groups = [];
      let current = null;
      for (const sentence of sentences) {
        const topic = reefIcpInterpretationTopic(sentence);
        if (topic) {
          current = groups.find((group) => group.topic?.key === topic.key);
          if (!current) {
            current = { topic, sentences: [] };
            groups.push(current);
          }
          current.sentences.push(sentence);
        } else if (current) {
          current.sentences.push(sentence);
        } else {
          let general = groups.find((group) => !group.topic);
          if (!general) {
            general = { topic: null, sentences: [] };
            groups.push(general);
          }
          general.sentences.push(sentence);
        }
      }

      const cards = groups
        .filter((group) => group.sentences.length)
        .map((group) => {
          const body = group.sentences.join(" ");
          const badge = reefIcpInterpretationBadge(body, language);
          const title = group.topic
            ? (language === "de" ? group.topic.de : group.topic.en)
            : t.general;
          const icon = group.topic?.icon || "mdi:text-box-outline";
          return `
            <section class="lab-interpretation-item-v01516 is-${reefIcpEscape(badge.tone)}">
              <div class="lab-interpretation-head-v01516">
                <span class="lab-interpretation-icon-v01516">
                  <ha-icon icon="${reefIcpEscape(icon)}"></ha-icon>
                </span>
                <strong>${reefIcpEscape(title)}</strong>
                <span class="lab-interpretation-badge-v01516">${reefIcpEscape(badge.label)}</span>
              </div>
              <div class="lab-interpretation-copy-v01516">${reefIcpEscape(body)}</div>
            </section>
          `;
        })
        .join("");

      content.dataset.reefIcpInterpretationPolished = "1";
      content.classList.add("lab-interpretation-v01516");
      content.innerHTML = `
        <div class="lab-interpretation-kicker-v01516">${reefIcpEscape(t.overview)}</div>
        <div class="lab-interpretation-list-v01516">${cards}</div>
        <details class="lab-interpretation-original-v01516">
          <summary>
            <span>
              <strong>${reefIcpEscape(t.original)}</strong>
              <small>${reefIcpEscape(t.originalHint)}</small>
            </span>
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </summary>
          <div class="lab-interpretation-original-copy-v01516">${reefIcpEscape(raw)}</div>
        </details>
      `;
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


        /* Stocking profile overview */
        .profile-insights-panel .profile-insight-content {
          display: grid;
          gap: 10px;
        }
        .profile-hero-v01514 {
          display: grid !important;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 10px;
          margin: 0 !important;
          padding: 9px 11px !important;
          border: 1px solid color-mix(in srgb, var(--primary-color) 18%, transparent);
          border-radius: 13px;
          background:
            radial-gradient(circle at 8% 20%, color-mix(in srgb, var(--primary-color) 12%, transparent), transparent 38%),
            color-mix(in srgb, var(--secondary-background-color) 72%, transparent);
        }
        .profile-hero-icon-v01514 {
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          border-radius: 11px;
          color: var(--primary-color);
          background: color-mix(in srgb, var(--primary-color) 13%, transparent);
        }
        .profile-hero-icon-v01514 ha-icon { --mdc-icon-size: 21px; }
        .profile-hero-copy-v01514 { display: grid; gap: 1px; min-width: 0; }
        .profile-hero-copy-v01514 small {
          color: var(--secondary-text-color);
          font-size: 0.64rem;
          font-weight: 650;
          text-transform: uppercase;
          letter-spacing: 0.045em;
        }
        .profile-hero-copy-v01514 strong {
          overflow: hidden;
          color: var(--primary-text-color);
          font-size: 0.91rem;
          font-weight: 750;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .profile-hero-stats-v01514 {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          gap: 5px;
          max-width: 190px;
        }
        .profile-hero-stats-v01514 > span {
          padding: 3px 7px;
          border-radius: 999px;
          color: var(--secondary-text-color);
          background: color-mix(in srgb, var(--primary-color) 7%, var(--card-background-color));
          font-size: 0.61rem;
          font-weight: 700;
          white-space: nowrap;
        }
        .profile-hero-stats-v01514 > span.is-attention {
          color: var(--warning-color, #f9a825);
          background: color-mix(in srgb, var(--warning-color, #f9a825) 9%, transparent);
        }
        .profile-group-list { gap: 9px !important; }
        .profile-context-group-v01514 {
          position: relative;
          overflow: hidden;
          padding: 11px !important;
          border: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
          background: color-mix(in srgb, var(--secondary-background-color) 58%, transparent) !important;
        }
        .profile-context-group-v01514::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 3px;
          background: color-mix(in srgb, var(--primary-color) 72%, transparent);
        }
        .profile-context-group-v01514 .profile-group-head {
          display: grid !important;
          grid-template-columns: auto minmax(0, 1fr) auto;
          justify-content: initial !important;
          gap: 8px !important;
        }
        .profile-context-icon-v01514 {
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border-radius: 9px;
          color: var(--primary-color);
          background: color-mix(in srgb, var(--primary-color) 10%, transparent);
        }
        .profile-context-icon-v01514 ha-icon { --mdc-icon-size: 17px; }
        .profile-context-title-v01514 { align-self: center; font-size: 0.82rem !important; }
        .profile-attention-v01514 { align-self: center; padding: 3px 7px !important; }
        .profile-attention-v01514.high {
          color: var(--warning-color, #f9a825) !important;
          background: color-mix(in srgb, var(--warning-color, #f9a825) 9%, transparent) !important;
        }
        .profile-context-group-v01514 .profile-group-reason {
          margin: 8px 0 0 38px !important;
          padding-bottom: 8px;
          border-bottom: 1px solid color-mix(in srgb, var(--divider-color) 65%, transparent);
          font-size: 0.67rem !important;
          line-height: 1.42 !important;
        }
        .profile-context-group-v01514 .profile-insight-list { gap: 6px !important; margin-top: 8px !important; }
        .profile-insight-item-v01514 {
          padding: 8px 9px !important;
          border: 1px solid color-mix(in srgb, var(--divider-color) 55%, transparent);
          background: color-mix(in srgb, var(--card-background-color) 52%, transparent) !important;
        }
        .profile-insight-item-v01514 .profile-insight-head strong { font-size: 0.79rem !important; }
        .profile-insight-value-v01514 {
          padding: 2px 7px;
          border-radius: 999px;
          color: var(--primary-text-color) !important;
          background: color-mix(in srgb, var(--primary-color) 8%, transparent);
          font-size: 0.72rem !important;
        }
        .profile-signal-v01514 { gap: 6px !important; margin-top: 5px !important; font-size: 0.67rem !important; }
        .profile-signal-v01514.is-warning ha-icon { color: var(--warning-color, #f9a825) !important; }
        .profile-signal-v01514.is-trend ha-icon { color: var(--primary-color) !important; }
        .profile-basis-note-v01514 {
          margin-top: 0 !important;
          padding: 7px 9px !important;
          border-radius: 10px;
          font-size: 0.66rem !important;
          line-height: 1.38 !important;
          background: color-mix(in srgb, var(--primary-color) 5%, transparent);
        }
        .profile-basis-note-v01514 ha-icon {
          --mdc-icon-size: 16px !important;
        }


        .lab-interpretation-v01516 {
          display: grid !important;
          gap: 12px !important;
          padding-top: 12px !important;
        }
        .lab-interpretation-kicker-v01516 {
          color: color-mix(in srgb, var(--warning-color, #ff9800) 78%, var(--primary-text-color));
          font-size: 0.67rem;
          font-weight: 800;
          letter-spacing: 0.075em;
          text-transform: uppercase;
        }
        .lab-interpretation-list-v01516 {
          display: grid;
          gap: 10px;
        }
        .lab-interpretation-item-v01516 {
          position: relative;
          overflow: hidden;
          padding: 13px 14px;
          border: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
          border-radius: 13px;
          background: color-mix(in srgb, var(--card-background-color) 92%, transparent);
        }
        .lab-interpretation-item-v01516::before {
          position: absolute;
          inset: 0 auto 0 0;
          width: 3px;
          content: "";
          background: color-mix(in srgb, var(--warning-color, #ff9800) 75%, transparent);
        }
        .lab-interpretation-item-v01516.is-low::before {
          background: var(--info-color, #039be5);
        }
        .lab-interpretation-head-v01516 {
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          align-items: center;
          gap: 9px;
          margin-bottom: 9px;
        }
        .lab-interpretation-head-v01516 > strong {
          min-width: 0;
          color: var(--primary-text-color);
          font-size: 0.88rem;
          line-height: 1.2;
        }
        .lab-interpretation-icon-v01516 {
          display: inline-flex;
          width: 30px;
          height: 30px;
          align-items: center;
          justify-content: center;
          border-radius: 9px;
          color: var(--warning-color, #ff9800);
          background: color-mix(in srgb, var(--warning-color, #ff9800) 12%, transparent);
        }
        .lab-interpretation-icon-v01516 ha-icon { --mdc-icon-size: 18px; }
        .lab-interpretation-badge-v01516 {
          padding: 4px 8px;
          border-radius: 999px;
          color: color-mix(in srgb, var(--warning-color, #ff9800) 86%, var(--primary-text-color));
          background: color-mix(in srgb, var(--warning-color, #ff9800) 11%, transparent);
          font-size: 0.62rem;
          font-weight: 750;
          white-space: nowrap;
        }
        .lab-interpretation-item-v01516.is-low .lab-interpretation-badge-v01516 {
          color: var(--info-color, #039be5);
          background: color-mix(in srgb, var(--info-color, #039be5) 11%, transparent);
        }
        .lab-interpretation-copy-v01516 {
          color: var(--secondary-text-color);
          font-size: 0.75rem;
          line-height: 1.55;
        }
        .lab-interpretation-original-v01516 {
          overflow: hidden;
          border: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
          border-radius: 12px;
          background: color-mix(in srgb, var(--card-background-color) 86%, transparent);
        }
        .lab-interpretation-original-v01516 > summary {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          align-items: center;
          gap: 10px;
          padding: 11px 12px;
          cursor: pointer;
          list-style: none;
        }
        .lab-interpretation-original-v01516 > summary::-webkit-details-marker { display: none; }
        .lab-interpretation-original-v01516 > summary > span { display: grid; gap: 2px; }
        .lab-interpretation-original-v01516 > summary strong {
          color: var(--primary-text-color);
          font-size: 0.76rem;
        }
        .lab-interpretation-original-v01516 > summary small {
          color: var(--secondary-text-color);
          font-size: 0.64rem;
        }
        .lab-interpretation-original-v01516[open] > summary ha-icon { transform: rotate(180deg); }
        .lab-interpretation-original-v01516 > summary ha-icon {
          --mdc-icon-size: 19px;
          transition: transform 160ms ease;
        }
        .lab-interpretation-original-copy-v01516 {
          padding: 0 12px 12px;
          color: var(--secondary-text-color);
          font-size: 0.7rem;
          line-height: 1.55;
        }

        @media (max-width: 560px) {
          .lab-interpretation-item-v01516 { padding: 11px 11px 11px 13px; }
          .lab-interpretation-head-v01516 { gap: 7px; }
          .lab-interpretation-badge-v01516 { padding: 3px 6px; font-size: 0.58rem; }
          .lab-interpretation-copy-v01516 { font-size: 0.72rem; }

          .profile-hero-v01514 {
            grid-template-columns: auto minmax(0, 1fr) auto;
            gap: 8px;
          }
          .profile-hero-stats-v01514 {
            grid-column: auto;
            justify-content: flex-end;
            max-width: 145px;
            padding-left: 0;
          }
          .profile-hero-stats-v01514 > span {
            font-size: 0.58rem;
            padding: 3px 6px;
          }
          .profile-context-group-v01514 .profile-group-reason { margin-left: 0 !important; }
          .profile-context-group-v01514 .profile-group-head {
            grid-template-columns: auto minmax(0, 1fr) auto;
            gap: 7px !important;
          }
          .profile-attention-v01514 {
            grid-column: auto;
            justify-self: end;
            white-space: nowrap;
          }


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
      polishStockingProfile(card);
      polishLaboratoryInterpretation(card);
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
