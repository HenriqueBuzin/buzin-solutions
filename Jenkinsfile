pipeline {
    agent any

    environment {
        // Substitua pelos seus valores reais
        REMOTE_USER = credentials('REMOTE_USER')
        REMOTE_HOST = credentials('REMOTE_HOST')
        REMOTE_PASSWORD = credentials('REMOTE_PASSWORD')
        PROJECT_DIR = credentials('PROJECT_DIR')
    }

    stages {
        // Atualizar o repositório Git na máquina remota
        stage('Update Git Repository') {
            steps {
                script {
                    // Executa comando SSH para atualizar o repositório Git
                    sh "sshpass -p ${REMOTE_PASSWORD} ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} 'cd ${PROJECT_DIR} && git pull'"
                }
            }
        }

        // Parar o serviço web com Docker Compose
        stage('Stop Web Service') {
            steps {
                script {
                    // Executa comando SSH para parar o serviço web usando docker-compose
                    sh "sshpass -p ${REMOTE_PASSWORD} ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} 'cd ${PROJECT_DIR} && docker compose down web'"
                }
            }
        }

        // Construir e levantar os serviços com Docker Compose
        stage('Docker Compose Build and Up') {
            steps {
                script {
                    // Executa comando SSH para usar docker-compose para construir e iniciar os serviços
                    sh "sshpass -p ${REMOTE_PASSWORD} ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} 'cd ${PROJECT_DIR} && docker compose up -d --build'"
                }
            }
        }
    }
}
