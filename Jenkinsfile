pipeline {
    agent any

    stages {
        stage('Preparation') {
            steps {
                echo 'Очистка кеша Maven'
                sh 'mvn dependency:purge-local-repository'
            }
        }
        stage('Build') {
            steps {
                echo 'Сборка проекта'
                sh 'mvn clean package'
            }
        }
        stage('Test') {
            steps {
                echo 'Запуск тестов и генерация отчетов Allure'
                sh 'mvn test allure:report'
            }
        }
        stage('Clean') {
            steps {
                echo 'Очистка рабочего пространства'
                cleanWs()
            }
        }
    }

    post {
        always {
            echo 'Сбор результатов для Allure'
            allure([
                includeProperties: false,
                jdk: '', // Укажите JDK, если это необходимо
                results: [[path: 'target/allure-results']]
            ])
            archiveArtifacts artifacts: 'target/*.jar', fingerprint: true
            junit '**/target/surefire-reports/*.xml'
        }
        success {
            echo 'Сборка и тесты успешно завершены.'
        }
        failure {
            echo 'Ошибка сборки или тестов.'
        }
    }
}