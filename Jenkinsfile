pipeline {
    agent any

    environment {
        REMOTE_USER = credentials('REMOTE_USER')
        REMOTE_HOST = credentials('REMOTE_HOST')
        REMOTE_PASSWORD = credentials('REMOTE_PASSWORD')
        PROJECT_DIR = credentials('PROJECT_DIR')
    }

    stages {
        stage('Update Git Repository') {
            steps {
                script {
                    sh "sshpass -p ${REMOTE_PASSWORD} ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} 'cd ${PROJECT_DIR} && git pull'"
                }
            }
        }

        stage('Stop Web Service') {
            steps {
                script {
                    sh "sshpass -p ${REMOTE_PASSWORD} ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} 'cd ${PROJECT_DIR} && docker compose down frontend'"
                }
            }
        }

        stage('Docker Compose Build and Up') {
            steps {
                script {
                    sh "sshpass -p ${REMOTE_PASSWORD} ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} 'cd ${PROJECT_DIR} && docker compose -f docker-compose-prod.yml up -d --build'"
                }
            }
        }
    }
}
