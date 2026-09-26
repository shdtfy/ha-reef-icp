"""UI polish contract checks for Reef ICP 0.15.7."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INTEGRATION = ROOT / "custom_components" / "reef_icp"

def test_polish_layer_is_registered() -> None:
    init_source = (INTEGRATION / "__init__.py").read_text(encoding="utf-8")
    polish_path = INTEGRATION / "www" / "reef-icp-card-polish.js"
    assert polish_path.exists()
    assert 'CARD_VERSION = "0.15.7"' in init_source
    assert "CARD_POLISH_URL" in init_source
    assert "reef-icp-card-polish.js" in init_source

def test_polish_layer_contains_0157_changes() -> None:
    source = (INTEGRATION / "www" / "reef-icp-card-polish.js").read_text(
        encoding="utf-8"
    )
    assert 'REEF_ICP_POLISH_VERSION = "0.15.7"' in source
    assert "function polishIntegerText" in source
    assert "function polishMeasurementNumbers" in source
    assert ".history-indicator" in source
    assert ".action-plan-summary-v0155" in source
    assert "__reefIcpPolishV0157Patched" in source
