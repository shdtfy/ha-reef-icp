const REEF_ICP_UI_VERSION = "0.15.3";

const UI_TEXT = {
  de: {
    title: "Riff-/Nährstoffmethode",
    methodBadge: "Riffmethode",
    manufacturerBased: "Herstellerbasiert",
    overview: "Übersicht",
    details: "Details",
    amount: "Menge",
    dose: "Dosis",
    frequency: "Rhythmus",
    reactorFlow: "Reaktor-Durchfluss",
    mediaChange: "Medienwechsel",
    mediaFraction: "Anteil wechseln",
    startAmount: "Startmenge",
    maximumAmount: "Maximalmenge",
    cleanEvery: "Reinigen",
    replaceEvery: "Ersetzen",
    phase: "Phase",
    week: "Woche",
    weeks: "Wochen",
    days: "Tage",
    daily: "täglich",
    every2Days: "alle 2 Tage",
    every4Days: "alle 4 Tage",
    continuous: "dauerhaft",
    source: "Herstellerquelle",
    source2: "Herstellerquelle 2",
    noGuidance: "Für diese Methode sind aktuell keine berechenbaren Vorgaben hinterlegt.",
    methodInfo: "Die Angaben werden aus den hinterlegten Herstellervorgaben auf dein Aquarienvolumen skaliert und getrennt vom Versorgungssystem dargestellt.",
    microbacter: "MicroBacter7",
    biofuel: "Reef BioFuel",
    supportAroundChange: "Begleitdosierung um Medienwechsel",
    perDay: "/Tag",
    perWeek: "/Woche",
    capsuleOne: "Kapsel",
    capsuleMany: "Kapseln",
    dropOne: "Tropfen",
    dropMany: "Tropfen",
    measuringSpoonOne: "Messlöffel",
    measuringSpoonMany: "Messlöffel",
    stageWeeks12: "Wochen 1–2",
    stageWeeks34: "Wochen 3–4",
    stageWeek5: "Woche 5",
    stageAfterWeek5: "Dauerbetrieb",
    zeovitCleaningNote: "Halte das Zeolith frei von Ablagerungen, indem du den Reinigungsstab des Reaktors täglich bewegst.",
    zeovitCaution: "Werte für den Dauerbetrieb. Bei Beckenstart oder Umstellung gelten laut Hersteller abweichende Durchflussvorgaben.",
    zeoMixNote: "Vor Verwendung mit Osmosewasser spülen; Schütteln ist nicht erforderlich.",
    sangokaiUnknownPo4: "Ab Woche 5: 0,25 ml/100 L/Tag bei PO4 < 0,02 mg/L, sonst 0,5 ml/100 L/Tag.",
    sangokaiLowPo4: "PO4 < 0,02 mg/L.",
    sangokaiHighPo4: "PO4 ≥ 0,02 mg/L.",
    nopoxSelectProfile: "Wähle ein unterstütztes Besatzprofil, damit Reef ICP die Herstellertabelle anwenden kann.",
    nopoxProgramNote: "Durchschnittliche tägliche Herstellerdosis nach Aquarientyp, keine direkte Korrekturdosis aus einem einzelnen ICP-Ergebnis.",
    maxFlow: "Max. Durchfluss",
    setup: "Einführungsphase",
    phosphate: "PO4-Kontext",
  },
  en: {
    title: "Reef / nutrient method",
    methodBadge: "Reef method",
    manufacturerBased: "Manufacturer based",
    overview: "Overview",
    details: "Details",
    amount: "Amount",
    dose: "Dose",
    frequency: "Frequency",
    reactorFlow: "Reactor flow",
    mediaChange: "Media change",
    mediaFraction: "Replace fraction",
    startAmount: "Starting amount",
    maximumAmount: "Maximum amount",
    cleanEvery: "Clean",
    replaceEvery: "Replace",
    phase: "Stage",
    week: "Week",
    weeks: "weeks",
    days: "days",
    daily: "daily",
    every2Days: "every 2 days",
    every4Days: "every 4 days",
    continuous: "continuous",
    source: "Manufacturer source",
    source2: "Manufacturer source 2",
    noGuidance: "No calculated guidance is stored for this method yet.",
    methodInfo: "Values are scaled from the stored manufacturer guidance to your aquarium volume and shown independently from the mineral supply system.",
    microbacter: "MicroBacter7",
    biofuel: "Reef BioFuel",
    supportAroundChange: "Support dosing around media change",
    perDay: "/day",
    perWeek: "/week",
    capsuleOne: "capsule",
    capsuleMany: "capsules",
    dropOne: "drop",
    dropMany: "drops",
    measuringSpoonOne: "measuring spoon",
    measuringSpoonMany: "measuring spoons",
    stageWeeks12: "Weeks 1–2",
    stageWeeks34: "Weeks 3–4",
    stageWeek5: "Week 5",
    stageAfterWeek5: "Maintenance",
    zeovitCleaningNote: "Keep the media free of deposits by moving the reactor cleaning rod daily.",
    zeovitCaution: "Long-term ZEOvit values. Tank conversion and new-tank startup use different published flow regimes.",
    zeoMixNote: "Rinse with RODI before use; shaking is not required.",
    sangokaiUnknownPo4: "After week 5: 0.25 ml/100 L/day when PO4 < 0.02 mg/L, otherwise 0.5 ml/100 L/day.",
    sangokaiLowPo4: "PO4 < 0.02 mg/L.",
    sangokaiHighPo4: "PO4 ≥ 0.02 mg/L.",
    nopoxSelectProfile: "Select a supported stocking profile for a manufacturer-table dose.",
    nopoxProgramNote: "Manufacturer average daily program dose by aquarium type, not a one-result ICP correction.",
    maxFlow: "Max. flow",
    setup: "Establishment",
    phosphate: "PO4 context",
  },
};

