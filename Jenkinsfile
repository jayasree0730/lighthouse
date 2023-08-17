pipeline {
  node {
    
    env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
    // on windows
    env.PATH="${env.NODEJS_HOME};${env.PATH}"
    sh 'npm --version'
}
  agent any
    
  tools {nodejs 'node'}
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/jayasree0730/lighthouse.git'
      }
    }
     
    stage('Build') {
      steps {
        sh 'npm install'
         sh 'npm install puppeteer'
       sh 'node ./demo.js'
      }
    }  
    stage('Test') {
      steps {
        sh 'node test'
      }
            
        }
  }
}

