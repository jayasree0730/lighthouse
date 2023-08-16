pipeline {
  
  agent any

     
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/jayasree0730/lighthouse.git'
      }
    }
     
    stage('Build') {
      steps {
        sh npm install -g puppeteer --unsafe-perm=true
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
