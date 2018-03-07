def APP_NAME = 'range-myra-api'
def BUILD_CONFIG = APP_NAME
def IMAGESTREAM_NAME = APP_NAME
def TAG_NAMES = ['dev', 'test', 'prod']
def CMD_PREFIX = 'PATH=$PATH:$PWD/node-v8.9.4-linux-x64/bin'
def NODE_URI = 'https://nodejs.org/dist/v8.9.4/node-v8.9.4-linux-x64.tar.xz'

node {
  stage('Checkout') {
    echo "Checking out source"
    checkout scm
  }
  
  stage('Install') {
    echo "Setup: ${BUILD_ID}"
    
    // The version of node in the `node` that comes with OpenShift is too old
    // so I use a generic Linux and install my own node from LTS.
    sh "curl ${NODE_URI} | tar -Jx"

    // setup the node dev environment
    sh "${CMD_PREFIX} npm i --only=dev"
    // not sure if this needs to be added to package.json.
    sh "${CMD_PREFIX} npm i escape-string-regexp"
    sh "${CMD_PREFIX} npm -v"
    sh "${CMD_PREFIX} node -v"
  }
  
  stage('Test') {
    echo "Testing: ${BUILD_ID}"
    // Run a security check on our packages
    // sh "${CMD_PREFIX} npm run test:security"
    // Run our unit tests et al.
    sh "${CMD_PREFIX} npm test"
  }

  stage('Build') {
    echo "Build: ${BUILD_ID}"
    // run the oc build to package the artifacts into a docker image
    openshiftBuild bldCfg: APP_NAME, showBuildLogs: 'true', verbose: 'true'

    // Don't tag with BUILD_ID so the pruner can do it's job; it won't delete tagged images.
    // Tag the images for deployment based on the image's hash
    IMAGE_HASH = sh (
      script: """oc get istag ${IMAGESTREAM_NAME}:latest -o template --template=\"{{.image.dockerImageReference}}\"|awk -F \":\" \'{print \$3}\'""",
      returnStdout: true).trim()
    echo ">> IMAGE_HASH: ${IMAGE_HASH}"

    openshiftTag destStream: IMAGESTREAM_NAME, verbose: 'true', destTag: TAG_NAMES[0], srcStream: IMAGESTREAM_NAME, srcTag: "${IMAGE_HASH}"
  
    // Sale Schema Spy down and up will cause it to rebuild the schema documentation. This isn't the most
    // efficiant way to do this but at least its automated.
    script: """
    oc scale --replicas=0 dc schema-spy -n range-myra-dev && \
    oc scale --replicas=1 dc schema-spy -n range-myra-dev
    """
  }
}