function uiLanguage(hass) {
  return String(hass?.language || hass?.locale?.language || "en")
    .toLowerCase()
    .startsWith("de")
    ? "de"
    : "en";
}

function uiEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function uiDigits(value) {
  const number = Math.abs(Number(value));
  if (!Number.isFinite(number)) return 0;
  if (number >= 100) return 0;
  if (number >= 1) return 1;
  if (number >= 0.1) return 2;
  if (number >= 0.01) return 3;
  return 4;
}

function uiNumber(value, language, digits = null) {
  const number = Number(value);
  if (!Number.isFinite(number)) return "";
  return new Intl.NumberFormat(language === "de" ? "de-DE" : "en-US", {
    maximumFractionDigits:
      Number.isInteger(digits) && digits >= 0 ? digits : uiDigits(number),
  }).format(number);
}

function uiFrequency(value, t) {
  const map = {
    daily: t.daily,
    daily_single_bolus: t.daily,
    every_2_days: t.every2Days,
    every_4_days: t.every4Days,
    continuous: t.continuous,
  };
  return map[value] || String(value || "").replaceAll("_", " ");
}

function uiUnit(unit, value, t) {
  const normalized = String(unit || "").toLowerCase();
  const numeric = Number(value);
  const singular = Number.isFinite(numeric) && Math.abs(numeric - 1) < 1e-9;
  if (normalized === "weeks") return t.weeks;
  if (normalized === "days") return t.days;
  if (normalized === "capsule") return singular ? t.capsuleOne : t.capsuleMany;
  if (normalized === "drop") return singular ? t.dropOne : t.dropMany;
  if (normalized === "measuring_spoon")
    return singular ? t.measuringSpoonOne : t.measuringSpoonMany;
  return unit || "";
}

function uiStage(value, t) {
  const map = {
    "Weeks 1-2": t.stageWeeks12,
    "Weeks 3-4": t.stageWeeks34,
    "Week 5": t.stageWeek5,
    "After week 5": t.stageAfterWeek5,
  };
  return map[value] || value || "";
}

function uiProduct(value, language) {
  if (language !== "de") return value || "";
  const map = {
    "ZEOvit reactor": "ZEOvit-Reaktor",
    "Zeo Mix reactor": "Zeo-Mix-Reaktor",
    "Fauna Marin zeolite": "Fauna Marin Zeolith",
  };
  return map[value] || value || "";
}

function uiItemNote(item, t) {
  if (!item || typeof item !== "object") return "";
  if (item.key === "cleaning") return t.zeovitCleaningNote;
  if (item.key === "zeo_mix") return t.zeoMixNote;
  if (item.key === "nopox" && item.note) return t.nopoxSelectProfile;
  return item.note || "";
}

function uiGuidanceNote(guidance, method, t) {
  if (method === "sangokai_basis") {
    const raw = guidance?.phosphate_mg_l;
    if (raw === null || raw === undefined || raw === "") return t.sangokaiUnknownPo4;
    const po4 = Number(raw);
    if (!Number.isFinite(po4)) return t.sangokaiUnknownPo4;
    return po4 < 0.02 ? t.sangokaiLowPo4 : t.sangokaiHighPo4;
  }
  if (method === "red_sea_nopox") return t.nopoxProgramNote;
  return guidance?.note || "";
}

