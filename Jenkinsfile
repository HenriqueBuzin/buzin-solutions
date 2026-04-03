pipeline {
    agent any

    stages {

        stage('Deploy') {
            steps {
                script {

                    def branch = env.BRANCH_NAME

                    if (branch == 'main') {
                        sh '''
                        cd /root/buzin-solutions
                        git reset --hard
                        git pull origin main
                        docker compose --profile prod up -d --build
                        '''
                    }

                    else if (branch == 'dev') {
                        sh '''
                        cd /root/buzin-solutions-dev
                        git reset --hard
                        git pull origin dev
                        docker compose --profile dev up -d --build
                        '''
                    }

                    else {
                        echo "Branch não suportada: ${branch}"
                    }
                }
            }
        }

    }
}
