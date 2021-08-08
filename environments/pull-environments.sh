#!/bin/sh
set -e
IFS='|'

# In development, AWS_PROFILE should be set. In CI, it's not.
[ "$AWS_PROFILE" ] && useProfile="true" || useProfile="false";

# -limit tag limits pulling to single environment
# e.g. sh environments/pull-environments.sh -limit auth-with-email
environments=environments/*/
while getopts "limit:" opt
do
  environments=environments/$OPTARG
done

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
\"defaultEditor\":\"code\",\
\"envName\":\"staging\"\
}"
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":$useProfile,\
\"profileName\":\"$AWS_PROFILE\",\
\"accessKeyId\":\"$AWS_ACCESS_KEY_ID\",\
\"secretAccessKey\":\"$AWS_SECRET_ACCESS_KEY\",\
\"region\":\"us-east-1\"\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG\
}"

# Pull the backend for each environment
for dir in $environments ; do
  if ! [ -f "$dir/app-id" ]; then
    echo "If $dir is an environment, ensure the file 'app-id' containing the environment's Amplify app id exists."
    continue
  fi

  cd $dir

  # 'echo y' is used to answer "Yes" to the prompt "Do you plan on modifying this backend?"
  # See https://github.com/aws-amplify/amplify-cli/issues/5275
  echo y | amplify pull \
    --appId `cat app-id` \
    --amplify $AMPLIFY \
    --frontend $FRONTEND \
    --providers $PROVIDERS

  cd -
done
