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
         sh 'node ./demo.js'
      }
    }  
    
            
        }
  }

