FROM python:3.14.6-slim-bookworm AS poetry

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    POETRY_VERSION=2.4.1 \
    POETRY_VIRTUALENVS_CREATE=false

WORKDIR /app

RUN pip install --no-cache-dir "poetry==${POETRY_VERSION}"

COPY pyproject.toml poetry.lock ./


FROM poetry AS dependencies-prod

RUN poetry install --only main --no-root --no-interaction


FROM poetry AS dependencies-dev

RUN poetry install --with dev --no-root --no-interaction


FROM dependencies-dev AS verify

COPY . ./
RUN python scripts/verify.py


FROM dependencies-dev AS dev

COPY . ./

EXPOSE 8000
CMD ["flask", "--app", "app:create_app()", "run", "--host", "0.0.0.0", "--port", "8000", "--debug"]


FROM dependencies-prod AS prod

RUN useradd --create-home --uid 10001 app

COPY --chown=app:app app ./app

USER app

EXPOSE 8000
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "2", "--threads", "4", "--access-logfile", "-", "app:create_app()"]