function uiGuidanceCaution(guidance, method, t) {
  if (method === "korallen_zucht_zeovit") return t.zeovitCaution;
  return guidance?.caution || "";
}

function uiRow(icon, label, value, emphasis = false) {
  if (value === undefined || value === null || value === "") return "";
  return `
    <div class="reef-method-row-v0153${emphasis ? " is-emphasis" : ""}">
      <ha-icon icon="${uiEscape(icon)}"></ha-icon>
      <span>${uiEscape(label)}</span>
      <strong>${uiEscape(value)}</strong>
    </div>
  `;
}

function uiItemRows(item, language, t, { includeStage = false } = {}) {
  const rows = [];
  const unit = uiUnit(item.unit, item.amount, t);

  if (includeStage && item.stage) {
    rows.push(uiRow("mdi:timeline-clock-outline", t.phase, uiStage(item.stage, t)));
  }

  if (Number.isFinite(Number(item.amount))) {
    rows.push(
      uiRow(
        "mdi:beaker-outline",
        item.kind === "dose" || item.kind === "dose_range" ? t.dose : t.amount,
        `${uiNumber(item.amount, language)}${unit ? ` ${unit}` : ""}`,
        true
      )
    );
  }

  if (Number.isFinite(Number(item.minimum)) || Number.isFinite(Number(item.maximum))) {
    const min = Number.isFinite(Number(item.minimum)) ? uiNumber(item.minimum, language) : "—";
    const max = Number.isFinite(Number(item.maximum)) ? uiNumber(item.maximum, language) : "—";
    const reference = Number.isFinite(Number(item.maximum)) ? item.maximum : item.minimum;
    const rangeUnit = uiUnit(item.unit, reference, t);
    const label = item.kind === "flow" ? t.reactorFlow : item.kind === "interval" ? t.mediaChange : t.dose;
    rows.push(
      uiRow(
        item.kind === "flow" ? "mdi:pump" : item.kind === "interval" ? "mdi:calendar-refresh" : "mdi:arrow-expand-horizontal",
        label,
        `${min}–${max}${rangeUnit ? ` ${rangeUnit}` : ""}`,
        true
      )
    );
  }

  if (item.frequency) {
    rows.push(uiRow("mdi:calendar-sync-outline", t.frequency, uiFrequency(item.frequency, t)));
  }
  if (item.clean_every_days) {
    rows.push(uiRow("mdi:broom", t.cleanEvery, `${item.clean_every_days} ${t.days}`));
  }
  if (item.replace_every_weeks) {
    rows.push(uiRow("mdi:refresh", t.replaceEvery, `${item.replace_every_weeks} ${t.weeks}`));
  }
  if (Number.isFinite(Number(item.max_reactor_flow_l_h))) {
    rows.push(uiRow("mdi:pump", t.maxFlow, `≤ ${uiNumber(item.max_reactor_flow_l_h, language)} L/h`, true));
  }
  if (Number.isFinite(Number(item.start_amount))) {
    const startUnit = uiUnit(item.unit, item.start_amount, t);
    rows.push(uiRow("mdi:play-outline", t.startAmount, `${uiNumber(item.start_amount, language)}${startUnit ? ` ${startUnit}` : ""}`));
  }
  if (Number.isFinite(Number(item.maximum_amount))) {
    const maxUnit = uiUnit(item.unit, item.maximum_amount, t);
    rows.push(uiRow("mdi:gauge-full", t.maximumAmount, `${uiNumber(item.maximum_amount, language)}${maxUnit ? ` ${maxUnit}` : ""}`));
  }
  if (Number.isFinite(Number(item.neozeo_add_g_per_week))) {
    rows.push(uiRow("mdi:grain", "NeoZeo", `${uiNumber(item.neozeo_add_g_per_week, language)} g ${t.perWeek}`, true));
  }
  if (Number.isFinite(Number(item.reactor_flow_l_h))) {
    rows.push(uiRow("mdi:pump", t.reactorFlow, `${uiNumber(item.reactor_flow_l_h, language)} L/h`, true));
  }
  if (Number.isFinite(Number(item.microbacter7_ml_daily))) {
    rows.push(uiRow("mdi:bacteria-outline", t.microbacter, `${uiNumber(item.microbacter7_ml_daily, language)} ml ${t.perDay}`));
  }
  if (Number.isFinite(Number(item.reef_biofuel_ml_daily))) {
    rows.push(uiRow("mdi:flask-outline", t.biofuel, `${uiNumber(item.reef_biofuel_ml_daily, language)} ml ${t.perDay}`));
  }
  if (Number.isFinite(Number(item.media_change_fraction))) {
    rows.push(uiRow("mdi:refresh", t.mediaFraction, `${uiNumber(item.media_change_fraction * 100, language, 1)} %`, true));
  }
  if (Number.isFinite(Number(item.media_change_every_weeks))) {
    rows.push(uiRow("mdi:calendar-refresh", t.mediaChange, `${uiNumber(item.media_change_every_weeks, language)} ${t.weeks}`, true));
  }

  const supportDays = Number(item.support_dose_duration_days);
  if (Number.isFinite(Number(item.microbacter7_ml_daily_around_change)) && Number.isFinite(supportDays)) {
    rows.push(
      uiRow(
        "mdi:bacteria-outline",
        `${t.microbacter} · ${t.supportAroundChange}`,
        `${uiNumber(item.microbacter7_ml_daily_around_change, language)} ml ${t.perDay} · ${uiNumber(supportDays, language)} ${t.days}`
      )
    );
  }
  if (Number.isFinite(Number(item.reef_biofuel_ml_daily_around_change)) && Number.isFinite(supportDays)) {
    rows.push(
      uiRow(
        "mdi:flask-outline",
        `${t.biofuel} · ${t.supportAroundChange}`,
        `${uiNumber(item.reef_biofuel_ml_daily_around_change, language)} ml ${t.perDay} · ${uiNumber(supportDays, language)} ${t.days}`
      )
    );
  }

  const note = uiItemNote(item, t);
  if (note) {
    rows.push(`<div class="reef-method-inline-note-v0153"><ha-icon icon="mdi:information-outline"></ha-icon><span>${uiEscape(note)}</span></div>`);
  }
  return rows.join("");
}

