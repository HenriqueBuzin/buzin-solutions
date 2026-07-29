pipeline {
    agent any

    options {
        disableConcurrentBuilds()
        timeout(time: 45, unit: 'MINUTES')
    }

    stages {
        stage('Install') {
            steps {
                echo 'Dependencias Node/npm e Python/Poetry sao instaladas nos builds multi-stage.'
            }
        }

        stage('Verify') {
            steps {
                sh '''
                    docker build --file frontend/Dockerfile --target build --tag buzin-solutions/frontend:verify frontend
                    docker build --file backend/Dockerfile --target verify --tag buzin-solutions/backend:verify backend
                '''
            }
        }

        stage('Compose') {
            when {
                anyOf {
                    branch 'main'
                    branch 'dev'
                }
            }
            steps {
                sh '''
                    set -eu
                    branch="${BRANCH_NAME#origin/}"
                    suffix=""
                    [ "$branch" = "dev" ] && suffix="-dev"
                    env_file="/root/projects/envs/buzin-solutions${suffix}.env"
                    test -f "$env_file"
                    ln -sfn "$env_file" .env
                    export COMPOSE_PROJECT_NAME="buzin-solutions${suffix}"
                    export IMAGE_TAG="$(git rev-parse --short=12 HEAD)"
                    if [ "$branch" = "main" ]; then
                      docker compose -f docker-compose-prod.yml config --quiet
                    else
                      docker compose -f docker-compose.yml config --quiet
                    fi
                '''
            }
        }

        stage('Container') {
            when {
                anyOf {
                    branch 'main'
                    branch 'dev'
                }
            }
            steps {
                script {
                    def branch = (env.BRANCH_NAME ?: env.GIT_BRANCH ?: '').replaceFirst(/^origin\//, '')
                    def suffix = branch == 'dev' ? '-dev' : ''
                    def target = branch == 'dev' ? 'dev' : 'prod'
                    sh """
                        set -eu
                        image_tag=\$(git rev-parse --short=12 HEAD)
                        docker build --file frontend/Dockerfile --target ${target} --tag buzin-solutions/frontend:\${image_tag}${suffix} frontend
                        docker build --file backend/Dockerfile --target ${target} --tag buzin-solutions/backend:\${image_tag}${suffix} backend
                        docker build --file frontend/Dockerfile.e2e --tag buzin-solutions/e2e:\${image_tag}${suffix} frontend
                    """
                }
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'dev'
                }
            }
            steps {
                script {
                    def branch = (env.BRANCH_NAME ?: env.GIT_BRANCH ?: '').replaceFirst(/^origin\//, '')
                    def project = 'buzin-solutions'
                    def suffix = branch == 'dev' ? '-dev' : ''
                    def composeFile = branch == 'dev' ? 'docker-compose.yml' : 'docker-compose-prod.yml'
                    def e2ePort = branch == 'dev' ? '3004' : '3000'

                    sh """
                        set -eu
                        workspace=\$(pwd)
                        target="/root/projects/${project}${suffix}"
                        env_file="/root/projects/envs/${project}${suffix}.env"
                        image_tag=\$(git rev-parse --short=12 HEAD)

                        test -f "\${env_file}"
                        docker image inspect "${project}/frontend:\${image_tag}${suffix}" >/dev/null
                        docker image inspect "${project}/backend:\${image_tag}${suffix}" >/dev/null
                        docker image inspect "${project}/e2e:\${image_tag}${suffix}" >/dev/null

                        mkdir -p "\${target}"
                        find "\${target}" -mindepth 1 -maxdepth 1 \
                          ! -name '.git' \
                          ! -name '.env' \
                          -exec rm -rf {} +
                        tar -C "\${workspace}" \
                          --exclude='./.git' \
                          --exclude='./.env' \
                          --exclude='./frontend/node_modules' \
                          --exclude='./frontend/dist' \
                          --exclude='./backend/.mypy_cache' \
                          --exclude='./backend/.pytest_cache' \
                          --exclude='./backend/.ruff_cache' \
                          --exclude='./backend/__pycache__' \
                          -cf - . | tar -C "\${target}" -xf -

                        cd "\${target}"
                        ln -sfn "\${env_file}" .env
                        export COMPOSE_PROJECT_NAME="${project}${suffix}"
                        export IMAGE_TAG="\${image_tag}"

                        docker compose -f ${composeFile} down --remove-orphans || true
                        docker compose -f ${composeFile} up -d --no-build --pull never --remove-orphans --wait --wait-timeout 120
                        docker compose -f ${composeFile} ps

                        docker run --rm --network host \
                          -e CI=true \
                          -e E2E_PLATFORM_COMMAND \
                          -e E2E_BASE_URL="http://127.0.0.1:${e2ePort}" \
                          "${project}/e2e:\${image_tag}${suffix}"
                    """
                }
            }
        }
    }
}
