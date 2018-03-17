pipeline {
    agent any

    stages {
        stage('Install Deps') {
            steps {
                bat 'npm install'
            }
        }
        stage('Lint') {
            steps {
                bat 'npm run lint'
            }
        }
        stage('Test') {
            steps {
                bat 'npm run test'
            }
        }
    }

    post {
        always {
            deleteDir()   /* clean up our workspace */
        }
    }
}
