#!/bin/sh
set -e
IFS='|'

# In development, AWS_PROFILE should be set. In CI, it's not.
[ "$AWS_PROFILE" ] && useProfile="true" || useProfile="false";

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
  echo `pwd`
for dir in ./environments/*/ ; do
  if ! [ -f "$dir/package.json" ]; then
    echo "If $dir is an environment, ensure the a package.json file exists with a \"pull\" command that pulls the environment (see the README)."
    continue
  fi

  cd $dir
  echo $dir

  # 'echo y' is used to answer "Yes" to the prompt "Do you plan on modifying this backend?"
  # See https://github.com/aws-amplify/amplify-cli/issues/5275
  echo y | yarn --cwd environments/ pull \
    --amplify $AMPLIFY \
    --frontend $FRONTEND \
    --providers $PROVIDERS

  cd -
done
