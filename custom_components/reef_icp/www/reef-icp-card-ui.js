const REEF_ICP_UI_VERSION = "0.15.6";

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
    supportAroundChange: "Begleitdosierung",
    noDosing: "keine Dosierung",
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
    nextSteps: "Nächste Schritte",
    whatToDo: "Was ist zu tun?",
    actionOne: "Maßnahme",
    actionMany: "Maßnahmen",
    observationOne: "Beobachtung",
    observationMany: "Beobachtungen",
    noConcreteAction: "Keine konkrete Maßnahme",
    recommendationSources: "Empfehlungsquellen",
    additionalContext: "Weitere Einordnung",
    laboratoryBadge: "Labor",
    supplyBadge: "Versorgung",
    contextBadge: "Kontext",
    historyBadge: "Verlauf",
    interpretationBadge: "Labor-Text",
    laboratorySubtitle: "Direkt aus dem Laborbericht",
    supplySubtitle: "Aus deinem Versorgungssystem",
    profileSubtitle: "Einordnung nach Besatzprofil",
    historySubtitle: "Entwicklung seit der letzten ICP",
    interpretationSubtitle: "Originale Laborinterpretation",
    measurementsSection: "Messwerte",
    attentionOne: "auffälliger Wert",
    attentionMany: "auffällige Werte",
    withoutRatingOne: "ohne Bewertung",
    withoutRatingMany: "ohne Bewertung",
    allClear: "Alles im Soll",
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
    supportAroundChange: "Support dosing",
    noDosing: "no dosing",
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
    nextSteps: "Next steps",
    whatToDo: "What needs attention?",
    actionOne: "action",
    actionMany: "actions",
    observationOne: "observation",
    observationMany: "observations",
    noConcreteAction: "No concrete action",
    recommendationSources: "Recommendation sources",
    additionalContext: "Additional context",
    laboratoryBadge: "Laboratory",
    supplyBadge: "Supply",
    contextBadge: "Context",
    historyBadge: "History",
    interpretationBadge: "Lab text",
    laboratorySubtitle: "Directly from the laboratory report",
    supplySubtitle: "From your supply system",
    profileSubtitle: "Context from the stocking profile",
    historySubtitle: "Development since the previous ICP",
    interpretationSubtitle: "Original laboratory interpretation",
    measurementsSection: "Measurements",
    attentionOne: "flagged value",
    attentionMany: "flagged values",
    withoutRatingOne: "without rating",
    withoutRatingMany: "without rating",
    allClear: "All in range",
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


function uiSupportRow(icon, product, amount, days, language, t) {
  return `
    <div class="reef-method-support-row-v0153">
      <ha-icon icon="${uiEscape(icon)}"></ha-icon>
      <span class="reef-method-support-copy-v0153">
        <strong>${uiEscape(product)}</strong>
        <small>${uiEscape(t.supportAroundChange)} · ${uiEscape(uiNumber(days, language))} ${uiEscape(t.days)}</small>
      </span>
      <strong class="reef-method-support-value-v0153">${uiEscape(uiNumber(amount, language))} ml ${uiEscape(t.perDay)}</strong>
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
    const biofuelDaily = Number(item.reef_biofuel_ml_daily);
    rows.push(
      uiRow(
        "mdi:flask-outline",
        t.biofuel,
        biofuelDaily === 0
          ? t.noDosing
          : `${uiNumber(biofuelDaily, language)} ml ${t.perDay}`
      )
    );
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
      uiSupportRow(
        "mdi:bacteria-outline",
        t.microbacter,
        item.microbacter7_ml_daily_around_change,
        supportDays,
        language,
        t
      )
    );
  }
  if (Number.isFinite(Number(item.reef_biofuel_ml_daily_around_change)) && Number.isFinite(supportDays)) {
    rows.push(
      uiSupportRow(
        "mdi:flask-outline",
        t.biofuel,
        item.reef_biofuel_ml_daily_around_change,
        supportDays,
        language,
        t
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


function uiPlural(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`;
}

function uiActionPlanItems(plan) {
  const items = Array.isArray(plan?.items) ? plan.items : [];
  const actionItems = Array.isArray(plan?.action_items)
    ? plan.action_items
    : items.filter((item) => item?.has_action);
  const reviewItems = Array.isArray(plan?.review_items)
    ? plan.review_items
    : items.filter((item) => !item?.has_action);
  return { actionItems, reviewItems };
}

