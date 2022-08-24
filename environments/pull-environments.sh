#!/bin/bash
# using bin/bash for macOS and Linux compatibility
set -e
IFS='|'

dirs=""
# Pull the backend for each environment
for dir in ./*/ ; do
  if ! [ -f "$dir/package.json" ]; then
    echo "If $dir is an environment, ensure the a package.json file exists with a \"pull\" command that pulls the environment (see the README)."
    continue
  fi

  # Append to enter-separated directory lists
  dirs="$dirs\n$dir"
done

# max number of parallel tasks at a time
numParallelTasks=8; # Future improvement: could set this to # of logical cores in localdevice

if [ "$NODE_ENV" = "test" ]; then
  numParallelTasks=1; # GitHub actions has trouble handling parallel executions
fi

# Get the path to this shell file relative to cwd
# (1) bash_source[0] contains the filename of this shell relative to cwd
#     (e.g. `../pull-environments.sh`)
# (2) dirname gets rid of filename and returns the relative path to the 
#     directory is in (e.g. ..)
#
# source: https://stackoverflow.com/a/24112741
shell_path="$(dirname "${BASH_SOURCE[0]}")" # under normal use, this points to `../`

# Pull environments in parallel
# Note that printf is used because echo dosn't handle `\n` by default in bash.
printf $dirs | xargs -P $numParallelTasks -I {} sh -c ""$shell_path"/pull-environment.sh {}";

