pipeline {
    agent {
        docker {
            image 'node:20'
            args '-u root'
        }
    }

    parameters {
        string(name: 'BRANCH', defaultValue: 'main', description: 'Git branch')
        choice(name: 'ENV', choices: ['dev', 'staging', 'prod'], description: 'Environment')
        string(name: 'VERSION', defaultValue: '1.0.0', description: 'Build version')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: "${params.BRANCH}",
                url: 'https://github.com/SamaMansour/travel-platform-api.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Render') {
            steps {
                sh '''
                curl -X POST "https://api.render.com/deploy/srv-d6q9bnfgi27c739url70?key=_Y0ttSqG-n4"
                '''
            }
        }

    }

    post {
        success {
            echo "Deployment successful 🚀"
        }
        failure {
            echo "Pipeline failed ❌"
        }
    }
}