function uiMetric(icon, label, value) {
  if (!value) return "";
  return `
    <div class="reef-method-kpi-v0153">
      <div class="reef-method-kpi-label-v0153"><ha-icon icon="${uiEscape(icon)}"></ha-icon><span>${uiEscape(label)}</span></div>
      <strong>${uiEscape(value)}</strong>
    </div>
  `;
}

function uiSummaryMetrics(guidance, method, language, t) {
  const items = Array.isArray(guidance?.items) ? guidance.items : [];
  const metrics = [];
  const push = (icon, label, value) => {
    if (value && metrics.length < 3) metrics.push(uiMetric(icon, label, value));
  };

  if (method === "brightwell_neozeo") {
    const stages = items.filter((item) => item?.kind === "stage");
    const first = stages[0];
    const maxFlow = stages.reduce((max, item) => Math.max(max, Number(item?.reactor_flow_l_h) || 0), 0);
    const maintenance = items.find((item) => item?.key === "maintenance");
    if (Number.isFinite(Number(first?.neozeo_add_g_per_week))) {
      push("mdi:grain", t.amount, `${uiNumber(first.neozeo_add_g_per_week, language)} g ${t.perWeek}`);
    }
    if (maxFlow > 0) push("mdi:pump", t.maxFlow, `${uiNumber(maxFlow, language)} L/h`);
    if (maintenance && Number.isFinite(Number(maintenance.media_change_every_weeks))) {
      const fraction = Number.isFinite(Number(maintenance.media_change_fraction))
        ? `${uiNumber(maintenance.media_change_fraction * 100, language, 1)} % · `
        : "";
      push("mdi:calendar-refresh", t.mediaChange, `${fraction}${uiNumber(maintenance.media_change_every_weeks, language)} ${t.weeks}`);
    }
    return metrics.join("");
  }

  const media = items.find((item) => item?.kind === "media" && Number.isFinite(Number(item.amount)));
  const flow = items.find((item) => item?.kind === "flow");
  const interval = items.find((item) => item?.kind === "interval");
  const replacement = items.find((item) => Number.isFinite(Number(item?.replace_every_weeks)));

  if (media) {
    const unit = uiUnit(media.unit, media.amount, t);
    push("mdi:grain", t.amount, `${uiNumber(media.amount, language)}${unit ? ` ${unit}` : ""}`);
  }
  if (flow && (Number.isFinite(Number(flow.minimum)) || Number.isFinite(Number(flow.maximum)))) {
    const min = Number.isFinite(Number(flow.minimum)) ? uiNumber(flow.minimum, language) : "—";
    const max = Number.isFinite(Number(flow.maximum)) ? uiNumber(flow.maximum, language) : "—";
    const unit = uiUnit(flow.unit, flow.maximum ?? flow.minimum, t);
    push("mdi:pump", t.reactorFlow, `${min}–${max}${unit ? ` ${unit}` : ""}`);
  }
  if (interval) {
    const min = Number.isFinite(Number(interval.minimum)) ? uiNumber(interval.minimum, language) : "—";
    const max = Number.isFinite(Number(interval.maximum)) ? uiNumber(interval.maximum, language) : "—";
    const unit = uiUnit(interval.unit, interval.maximum ?? interval.minimum, t);
    push("mdi:calendar-refresh", t.mediaChange, `${min}–${max}${unit ? ` ${unit}` : ""}`);
  } else if (replacement) {
    push("mdi:calendar-refresh", t.mediaChange, `${uiNumber(replacement.replace_every_weeks, language)} ${t.weeks}`);
  }

  for (const item of items) {
    if (metrics.length >= 3) break;
    if (!Number.isFinite(Number(item?.amount))) continue;
    const unit = uiUnit(item.unit, item.amount, t);
    const label = uiProduct(item.product || t.dose, language);
    const suffix = item.frequency ? ` · ${uiFrequency(item.frequency, t)}` : "";
    push("mdi:flask-outline", label, `${uiNumber(item.amount, language)}${unit ? ` ${unit}` : ""}${suffix}`);
  }

  if (method === "sangokai_basis" && metrics.length < 3 && guidance?.phosphate_mg_l !== null && guidance?.phosphate_mg_l !== undefined) {
    push("mdi:molecule", t.phosphate, `${uiNumber(guidance.phosphate_mg_l, language)} mg/L`);
  }

  return metrics.join("");
}