function uiUpgradeActionPlan(card, attrs) {
  const shadow = card?.shadowRoot;
  const panel = shadow?.querySelector("details.action-plan-panel");
  const plan = attrs?.action_plan;
  if (!panel || !plan || typeof plan !== "object") return;

  const language = uiLanguage(card._hass);
  const t = UI_TEXT[language];
  const { actionItems, reviewItems } = uiActionPlanItems(plan);
  const actionCount = actionItems.length;
  const reviewCount = reviewItems.length;
  const summary = panel.querySelector(":scope > summary.info-summary");
  if (!summary) return;

  panel.classList.add("action-plan-panel-v0155");
  summary.classList.add("action-plan-summary-v0155");

  const countText = [
    actionCount
      ? uiPlural(actionCount, t.actionOne, t.actionMany)
      : t.noConcreteAction,
    reviewCount
      ? uiPlural(reviewCount, t.observationOne, t.observationMany)
      : "",
  ]
    .filter(Boolean)
    .join(" · ");

  summary.innerHTML = `
    <span class="action-plan-summary-icon-v0155">
      <ha-icon icon="mdi:clipboard-check-outline"></ha-icon>
    </span>
    <span class="action-plan-summary-copy-v0155">
      <small>${uiEscape(t.nextSteps)}</small>
      <strong>${uiEscape(t.whatToDo)}</strong>
      <span>${uiEscape(countText)}</span>
    </span>
    <span class="action-plan-summary-pills-v0155">
      ${
        actionCount
          ? `<span class="action-plan-pill-v0155 is-action"><ha-icon icon="mdi:check-bold"></ha-icon>${uiEscape(actionCount)}</span>`
          : ""
      }
      ${
        reviewCount
          ? `<span class="action-plan-pill-v0155 is-observe"><ha-icon icon="mdi:eye-outline"></ha-icon>${uiEscape(reviewCount)}</span>`
          : ""
      }
    </span>
    <ha-icon class="info-chevron" icon="mdi:chevron-down"></ha-icon>
  `;
}

function uiUpgradePanelSummary(panel, options = {}) {
  if (!panel) return;
  const summary = panel.querySelector(":scope > summary.info-summary");
  if (!summary) return;

  const title = String(summary.querySelector("strong")?.textContent || "").trim();
  const icon =
    summary.querySelector(".info-icon ha-icon")?.getAttribute("icon") ||
    options.icon ||
    "mdi:information-outline";

  const kind = options.kind === "supplement" ? "supplement" : "source";
  panel.classList.add(
    kind === "source" ? "source-panel-v0155" : "supplement-panel-v0155"
  );
  if (options.tone) panel.classList.add(`source-${options.tone}-v0155`);
  summary.classList.add("source-summary-v0155");

  summary.innerHTML = `
    <span class="info-icon"><ha-icon icon="${uiEscape(icon)}"></ha-icon></span>
    <span class="source-summary-copy-v0155">
      <strong>${uiEscape(title)}</strong>
      ${options.subtitle ? `<small>${uiEscape(options.subtitle)}</small>` : ""}
    </span>
    ${
      options.badge
        ? `<span class="source-badge-v0155">${uiEscape(options.badge)}</span>`
        : ""
    }
    <ha-icon class="info-chevron" icon="mdi:chevron-down"></ha-icon>
  `;
}

function uiUpgradeRecommendationPanels(card, attrs) {
  const shadow = card?.shadowRoot;
  if (!shadow) return;
  const language = uiLanguage(card._hass);
  const t = UI_TEXT[language];

  const laboratory = shadow.querySelector("details.laboratory-panel");
  const supply = shadow.querySelector("details.recommendation-panel");
  const method = shadow.querySelector("details.reef-method-panel");
  const profile = shadow.querySelector("details.profile-insights-panel");
  const history = shadow.querySelector("details.insights-panel");
  const interpretation = shadow.querySelector("details.interpretation-panel");

  if (method) {
    method.classList.add("source-panel-v0155", "source-method-v0155");
  }

  uiUpgradePanelSummary(laboratory, {
    tone: "laboratory",
    badge: t.laboratoryBadge,
    subtitle: attrs?.provider_name || t.laboratorySubtitle,
  });
  uiUpgradePanelSummary(supply, {
    tone: "supply",
    badge: t.supplyBadge,
    subtitle: attrs?.supply_system_name || t.supplySubtitle,
  });
  uiUpgradePanelSummary(profile, {
    kind: "supplement",
    tone: "context",
    badge: t.contextBadge,
    subtitle: attrs?.stocking_profile_name || t.profileSubtitle,
  });
  uiUpgradePanelSummary(history, {
    kind: "supplement",
    tone: "history",
    badge: t.historyBadge,
    subtitle: t.historySubtitle,
  });
  uiUpgradePanelSummary(interpretation, {
    kind: "supplement",
    tone: "interpretation",
    badge: t.interpretationBadge,
    subtitle: attrs?.provider_name || t.interpretationSubtitle,
  });
}

