import pytest
from flask.testing import FlaskClient


@pytest.mark.smoke
def test_health_endpoint(client: FlaskClient) -> None:
    response = client.get("/api/v1/health")

    assert response.status_code == 200
    assert response.get_json() == {
        "status": "ok",
        "service": "buzin-solutions-backend",
        "version": "1.0.0",
    }
