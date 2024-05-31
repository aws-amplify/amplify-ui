echo "Running preinstall hook"
ada credentials update --account=845721723350 --provider=isengard --role=Admin --once

CA_DOMAIN=amplify-ui-liveness
CA_REPOSITORY=amplify-ui
CA_OWNER=845721723350
CA_REGION=us-east-2

CA_ENDPOINT=`aws codeartifact get-repository-endpoint --domain $CA_DOMAIN --repository $CA_REPOSITORY --domain-owner $CA_OWNER --region $CA_REGION --format npm --query repositoryEndpoint --output text`
CA_REGISTRY=${CA_ENDPOINT#"https://"}
NPM_TOKEN=`aws codeartifact get-authorization-token --domain $CA_DOMAIN --domain-owner $CA_OWNER --region $CA_REGION --query authorizationToken --output text`

echo "registry=$CA_ENDPOINT" > .npmrc
echo "//$CA_REGISTRY:_authToken=$NPM_TOKEN" >> .npmrc
echo "//$CA_REGISTRY:always-auth=true" >> .npmrc

YARN_REGISTRY=https://amplify-ui-liveness-845721723350.d.codeartifact.us-east-2.amazonaws.com/npm/amplify-ui/ yarn react-liveness add @aws-sdk/client-rekognitionstreaming@3.562.0