function uiSectionLabel(text, className) {
  const label = document.createElement("div");
  label.className = `reef-ui-section-label-v0155 ${className}`;
  label.innerHTML = `<span></span><strong>${uiEscape(text)}</strong><span></span>`;
  return label;
}

function uiOrganizePanels(card) {
  const shadow = card?.shadowRoot;
  if (!shadow) return;
  const categories = shadow.querySelector(".categories");
  if (!categories) return;

  const language = uiLanguage(card._hass);
  const t = UI_TEXT[language];
  const action = shadow.querySelector("details.action-plan-panel");
  if (action) categories.insertAdjacentElement("beforebegin", action);

  shadow
    .querySelectorAll(".reef-ui-section-label-v0155")
    .forEach((node) => node.remove());

  const measurementLabel = uiSectionLabel(t.measurementsSection, "is-measurements");
  categories.insertAdjacentElement("beforebegin", measurementLabel);

  let anchor = categories;
  const sources = [
    shadow.querySelector("details.reef-method-panel"),
    shadow.querySelector("details.laboratory-panel"),
    shadow.querySelector("details.recommendation-panel"),
  ].filter(Boolean);

  for (const panel of sources) {
    anchor.insertAdjacentElement("afterend", panel);
    anchor = panel;
  }

  if (sources.length) {
    const label = uiSectionLabel(t.recommendationSources, "is-sources");
    sources[0].insertAdjacentElement("beforebegin", label);
  }

  const supplements = [
    shadow.querySelector("details.insights-panel"),
    shadow.querySelector("details.profile-insights-panel"),
    shadow.querySelector("details.interpretation-panel"),
  ].filter(Boolean);

  for (const panel of supplements) {
    anchor.insertAdjacentElement("afterend", panel);
    anchor = panel;
  }

  if (supplements.length) {
    const label = uiSectionLabel(t.additionalContext, "is-context");
    supplements[0].insertAdjacentElement("beforebegin", label);
  }
}


function uiCategoryStatusCount(summary, status) {
  return Array.from(
    summary.querySelectorAll(`.category-status-item.${status} .category-status-count`)
  ).reduce((sum, node) => {
    const value = Number.parseInt(String(node.textContent || "").trim(), 10);
    return sum + (Number.isFinite(value) ? value : 0);
  }, 0);
}

