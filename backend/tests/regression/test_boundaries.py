import pytest
from flask.testing import FlaskClient

from app import create_app


@pytest.mark.regression
def test_openapi_and_swagger_are_disabled_by_default(
    monkeypatch: pytest.MonkeyPatch,
) -> None:
    monkeypatch.delenv("SWAGGER_ENABLED", raising=False)
    client = create_app().test_client()

    assert client.get("/openapi.json").status_code == 404
    assert client.get("/docs").status_code == 404


@pytest.mark.regression
def test_unknown_route_remains_not_found(client: FlaskClient) -> None:
    assert client.get("/api/v1/unknown").status_code == 404
