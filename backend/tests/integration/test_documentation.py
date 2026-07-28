import pytest
from flask.testing import FlaskClient


@pytest.mark.integration
def test_openapi_and_swagger_are_enabled_in_development(client: FlaskClient) -> None:
    assert client.get("/openapi.json").status_code == 200
    assert client.get("/docs").status_code == 200
