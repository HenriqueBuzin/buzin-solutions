pipeline {
    agent any

    triggers {
        pollSCM('H/5 * * * *') // Polling do SCM a cada 5 minutos
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm // Faz checkout do código fonte
            }
        }
        stage('Build and Deploy') {
            steps {
                script {
                    sh 'docker compose up --build -d' // Executa Docker Compose
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline concluído.'
        }
    }
}
