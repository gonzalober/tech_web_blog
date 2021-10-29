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
    stage ("install npm and dependencies"){
      steps {
            sh """
              npm install
            """
      }
    }

    stage ("Unit tests"){
      steps {
            sh """
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