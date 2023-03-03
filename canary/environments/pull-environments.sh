#!/bin/sh
set -e
IFS='|'

# In development, AWS_PROFILE should be set. In CI, it's not.
[ "$AWS_PROFILE" ] && useProfile="true" || useProfile="false"

# We set `useProfile` to true, because Amplify CLI does not support
# headless pull with IAM roles when `useProfile` is set to false.
# See https://github.com/aws-amplify/amplify-cli/issues/5275.
AWSCLOUDFORMATIONCONFIG="{\
\"configLevel\":\"project\",\
\"useProfile\":\"true\",\
\"profileName\":\"$AWS_PROFILE\",\
\"region\":\""$region\""\
}"
PROVIDERS="{\
\"awscloudformation\":$AWSCLOUDFORMATIONCONFIG}"

echo $(pwd)
for dir in ./environments/*/; do
  if ! [ -f "$dir/package.json" ]; then
    echo "If $dir is an environment, ensure the a package.json file exists with a \"pull\" command that pulls the environment (see the README)."
    continue
  fi

  cd $dir
  echo $dir

  # `--yes` flag is to added to say yes to the CLI prompts.
  # See https://github.com/aws-amplify/amplify-cli/issues/5275.
  yarn pull --providers $PROVIDERS --yes

  cd -
done
