"""Repository contract checks for the Reef ICP 0.15 profile/UI wiring."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INTEGRATION = ROOT / "custom_components" / "reef_icp"


def test_config_flow_exposes_independent_reef_method() -> None:
    source = (INTEGRATION / "config_flow.py").read_text(encoding="utf-8")
    assert "CONF_REEF_METHOD" in source
    assert "_reef_method_selector" in source
    assert "CONF_REEF_METHOD: reef_method" in source


def test_translations_label_reef_method() -> None:
    for path in (
        INTEGRATION / "strings.json",
        INTEGRATION / "translations" / "en.json",
        INTEGRATION / "translations" / "de.json",
    ):
        data = json.loads(path.read_text(encoding="utf-8"))
        assert "reef_method" in data["config"]["step"]["user"]["data"]
        assert "reef_method" in data["options"]["step"]["aquarium_settings"]["data"]


def test_card_extensions_are_registered() -> None:
    init_source = (INTEGRATION / "__init__.py").read_text(encoding="utf-8")
    extension_path = INTEGRATION / "www" / "reef-icp-card-v015.js"
    ui_path = INTEGRATION / "www" / "reef-icp-card-ui.js"
    polish_path = INTEGRATION / "www" / "reef-icp-card-polish.js"
    assert extension_path.exists()
    assert ui_path.exists()
    assert polish_path.exists()
    assert "CARD_EXTENSION_URL" in init_source
    assert "reef-icp-card-v015.js" in init_source
    assert "CARD_UI_URL" in init_source
    assert "reef-icp-card-ui.js" in init_source
    assert "CARD_POLISH_URL" in init_source
    assert "reef-icp-card-polish.js" in init_source
    assert 'CARD_VERSION = "0.15.16"' in init_source


def test_card_extension_localizes_reef_method_guidance() -> None:
    source = (INTEGRATION / "www" / "reef-icp-card-v015.js").read_text(
        encoding="utf-8"
    )
    assert 'REEF_ICP_V015_EXTENSION = "0.15.2"' in source
    assert 'mediaChange: "Medienwechsel"' in source
    assert 'zeovitCleaningNote:' in source
    assert 'zeovitCaution:' in source
    assert 'stageWeeks12:' in source
    assert 'function extUnit' in source
    assert 'function extGuidanceNote' in source
    assert "function extPracticalDigits" in source
    assert "function extRoundUnitNumbers" in source
    assert "function extRoundCalculatedDisplays" in source


def test_ui_layer_contains_0156_measurement_hierarchy() -> None:
    source = (INTEGRATION / "www" / "reef-icp-card-ui.js").read_text(
        encoding="utf-8"
    )
    assert 'REEF_ICP_UI_VERSION = "0.15.6"' in source
    assert "function uiNeoZeoTimeline" in source
    assert "function uiSupportRow" in source
    assert 'noDosing: "keine Dosierung"' in source
    assert ".reef-method-support-row-v0153" in source
    assert "0.15.4 hero header, retained in 0.15.6" in source
    assert ".aquarium-profile .reef-method-chip" in source
    assert "function uiUpgradeActionPlan" in source
    assert "function uiUpgradeRecommendationPanels" in source
    assert "function uiOrganizePanels" in source
    assert 'whatToDo: "Was ist zu tun?"' in source
    assert 'recommendationSources: "Empfehlungsquellen"' in source
    assert ".action-plan-panel-v0155" in source
    assert ".source-panel-v0155" in source
    assert ".supplement-panel-v0155" in source
    assert "function uiUpgradeMeasurementCategories" in source
    assert "function uiCategoryStatusCount" in source
    assert 'measurementsSection: "Messwerte"' in source
    assert 'attentionMany: "auffällige Werte"' in source
    assert ".measurement-category-v0156" in source
    assert ".category-subtitle-v0156" in source
    assert ".measurement-row-v0156" in source


def test_polish_layer_contains_0159_measurement_formatting() -> None:
    source = (INTEGRATION / "www" / "reef-icp-card-polish.js").read_text(
        encoding="utf-8"
    )
    assert 'REEF_ICP_POLISH_VERSION = "0.15.9"' in source
    assert '["salinität", 1]' in source
    assert '["salinity", 1]' in source
    assert '["leitfähigkeit", 1]' in source
    assert '["dichte", 4]' in source
    assert '["ph", 2]' in source
    assert 'normalizedUnit === "mg/l"' in source
    assert "Math.abs(value) >= 1000" in source
    assert "useGrouping: true" in source
    assert "maximumFractionDigits: digits" in source
    assert "function polishMeasurementNumbers" in source
    assert 'shadow.querySelectorAll(".measurement")' in source
    assert "function reefIcpCardLanguage" in source


def test_sensor_extension_exposes_guidance_payload() -> None:
    source = (INTEGRATION / "sensor_v015.py").read_text(encoding="utf-8")
    assert '"reef_method"' in source
    assert '"reef_method_name"' in source
    assert 'attrs["reef_method_guidance"]' in source
    assert "build_reef_method_guidance" in source
