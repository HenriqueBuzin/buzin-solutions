from collections.abc import Iterator

import pytest
from flask import Flask
from flask.testing import FlaskClient

from app import create_app


@pytest.fixture
def app(monkeypatch: pytest.MonkeyPatch) -> Iterator[Flask]:
    monkeypatch.setenv("SWAGGER_ENABLED", "true")
    application = create_app({"TESTING": True})
    yield application


@pytest.fixture
def client(app: Flask) -> FlaskClient:
    return app.test_client()