function uiEstablishment(guidance, language, t) {
  const steps = Array.isArray(guidance?.establishment) ? guidance.establishment : [];
  if (!steps.length) return "";
  return `
    <section class="reef-method-establishment-v0153">
      <div class="reef-method-section-title-v0153"><ha-icon icon="mdi:stairs-up"></ha-icon><span>${uiEscape(t.setup)}</span></div>
      <div class="reef-method-ramp-v0153">
        ${steps
          .map(
            (step) => `
              <div>
                <span>${uiEscape(t.week)} ${uiEscape(step.week)}</span>
                <strong>${uiEscape(uiNumber(step.dose_ml, language))} ml</strong>
              </div>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function uiNeoZeoTimeline(items, language, t) {
  return `
    <div class="reef-method-timeline-v0153">
      ${items
        .map((item, index) => {
          const title = uiStage(item.stage || item.key, t);
          return `
            <section class="reef-method-timeline-step-v0153${index === items.length - 1 ? " is-last" : ""}">
              <div class="reef-method-timeline-rail-v0153"><span></span></div>
              <div class="reef-method-timeline-body-v0153">
                <div class="reef-method-timeline-title-v0153">${uiEscape(title)}</div>
                <div class="reef-method-rows-v0153">${uiItemRows(item, language, t)}</div>
              </div>
            </section>
          `;
        })
        .join("")}
    </div>
  `;
}

function uiGenericDetails(items, language, t) {
  return `
    <div class="reef-method-detail-list-v0153">
      ${items
        .map((item) => {
          const title = uiProduct(item.product || uiStage(item.stage, t) || item.key || "—", language);
          return `
            <section class="reef-method-detail-item-v0153">
              <div class="reef-method-detail-title-v0153">${uiEscape(title)}</div>
              <div class="reef-method-rows-v0153">${uiItemRows(item, language, t, { includeStage: true })}</div>
            </section>
          `;
        })
        .join("")}
    </div>
  `;
}

function uiCallout(kind, icon, text) {
  if (!text) return "";
  return `
    <div class="reef-method-callout-v0153 ${uiEscape(kind)}">
      <ha-icon icon="${uiEscape(icon)}"></ha-icon>
      <span>${uiEscape(text)}</span>
    </div>
  `;
}

function uiSources(guidance, t) {
  const sources = [];
  const primary = String(guidance?.source_url || "");
  const secondary = String(guidance?.secondary_source_url || "");
  if (primary.startsWith("https://")) sources.push([primary, t.source]);
  if (secondary.startsWith("https://")) sources.push([secondary, t.source2]);
  if (!sources.length) return "";
  return `
    <div class="reef-method-sources-v0153">
      ${sources
        .map(
          ([url, label]) => `<a href="${uiEscape(url)}" target="_blank" rel="noopener noreferrer"><ha-icon icon="mdi:open-in-new"></ha-icon>${uiEscape(label)}</a>`
        )
        .join("")}
    </div>
  `;
}

function uiRenderMethodPanel(card, attrs) {
  const shadow = card?.shadowRoot;
  const panel = shadow?.querySelector("details.reef-method-panel");
  const method = attrs?.reef_method;
  const guidance = attrs?.reef_method_guidance;
  if (!panel || !method || method === "none" || !guidance || typeof guidance !== "object") return;

  const language = uiLanguage(card._hass);
  const t = UI_TEXT[language];
  const methodName = attrs.reef_method_name || guidance.method_name || method;
  const items = Array.isArray(guidance.items) ? guidance.items : [];
  const wasOpen = panel.open;
  const note = uiGuidanceNote(guidance, method, t);
  const caution = uiGuidanceCaution(guidance, method, t);
  const metrics = uiSummaryMetrics(guidance, method, language, t);
  const details = method === "brightwell_neozeo" ? uiNeoZeoTimeline(items, language, t) : uiGenericDetails(items, language, t);

  panel.classList.add("reef-method-panel-v0153");
  panel.innerHTML = `
    <summary class="info-summary reef-method-summary-v0153">
      <span class="reef-method-summary-icon-v0153"><ha-icon icon="mdi:filter-variant"></ha-icon></span>
      <span class="reef-method-summary-copy-v0153">
        <strong>${uiEscape(t.title)}</strong>
        <small>${uiEscape(methodName)}</small>
      </span>
      <span class="reef-method-badge-v0153">${uiEscape(t.methodBadge)}</span>
      <ha-icon class="info-chevron" icon="mdi:chevron-down"></ha-icon>
    </summary>
    <div class="info-content reef-method-content-v0153">
      <section class="reef-method-overview-v0153">
        <div class="reef-method-overview-head-v0153">
          <div>
            <span>${uiEscape(t.manufacturerBased)}</span>
            <h3>${uiEscape(methodName)}</h3>
          </div>
          <ha-icon icon="mdi:waves"></ha-icon>
        </div>
        ${metrics ? `<div class="reef-method-kpis-v0153">${metrics}</div>` : ""}
        ${uiCallout("info", "mdi:information-outline", t.methodInfo)}
      </section>
      ${uiEstablishment(guidance, language, t)}
      <section class="reef-method-details-v0153">
        <div class="reef-method-section-title-v0153"><ha-icon icon="mdi:tune-variant"></ha-icon><span>${uiEscape(t.details)}</span></div>
        ${items.length ? details : `<div class="reef-method-empty-v0153">${uiEscape(t.noGuidance)}</div>`}
      </section>
      ${uiCallout("info", "mdi:information-outline", note)}
      ${uiCallout("warning", "mdi:alert-outline", caution)}
      ${uiSources(guidance, t)}
    </div>
  `;
  panel.open = wasOpen;
}

function uiInjectStyles(card) {
  const shadow = card?.shadowRoot;
  if (!shadow || shadow.querySelector("style[data-reef-icp-ui-v0153]")) return;
  const style = document.createElement("style");
  style.dataset.reefIcpUiV0153 = "true";
  style.textContent = `
    details.reef-method-panel-v0153 {
      border: 0 !important;
      border-radius: 18px !important;
      overflow: hidden;
      background: color-mix(in srgb, var(--card-background-color) 96%, var(--primary-color) 4%) !important;
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 70%, transparent) !important;
    }
    .reef-method-summary-v0153 {
      min-height: 58px;
      padding: 10px 14px !important;
      gap: 10px !important;
      background: linear-gradient(105deg, color-mix(in srgb, var(--primary-color) 11%, transparent), transparent 58%);
    }
    .reef-method-summary-icon-v0153 {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      border-radius: 11px;
      background: color-mix(in srgb, var(--primary-color) 15%, transparent);
      color: var(--primary-color);
      flex: 0 0 auto;
    }
    .reef-method-summary-icon-v0153 ha-icon { --mdc-icon-size: 20px; }
    .reef-method-summary-copy-v0153 { min-width: 0; display: grid; gap: 2px; flex: 1 1 auto; }
    .reef-method-summary-copy-v0153 strong { font-size: 0.96rem; line-height: 1.2; }
    .reef-method-summary-copy-v0153 small {
      color: var(--secondary-text-color);
      font-size: 0.78rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .reef-method-badge-v0153 {
      border-radius: 999px;
      padding: 4px 8px;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
      white-space: nowrap;
    }
    .reef-method-content-v0153 { display: grid; gap: 16px; padding-top: 4px; }
    .reef-method-overview-v0153 { display: grid; gap: 12px; }
    .reef-method-overview-head-v0153 { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
    .reef-method-overview-head-v0153 > div { min-width: 0; }
    .reef-method-overview-head-v0153 span {
      display: block;
      color: var(--secondary-text-color);
      font-size: 0.68rem;
      font-weight: 800;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      margin-bottom: 3px;
    }
    .reef-method-overview-head-v0153 h3 { margin: 0; font-size: 1.22rem; line-height: 1.25; }
    .reef-method-overview-head-v0153 > ha-icon { --mdc-icon-size: 28px; color: color-mix(in srgb, var(--primary-color) 60%, var(--secondary-text-color)); opacity: 0.72; }
    .reef-method-kpis-v0153 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
    .reef-method-kpi-v0153 {
      min-width: 0;
      padding: 10px 11px;
      border-radius: 12px;
      background: color-mix(in srgb, var(--primary-color) 7%, var(--card-background-color));
    }
    .reef-method-kpi-label-v0153 { display: flex; gap: 5px; align-items: center; color: var(--secondary-text-color); font-size: 0.71rem; min-width: 0; }
    .reef-method-kpi-label-v0153 ha-icon { --mdc-icon-size: 15px; flex: 0 0 auto; }
    .reef-method-kpi-label-v0153 span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .reef-method-kpi-v0153 > strong { display: block; margin-top: 5px; font-size: 1.08rem; line-height: 1.15; font-weight: 780; overflow-wrap: anywhere; }
    .reef-method-callout-v0153 {
      display: grid;
      grid-template-columns: 20px 1fr;
      gap: 9px;
      align-items: start;
      padding: 10px 12px;
      border-radius: 10px;
      font-size: 0.84rem;
      line-height: 1.45;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--primary-color) 6%, transparent);
      border-left: 3px solid color-mix(in srgb, var(--primary-color) 58%, transparent);
    }
    .reef-method-callout-v0153.warning {
      background: color-mix(in srgb, var(--warning-color, #ff9800) 8%, transparent);
      border-left-color: var(--warning-color, #ff9800);
    }
    .reef-method-callout-v0153 ha-icon { --mdc-icon-size: 18px; margin-top: 1px; color: var(--primary-color); }
    .reef-method-callout-v0153.warning ha-icon { color: var(--warning-color, #ff9800); }
    .reef-method-section-title-v0153 { display: flex; gap: 7px; align-items: center; margin-bottom: 8px; color: var(--secondary-text-color); font-size: 0.75rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; }
    .reef-method-section-title-v0153 ha-icon { --mdc-icon-size: 17px; }
    .reef-method-details-v0153, .reef-method-establishment-v0153 { min-width: 0; }
    .reef-method-detail-list-v0153 { border-top: 1px solid var(--divider-color); }
    .reef-method-detail-item-v0153 { display: grid; grid-template-columns: minmax(130px, 0.8fr) minmax(0, 1.7fr); gap: 16px; padding: 12px 2px; border-bottom: 1px solid var(--divider-color); }
    .reef-method-detail-title-v0153 { font-weight: 720; line-height: 1.35; padding-top: 4px; }
    .reef-method-rows-v0153 { display: grid; gap: 1px; min-width: 0; }
    .reef-method-row-v0153 { display: grid; grid-template-columns: 18px minmax(80px, 1fr) auto; gap: 7px; align-items: center; min-height: 26px; font-size: 0.84rem; }
    .reef-method-row-v0153 ha-icon { --mdc-icon-size: 16px; color: var(--secondary-text-color); }
    .reef-method-row-v0153 span { color: var(--secondary-text-color); min-width: 0; }
    .reef-method-row-v0153 strong { text-align: right; font-size: 0.9rem; font-weight: 700; overflow-wrap: anywhere; }
    .reef-method-row-v0153.is-emphasis strong { font-size: 1rem; font-weight: 800; color: var(--primary-text-color); }
    .reef-method-inline-note-v0153 { display: grid; grid-template-columns: 18px 1fr; gap: 7px; margin-top: 5px; padding-top: 7px; border-top: 1px dashed color-mix(in srgb, var(--divider-color) 75%, transparent); color: var(--secondary-text-color); font-size: 0.8rem; line-height: 1.4; }
    .reef-method-inline-note-v0153 ha-icon { --mdc-icon-size: 16px; color: var(--primary-color); }
    .reef-method-timeline-v0153 { display: grid; }
    .reef-method-timeline-step-v0153 { display: grid; grid-template-columns: 22px 1fr; gap: 10px; min-width: 0; }
    .reef-method-timeline-rail-v0153 { position: relative; display: flex; justify-content: center; }
    .reef-method-timeline-rail-v0153::after { content: ""; position: absolute; top: 18px; bottom: -2px; width: 2px; background: color-mix(in srgb, var(--primary-color) 24%, var(--divider-color)); }
    .reef-method-timeline-step-v0153.is-last .reef-method-timeline-rail-v0153::after { display: none; }
    .reef-method-timeline-rail-v0153 span { position: relative; z-index: 1; width: 10px; height: 10px; margin-top: 5px; border-radius: 50%; background: var(--primary-color); box-shadow: 0 0 0 4px color-mix(in srgb, var(--primary-color) 12%, var(--card-background-color)); }
    .reef-method-timeline-body-v0153 { padding: 0 0 15px; min-width: 0; }
    .reef-method-timeline-title-v0153 { font-weight: 760; font-size: 0.95rem; margin-bottom: 5px; }
    .reef-method-ramp-v0153 { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); border-top: 1px solid var(--divider-color); border-bottom: 1px solid var(--divider-color); }
    .reef-method-ramp-v0153 > div { min-width: 0; padding: 8px 9px; border-right: 1px solid var(--divider-color); }
    .reef-method-ramp-v0153 > div:last-child { border-right: 0; }
    .reef-method-ramp-v0153 span { display: block; color: var(--secondary-text-color); font-size: 0.7rem; margin-bottom: 3px; }
    .reef-method-ramp-v0153 strong { font-size: 0.92rem; }
    .reef-method-sources-v0153 { display: flex; flex-wrap: wrap; gap: 8px; padding-top: 2px; }
    .reef-method-sources-v0153 a { display: inline-flex; align-items: center; gap: 5px; padding: 5px 9px; border-radius: 999px; text-decoration: none; color: var(--primary-color); background: color-mix(in srgb, var(--primary-color) 7%, transparent); font-size: 0.78rem; font-weight: 650; }
    .reef-method-sources-v0153 ha-icon { --mdc-icon-size: 15px; }
    .reef-method-empty-v0153 { color: var(--secondary-text-color); font-size: 0.86rem; padding: 8px 0; }
    @media (max-width: 560px) {
      .reef-method-badge-v0153 { display: none; }
      .reef-method-kpis-v0153 { grid-template-columns: 1fr; }
      .reef-method-kpi-v0153 { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 10px; }
      .reef-method-kpi-v0153 > strong { margin-top: 0; text-align: right; }
      .reef-method-detail-item-v0153 { grid-template-columns: 1fr; gap: 5px; }
      .reef-method-ramp-v0153 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .reef-method-ramp-v0153 > div { border-bottom: 1px solid var(--divider-color); }
      .reef-method-row-v0153 { grid-template-columns: 17px minmax(70px, 1fr) minmax(90px, auto); }
    }
  `;
  shadow.appendChild(style);
}

function uiInject(card) {
  const state = card?._config?.entity ? card?._hass?.states?.[card._config.entity] : null;
  const attrs = state?.attributes || {};
  uiInjectStyles(card);
  uiRenderMethodPanel(card, attrs);
}

customElements.whenDefined("reef-icp-card").then(() => {
  const Card = customElements.get("reef-icp-card");
  if (!Card || Card.prototype.__reefIcpUiV0153Patched) return;
  const originalRender = Card.prototype._render;
  if (typeof originalRender !== "function") return;

  Card.prototype._render = function (...args) {
    const result = originalRender.apply(this, args);
    try {
      uiInject(this);
    } catch (error) {
      console.warn("Reef ICP 0.15.3 UI layer failed", error);
    }
    return result;
  };
  Card.prototype.__reefIcpUiV0153Patched = true;

  document.querySelectorAll("reef-icp-card").forEach((card) => {
    try {
      card._render?.();
    } catch (_error) {
      // Normal Home Assistant lifecycle will render it on the next state update.
    }
  });
});

console.info(
  `%c REEF-ICP-UI ${REEF_ICP_UI_VERSION} `,
  "background:#005b59;color:white;font-weight:700;"
);
