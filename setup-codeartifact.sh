if [ "$CI" = true ]; then
  echo "Exiting local setup"
  exit 0
fi

echo "Setting up CodeArtifact for local install"

DOMAIN=amplify-ui-liveness
REPOSITORY=amplify-ui

ENDPOINT=`aws codeartifact get-repository-endpoint --domain $DOMAIN --repository $REPOSITORY --format npm --query repositoryEndpoint --output text`
CODEARTIFACT_REGISTRY=${ENDPOINT#"https://"}
NPM_TOKEN=`aws codeartifact get-authorization-token --domain $DOMAIN --query authorizationToken --output text`

echo "registry=$ENDPOINT" > .npmrc
echo "//$CODEARTIFACT_REGISTRY:_authToken=$NPM_TOKEN" >> .npmrc
echo "//$CODEARTIFACT_REGISTRY:always-auth=true" >> .npmrc
