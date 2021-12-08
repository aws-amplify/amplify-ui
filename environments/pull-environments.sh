#!/bin/sh
set -e
IFS='|'

dirs=""
# Pull the backend for each environment
for dir in ./*/ ; do
  if ! [ -f "$dir/package.json" ]; then
    echo "If $dir is an environment, ensure the a package.json file exists with a \"pull\" command that pulls the environment (see the README)."
    continue
  fi

  dirs="$dirs\n$dir"
done

echo $dirs | xargs -P 2 -I {} sh -c "./pull-environment.sh {}"

