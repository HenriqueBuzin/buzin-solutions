import os
from typing import Any

from flask import Flask
from flask_smorest import Api  # type: ignore[import-untyped]

from app.routes import blueprint


def env_flag(value: str | None) -> bool:
    return value is not None and value.strip().lower() in {"1", "true", "yes", "on"}


def create_app(test_config: dict[str, Any] | None = None) -> Flask:
    app = Flask(__name__)
    swagger_enabled = env_flag(os.getenv("SWAGGER_ENABLED"))
    app.config.from_mapping(
        API_TITLE="Buzin Solutions API",
        API_VERSION="1.0.0",
        OPENAPI_VERSION="3.0.3",
        OPENAPI_URL_PREFIX="/" if swagger_enabled else None,
        OPENAPI_JSON_PATH="openapi.json",
        OPENAPI_SWAGGER_UI_PATH="/docs",
        OPENAPI_SWAGGER_UI_URL="https://cdn.jsdelivr.net/npm/swagger-ui-dist/",
    )

    if test_config:
        app.config.update(test_config)

    api = Api(app)
    api.register_blueprint(blueprint)
    return app
