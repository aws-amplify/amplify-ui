#!/bin/sh
set -e
IFS='|'

FRONTENDCONFIG="{\
\"SourceDir\":\"src\",\
\"DistributionDir\":\"dist\",\
\"BuildCommand\":\"npm run-script build\",\
\"StartCommand\":\"npm run-script start\"\
}"
FRONTEND="{\
\"frontend\":\"javascript\",\
\"framework\":\"none\",\
\"config\":$FRONTENDCONFIG\
}"
AMPLIFY="{\
\"defaultEditor\":\"code\"\
\"envName\":\"staging\"\
}"
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":false,\
\"accessKeyId\":\"$AWS_ACCESS_KEY_ID\",\
\"secretAccessKey\":\"$AWS_SECRET_ACCESS_KEY\",\
\"region\":\"us-east-1\"\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

# Pull the backend for each environment
for dir in environments/*/ ; do
  if ! [ -f "$dir/app-id" ]; then
    continue
  fi

  cd "$dir"

  # 'echo n' is used to answer "No" to the prompt "Do you plan on modifying this backend?"
  # See https://github.com/aws-amplify/amplify-cli/issues/5275
  echo n | amplify pull \
  --appId `cat app-id` \
  --amplify $AMPLIFY \
  --frontend $FRONTEND \
  --providers $PROVIDERS \
  && cd -
done
