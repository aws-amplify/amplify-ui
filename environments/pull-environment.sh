#!/bin/bash
set -e
IFS='|'

# Get args
dir=$1
region=$2

# In development, AWS_PROFILE will be set explicitly. In CI,
# we set it explicitly to default.
[ -z "$AWS_PROFILE" ] && AWS_PROFILE="default"

FRONTENDCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"dist\",\
\"BuildCommand\":\"npm run-script build\",\
\"StartCommand\":\"npm run-script start\"\
}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"none\",\
\"config\":$FRONTENDCONFIG}"
AMPLIFY="{\
\"defaultEditor\":\"code\",\
}"

# We set `useProfile` to true, because Amplify CLI does not support headless
# pull with temporary credentials when `useProfile` is set to false.
# See https://github.com/aws-amplify/amplify-cli/issues/11009.
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":\"true\",\
\"profileName\":\"$AWS_PROFILE\",\
\"region\":\""$region\""\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG}"

cd $dir

# pull environments with retries
for i in {1..3}; do
  echo "===================="
  echo "Attempt $i out of 3 for env $dir:"
  echo "===================="
  # 'echo n' is used to answer "No" to the prompt "Do you plan on modifying this backend?"
  # See https://github.com/aws-amplify/amplify-cli/issues/5275
  if echo n | yarn pull --amplify $AMPLIFY --frontend $FRONTEND --providers $PROVIDERS; then
    break
  else
    echo "[ERROR]: amplify pull failed for env $dir, waiting to retry..."
  fi

  # Sleep 5 seconds before retrying
  sleep 5
done

# exit 0 if last `yarn pull` was successful, non-zero otherwise
exit $return_value
