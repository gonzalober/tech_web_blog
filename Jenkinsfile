pipeline{

  agent any

  options {
    timestamps()
  }

  stages {
    stage ("Build"){
      steps {
        echo "First step of my CI"
      }
    }
    stage ("Unit tests"){
      steps {
            sh """
              npm install
              npm test
              
            """
      }
    }
    stage ("E2E tests"){
      steps {
            sh """
              npm run cy:run
            """
      }

    }

  }
}