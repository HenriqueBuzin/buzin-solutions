pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build and Run') {
            steps {
                sh 'docker-compose up --build -d'
            }
        }
    }
}
