pipeline {
  
  agent any
    
  tools {nodejs 'node'}
  stages {
        
    stage('Git') {
      steps {
                nodejs(nodeJSInstallationName: 'Node 6.x', configId: '<config-file-provider-id>') 
                    sh 'npm config ls'
                
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
}

