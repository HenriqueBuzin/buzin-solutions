from flask.views import MethodView
from flask_smorest import Blueprint  # type: ignore[import-untyped]
from marshmallow import Schema, fields

blueprint = Blueprint(
    "system",
    __name__,
    url_prefix="/api/v1",
    description="Estado e metadados do servico.",
)


class HealthSchema(Schema):
    status = fields.String(required=True)
    service = fields.String(required=True)
    version = fields.String(required=True)


@blueprint.route("/health")
class HealthResource(MethodView):
    @blueprint.response(200, HealthSchema)  # type: ignore[untyped-decorator]
    def get(self) -> dict[str, str]:
        """Retorna o estado atual da API."""
        return {
            "status": "ok",
            "service": "buzin-solutions-backend",
            "version": "1.0.0",
        }
