pipeline {
  agent any
    
  tools {demojs "node"}
    
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/jayasree0730/lighthouse.git'
      }
    }
     
    stage('Build') {
      steps {
        sh 'npm install'
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
