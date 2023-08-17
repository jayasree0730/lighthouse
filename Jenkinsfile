pipeline {
  
  agent { docker { image 'node:8.12.0' } }
         environment {
        HOME = '//Users//jsabinkari//Documents//Lighthouse_Task'
    }
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
    
            
        }
  }

