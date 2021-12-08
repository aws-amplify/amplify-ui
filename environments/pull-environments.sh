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

# max number of parallel tasks at a time
numParallelTasks=8; # Future improvement: could set this to # of logical cores in localdevice

if [ "$NODE_ENV" = "test" ]; then
  numParallelTasks=1; # GitHub actions has trouble handling parallel executions
fi

echo $dirs | xargs -P $numParallelTasks -I {} sh -c "./pull-environment.sh {}"