function uiUpgradeMeasurementCategories(card) {
  const shadow = card?.shadowRoot;
  if (!shadow) return;

  const language = uiLanguage(card._hass);
  const t = UI_TEXT[language];

  shadow.querySelectorAll("details.category").forEach((category) => {
    const summary = category.querySelector(":scope > summary");
    if (!summary) return;

    const warningCount = uiCategoryStatusCount(summary, "warning");
    const criticalCount = uiCategoryStatusCount(summary, "critical");
    const unknownCount = uiCategoryStatusCount(summary, "unknown");
    const attentionCount = warningCount + criticalCount;

    category.classList.add("measurement-category-v0156");
    category.classList.remove(
      "is-clear-v0156",
      "is-warning-v0156",
      "is-critical-v0156",
      "is-unknown-v0156"
    );
    if (criticalCount > 0) category.classList.add("is-critical-v0156");
    else if (warningCount > 0) category.classList.add("is-warning-v0156");
    else if (unknownCount > 0) category.classList.add("is-unknown-v0156");
    else category.classList.add("is-clear-v0156");

    summary.classList.add("measurement-category-summary-v0156");

    const title = summary.querySelector(".category-title");
    if (title) {
      title.classList.add("category-title-v0156");
      let copy = title.querySelector(":scope > .category-title-copy-v0156");
      if (!copy) {
        const icon = title.querySelector(":scope > .category-icon");
        const label = Array.from(title.children).find(
          (child) => child !== icon && child.tagName === "SPAN"
        );
        copy = document.createElement("span");
        copy.className = "category-title-copy-v0156";
        if (label) {
          label.classList.add("category-label-v0156");
          copy.appendChild(label);
        }
        title.appendChild(copy);
      }

      let subtitle = copy.querySelector(":scope > .category-subtitle-v0156");
      if (!subtitle) {
        subtitle = document.createElement("small");
        subtitle.className = "category-subtitle-v0156";
        copy.appendChild(subtitle);
      }

      if (attentionCount > 0) {
        subtitle.textContent = uiPlural(
          attentionCount,
          t.attentionOne,
          t.attentionMany
        );
      } else if (unknownCount > 0) {
        subtitle.textContent = uiPlural(
          unknownCount,
          t.withoutRatingOne,
          t.withoutRatingMany
        );
      } else {
        subtitle.textContent = t.allClear;
      }
    }

    const statusSummary = summary.querySelector(".category-status");
    statusSummary?.classList.add("category-status-v0156");

    const total = summary.querySelector(".category-count");
    total?.classList.add("category-total-v0156");

    const chevron = summary.querySelector(".chevron");
    chevron?.classList.add("category-chevron-v0156");

    category.querySelectorAll(".measurement").forEach((row) => {
      row.classList.add("measurement-row-v0156");
    });
  });
}

