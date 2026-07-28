import pytest

from app import env_flag


@pytest.mark.unit
@pytest.mark.parametrize(
    ("value", "expected"),
    [
        (None, False),
        ("", False),
        ("false", False),
        ("1", True),
        (" TRUE ", True),
        ("yes", True),
        ("on", True),
    ],
)
def test_env_flag(value: str | None, expected: bool) -> None:
    assert env_flag(value) is expected
