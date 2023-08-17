pipeline {
  
  agent any
    
  tools {nodejs "node"}
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/jayasree0730/lighthouse.git'
      }
    }
     
    stage('Build') {
      steps {
        bat 'npm install'
         bat 'npm install puppeteer'
         bat 'node ./demo.js'
      }
    }  
    stage('Test') {
      steps {
        bat 'node test'
      }
            
        }
  }
}