function uiInjectStyles(card) {
  const shadow = card?.shadowRoot;
  if (!shadow || shadow.querySelector("style[data-reef-icp-ui-v0156]")) return;
  const style = document.createElement("style");
  style.dataset.reefIcpUiV0156 = "true";
  style.textContent = `
    /* 0.15.4 hero header, retained in 0.15.6 */
    .header {
      position: relative !important;
      overflow: hidden !important;
      padding: 18px 16px 14px !important;
      border-bottom: 1px solid color-mix(in srgb, var(--divider-color) 70%, transparent) !important;
      background:
        radial-gradient(circle at 12% -18%, color-mix(in srgb, var(--primary-color) 20%, transparent) 0%, transparent 42%),
        radial-gradient(circle at 90% 115%, color-mix(in srgb, #22c6a5 10%, transparent) 0%, transparent 40%),
        linear-gradient(135deg, color-mix(in srgb, var(--card-background-color) 92%, var(--primary-color) 8%), var(--card-background-color)) !important;
    }
    .header::after {
      content: "";
      position: absolute;
      inset: 0;
      pointer-events: none;
      background: linear-gradient(105deg, color-mix(in srgb, var(--primary-color) 6%, transparent), transparent 48%);
      opacity: 0.8;
    }
    .header > * { position: relative; z-index: 1; }
    .title-row { align-items: center !important; gap: 11px !important; }
    .brand-icon {
      width: 42px !important;
      height: 42px !important;
      flex: 0 0 42px !important;
      border-radius: 14px !important;
      display: grid !important;
      place-items: center !important;
      color: var(--primary-color) !important;
      background: color-mix(in srgb, var(--primary-color) 13%, var(--card-background-color)) !important;
      box-shadow:
        inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 18%, transparent),
        0 0 24px color-mix(in srgb, var(--primary-color) 13%, transparent) !important;
    }
    .brand-icon ha-icon { --mdc-icon-size: 23px !important; }
    .title-wrap { min-width: 0; flex: 1 1 auto; }
    .title {
      font-size: 1.32rem !important;
      line-height: 1.15 !important;
      font-weight: 820 !important;
      letter-spacing: -0.025em !important;
    }
    .meta {
      margin-top: 4px !important;
      font-size: 0.77rem !important;
      line-height: 1.25 !important;
      color: color-mix(in srgb, var(--secondary-text-color) 88%, var(--primary-color) 12%) !important;
    }
    .overall {
      flex: 0 0 auto !important;
      min-width: 0 !important;
      padding: 5px 9px !important;
      border-radius: 999px !important;
      font-size: 0.72rem !important;
      line-height: 1.1 !important;
      font-weight: 750 !important;
      white-space: nowrap !important;
      box-shadow: inset 0 0 0 1px color-mix(in srgb, currentColor 16%, transparent) !important;
    }
    .aquarium-profile {
      margin-top: 12px !important;
      gap: 6px !important;
      align-items: center !important;
    }
    .aquarium-profile .profile-chip {
      min-height: 28px !important;
      box-sizing: border-box !important;
      padding: 5px 9px !important;
      border: 0 !important;
      border-radius: 999px !important;
      font-size: 0.73rem !important;
      line-height: 1.15 !important;
      font-weight: 620 !important;
      color: var(--primary-text-color) !important;
      background: color-mix(in srgb, var(--primary-text-color) 5%, transparent) !important;
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 70%, transparent) !important;
    }
    .aquarium-profile .profile-chip ha-icon {
      --mdc-icon-size: 15px !important;
      color: color-mix(in srgb, var(--primary-color) 82%, var(--primary-text-color)) !important;
    }
    .aquarium-profile .profile-chip strong { font-weight: 720 !important; }
    .aquarium-profile .reef-method-chip {
      color: color-mix(in srgb, var(--primary-text-color) 93%, var(--primary-color) 7%) !important;
      background: color-mix(in srgb, var(--primary-color) 9%, transparent) !important;
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 19%, transparent) !important;
    }
    .aquarium-profile .custom-target-chip { display: none !important; }

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
    .reef-method-support-row-v0153 {
      display: grid;
      grid-template-columns: 18px minmax(0, 1fr) auto;
      gap: 8px;
      align-items: center;
      min-height: 40px;
      padding: 3px 0;
    }
    .reef-method-support-row-v0153 > ha-icon { --mdc-icon-size: 16px; color: var(--secondary-text-color); }
    .reef-method-support-copy-v0153 { min-width: 0; display: grid; gap: 2px; }
    .reef-method-support-copy-v0153 > strong { font-size: 0.86rem; font-weight: 720; }
    .reef-method-support-copy-v0153 > small { color: var(--secondary-text-color); font-size: 0.73rem; line-height: 1.25; }
    .reef-method-support-value-v0153 { text-align: right; font-size: 0.92rem; font-weight: 780; white-space: nowrap; }
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

    /* 0.15.5 overview and source hierarchy */
    .action-plan-panel-v0155 {
      margin: 12px 8px 14px !important;
      border: 0 !important;
      border-radius: 18px !important;
      overflow: hidden !important;
      background: color-mix(in srgb, var(--card-background-color) 93%, var(--primary-color) 7%) !important;
      box-shadow:
        inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 20%, transparent),
        0 8px 24px color-mix(in srgb, #000 10%, transparent) !important;
    }
    .action-plan-summary-v0155 {
      display: grid !important;
      grid-template-columns: auto minmax(0, 1fr) auto auto !important;
      align-items: center !important;
      gap: 10px !important;
      min-height: 66px !important;
      padding: 11px 13px !important;
      background: linear-gradient(105deg, color-mix(in srgb, var(--primary-color) 11%, transparent), transparent 65%) !important;
    }
    .action-plan-summary-icon-v0155 {
      width: 38px;
      height: 38px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 14%, transparent);
    }
    .action-plan-summary-icon-v0155 ha-icon { --mdc-icon-size: 21px; }
    .action-plan-summary-copy-v0155 { min-width: 0; display: grid; gap: 2px; }
    .action-plan-summary-copy-v0155 > small {
      color: var(--primary-color);
      font-size: 0.63rem;
      font-weight: 800;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .action-plan-summary-copy-v0155 > strong {
      font-size: 1rem;
      line-height: 1.2;
      font-weight: 800;
    }
    .action-plan-summary-copy-v0155 > span {
      color: var(--secondary-text-color);
      font-size: 0.72rem;
      line-height: 1.25;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .action-plan-summary-pills-v0155 { display: flex; align-items: center; gap: 5px; }
    .action-plan-pill-v0155 {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      min-width: 28px;
      justify-content: center;
      padding: 4px 6px;
      border-radius: 999px;
      font-size: 0.7rem;
      font-weight: 800;
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
    .action-plan-pill-v0155 ha-icon { --mdc-icon-size: 13px; }
    .action-plan-pill-v0155.is-action { color: var(--primary-color); }
    .action-plan-pill-v0155.is-observe { color: var(--warning-color, var(--primary-color)); }

    /* 0.15.6 measurement category hierarchy */
    .reef-ui-section-label-v0155.is-measurements {
      margin-top: 14px;
      margin-bottom: 0;
    }
    .categories {
      padding: 4px 14px 7px !important;
    }
    details.measurement-category-v0156 {
      overflow: visible !important;
      border-radius: 0 !important;
      border-bottom: 1px solid color-mix(in srgb, var(--divider-color) 64%, transparent);
      background: transparent !important;
    }
    details.measurement-category-v0156:last-child {
      border-bottom: 0;
    }
    details.measurement-category-v0156 + details.measurement-category-v0156 {
      margin-top: 0 !important;
    }
    details.measurement-category-v0156 > .measurement-category-summary-v0156 {
      display: grid !important;
      grid-template-columns: minmax(0, 1fr) auto auto auto !important;
      align-items: center !important;
      gap: 8px !important;
      min-height: 52px !important;
      padding: 6px 4px !important;
      border-radius: 10px !important;
      background: transparent !important;
      transition: background 120ms ease;
    }
    details.measurement-category-v0156 > .measurement-category-summary-v0156:hover {
      background: color-mix(in srgb, var(--primary-text-color) 4%, transparent) !important;
    }
    details.measurement-category-v0156[open] > .measurement-category-summary-v0156 {
      background: color-mix(in srgb, var(--primary-color) 5%, transparent) !important;
    }
    .category-title-v0156 {
      min-width: 0;
      gap: 9px !important;
    }
    .category-title-v0156 .category-icon {
      width: 30px !important;
      height: 30px !important;
      border-radius: 9px !important;
      background: color-mix(in srgb, var(--primary-color) 9%, transparent) !important;
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--primary-color) 10%, transparent) !important;
      opacity: 0.9;
    }
    .category-title-v0156 .category-icon ha-icon {
      --mdc-icon-size: 18px !important;
    }
    .category-title-copy-v0156 {
      display: grid;
      min-width: 0;
      gap: 2px;
    }
    .category-label-v0156 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.91rem;
      line-height: 1.15;
      font-weight: 760;
    }
    .category-subtitle-v0156 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-size: 0.64rem;
      line-height: 1.15;
      font-weight: 650;
    }
    .is-critical-v0156 .category-subtitle-v0156 {
      color: var(--error-color, #db4437);
    }
    .is-warning-v0156 .category-subtitle-v0156 {
      color: var(--warning-color, #f9a825);
    }
    .is-clear-v0156 .category-subtitle-v0156 {
      color: color-mix(in srgb, var(--success-color, #43a047) 78%, var(--secondary-text-color));
    }
    .category-status-v0156 {
      gap: 5px !important;
    }
    .category-status-v0156 .category-status-item {
      gap: 2px !important;
      font-size: 0.61rem !important;
      font-weight: 720 !important;
    }
    .category-status-v0156 .category-status-item.ok {
      opacity: 0.62;
    }
    .category-status-v0156 .category-status-item.warning,
    .category-status-v0156 .category-status-item.critical {
      font-weight: 820 !important;
    }
    .category-status-v0156 .status-dot {
      width: 6px !important;
      height: 6px !important;
    }
    .category-total-v0156 {
      min-width: 20px !important;
      padding: 0 2px !important;
      border-radius: 0 !important;
      color: var(--secondary-text-color) !important;
      background: transparent !important;
      box-shadow: none !important;
      font-size: 0.67rem !important;
      font-weight: 650 !important;
      opacity: 0.78;
    }
    .category-chevron-v0156 {
      --mdc-icon-size: 20px !important;
      opacity: 0.65;
    }
    .measurement-category-v0156 .rows {
      padding: 0 4px 4px !important;
    }
    .measurement-category-v0156 .measurement-row-v0156 {
      min-height: 48px !important;
      padding: 5px 3px !important;
      border-radius: 0 !important;
      border-top: 1px solid color-mix(in srgb, var(--divider-color) 58%, transparent) !important;
      background: transparent !important;
      box-shadow: none !important;
    }
    .measurement-category-v0156 .measurement-row-v0156 + .measurement-row-v0156 {
      margin-top: 0 !important;
    }
    .measurement-category-v0156 .measurement-name {
      font-size: 0.86rem !important;
      line-height: 1.2 !important;
      font-weight: 690 !important;
    }
    .measurement-category-v0156 .measurement-sub {
      margin-top: 2px !important;
      gap: 3px 6px !important;
    }
    .measurement-category-v0156 .measurement-value {
      font-size: 0.9rem !important;
      font-weight: 760 !important;
    }

    .action-plan-panel-v0155[open] > .action-plan-summary-v0155 {
      border-bottom: 1px solid color-mix(in srgb, var(--divider-color) 70%, transparent);
    }
    .action-plan-panel-v0155 .action-plan-content { padding-top: 12px !important; }
    .action-plan-panel-v0155 .action-plan-list { gap: 0 !important; }
    .action-plan-panel-v0155 .action-plan-item {
      padding: 10px 1px !important;
      border-radius: 0 !important;
      background: transparent !important;
      border-bottom: 1px solid color-mix(in srgb, var(--divider-color) 72%, transparent);
    }
    .action-plan-panel-v0155 .action-plan-item:last-child { border-bottom: 0; }

    .reef-ui-section-label-v0155 {
      display: grid;
      grid-template-columns: 1fr auto 1fr;
      align-items: center;
      gap: 9px;
      margin: 17px 12px 3px;
      color: var(--secondary-text-color);
    }
    .reef-ui-section-label-v0155 > span {
      height: 1px;
      background: color-mix(in srgb, var(--divider-color) 78%, transparent);
    }
    .reef-ui-section-label-v0155 > strong {
      font-size: 0.63rem;
      font-weight: 800;
      letter-spacing: 0.09em;
      text-transform: uppercase;
      opacity: 0.86;
    }

    .source-panel-v0155,
    .supplement-panel-v0155 {
      --source-accent: var(--primary-color);
      border: 0 !important;
      box-shadow:
        inset 3px 0 0 color-mix(in srgb, var(--source-accent) 55%, transparent),
        inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 64%, transparent) !important;
      background: color-mix(in srgb, var(--card-background-color) 96%, var(--source-accent) 4%) !important;
    }
    .source-laboratory-v0155 { --source-accent: var(--info-color, #4b9fe1); }
    .source-supply-v0155 { --source-accent: var(--success-color, #5aa96a); }
    .source-method-v0155 { --source-accent: var(--primary-color); }
    .source-context-v0155 { --source-accent: color-mix(in srgb, var(--primary-color) 55%, var(--secondary-text-color)); }
    .source-history-v0155 { --source-accent: color-mix(in srgb, var(--info-color, #4b9fe1) 58%, var(--secondary-text-color)); }
    .source-interpretation-v0155 { --source-accent: color-mix(in srgb, var(--secondary-text-color) 60%, var(--primary-color)); }

    .source-summary-v0155 {
      display: grid !important;
      grid-template-columns: auto minmax(0, 1fr) auto auto !important;
      align-items: center !important;
      gap: 9px !important;
      min-height: 54px !important;
      padding: 9px 12px !important;
      background: linear-gradient(100deg, color-mix(in srgb, var(--source-accent) 7%, transparent), transparent 58%) !important;
    }
    .source-summary-v0155 .info-icon {
      color: var(--source-accent) !important;
      background: color-mix(in srgb, var(--source-accent) 12%, transparent) !important;
    }
    .source-summary-copy-v0155 { min-width: 0; display: grid; gap: 2px; }
    .source-summary-copy-v0155 > strong {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.9rem !important;
      line-height: 1.2;
    }
    .source-summary-copy-v0155 > small {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: var(--secondary-text-color);
      font-size: 0.69rem;
      line-height: 1.2;
    }
    .source-badge-v0155 {
      display: inline-flex;
      align-items: center;
      padding: 4px 7px;
      border-radius: 999px;
      color: var(--source-accent);
      background: color-mix(in srgb, var(--source-accent) 10%, transparent);
      font-size: 0.62rem;
      line-height: 1;
      font-weight: 800;
      letter-spacing: 0.02em;
      white-space: nowrap;
    }
    .supplement-panel-v0155 {
      box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--divider-color) 58%, transparent) !important;
      background: color-mix(in srgb, var(--card-background-color) 98%, var(--source-accent) 2%) !important;
    }
    .supplement-panel-v0155 .source-summary-v0155 {
      min-height: 49px !important;
      padding-block: 8px !important;
      background: transparent !important;
    }
    .supplement-panel-v0155 .info-icon {
      width: 32px !important;
      height: 32px !important;
    }
    .supplement-panel-v0155 .info-icon ha-icon { --mdc-icon-size: 18px !important; }

    @media (max-width: 560px) {
      .reef-ui-section-label-v0155.is-measurements { margin-top: 12px; }
      .categories { padding-inline: 11px !important; }
      details.measurement-category-v0156 > .measurement-category-summary-v0156 {
        grid-template-columns: minmax(0, 1fr) auto auto !important;
        gap: 6px !important;
        min-height: 49px !important;
        padding: 5px 2px !important;
      }
      .category-title-v0156 { gap: 8px !important; }
      .category-title-v0156 .category-icon {
        width: 28px !important;
        height: 28px !important;
      }
      .category-label-v0156 { font-size: 0.87rem; }
      .category-subtitle-v0156 { font-size: 0.6rem; }
      .category-status-v0156 { gap: 4px !important; }
      .category-status-v0156 .category-status-item { font-size: 0.58rem !important; }
      .category-total-v0156 { display: none !important; }
      .measurement-category-v0156 .measurement-row-v0156 {
        min-height: 46px !important;
        padding-block: 4px !important;
      }
      .measurement-category-v0156 .measurement-name { font-size: 0.83rem !important; }
      .measurement-category-v0156 .measurement-value { font-size: 0.86rem !important; }
      .action-plan-summary-v0155 { grid-template-columns: auto minmax(0, 1fr) auto !important; gap: 8px !important; }
      .action-plan-summary-pills-v0155 { display: none; }
      .action-plan-summary-icon-v0155 { width: 35px; height: 35px; border-radius: 11px; }
      .source-summary-v0155 { grid-template-columns: auto minmax(0, 1fr) auto !important; gap: 8px !important; }
      .source-badge-v0155 { display: none; }
      .source-summary-copy-v0155 > strong { font-size: 0.87rem !important; }
      .reef-ui-section-label-v0155 { margin-top: 15px; }
      .header { padding: 15px 13px 12px !important; }
      .brand-icon { width: 38px !important; height: 38px !important; flex-basis: 38px !important; border-radius: 12px !important; }
      .title { font-size: 1.18rem !important; }
      .meta { font-size: 0.72rem !important; }
      .overall { padding: 4px 7px !important; font-size: 0.68rem !important; }
      .aquarium-profile { margin-top: 10px !important; gap: 5px !important; }
      .aquarium-profile .profile-chip { min-height: 26px !important; padding: 4px 8px !important; font-size: 0.69rem !important; }
      .reef-method-badge-v0153 { display: none; }
      .reef-method-kpis-v0153 { grid-template-columns: 1fr; }
      .reef-method-kpi-v0153 { display: grid; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: 10px; }
      .reef-method-kpi-v0153 > strong { margin-top: 0; text-align: right; }
      .reef-method-detail-item-v0153 { grid-template-columns: 1fr; gap: 5px; }
      .reef-method-ramp-v0153 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .reef-method-ramp-v0153 > div { border-bottom: 1px solid var(--divider-color); }
      .reef-method-row-v0153 { grid-template-columns: 17px minmax(70px, 1fr) minmax(90px, auto); }
      .reef-method-support-row-v0153 { grid-template-columns: 17px minmax(0, 1fr) auto; gap: 7px; }
      .reef-method-support-value-v0153 { font-size: 0.86rem; }
    }
  `;
  shadow.appendChild(style);
}

function uiInject(card) {
  const state = card?._config?.entity ? card?._hass?.states?.[card._config.entity] : null;
  const attrs = state?.attributes || {};
  uiInjectStyles(card);
  uiRenderMethodPanel(card, attrs);
  uiUpgradeActionPlan(card, attrs);
  uiUpgradeRecommendationPanels(card, attrs);
  uiUpgradeMeasurementCategories(card);
  uiOrganizePanels(card);
}

customElements.whenDefined("reef-icp-card").then(() => {
  const Card = customElements.get("reef-icp-card");
  if (!Card || Card.prototype.__reefIcpUiV0156Patched) return;
  const originalRender = Card.prototype._render;
  if (typeof originalRender !== "function") return;

  Card.prototype._render = function (...args) {
    const result = originalRender.apply(this, args);
    try {
      uiInject(this);
    } catch (error) {
      console.warn("Reef ICP 0.15.6 UI layer failed", error);
    }
    return result;
  };
  Card.prototype.__reefIcpUiV0156Patched = true;

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
