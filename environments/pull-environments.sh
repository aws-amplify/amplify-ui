#!/bin/bash
# using bin/bash for macOS and Linux compatibility

dirs=""

# Get Options from CLI

# Options:
#  -r (region): AWS region to pull environments from. Defaults to us-east-2.
#  -i (include): Regex pattern that matches environment folders to pull from.
#  -e (exclude): Regex pattern that matches environment folders to ignore.
# If both -i and -e are specified, it'll match all dirs that match -i but not -e.

# Examples:
# - Include only sms/phone environments:
#   ./pull-environments.sh -r us-east-2 -i "\./auth/auth-with-((phone-and-sms-mfa)|(phone-number)|(totp-and-sms-mfa))"

while getopts ':r:i:e:' OPTION; do

  case "$OPTION" in
  r)
    region="$OPTARG"
    ;;
  i)
    include=$OPTARG
    ;;
  e)
    exclude="$OPTARG"
    ;;

  ?)
    echo "Usage: $(basename $0) [-r region] [-i include] [-e exclude]"
    exit 1
    ;;
  esac

done

# Apply defaults
[ -z "$region" ] && region="us-east-2"        # default to us-east-2
[ -z "$include" ] && include="\./[a-zA-Z\-]*" # default to all folders in cwd

# Check OS, because `find` implementation is slightly different between OS.
uname="$(uname)"

# We only support macOS and Linux.
# TODO: We should rewrite this script in node.js for better cross-os support.
if [[ "$uname" != "Darwin" && "$uname" != 'Linux' ]]; then
  echo "ERROR: Unknown os: "$uname""
  exit 1
fi

regexMatch=""
if [[ "$uname" == "Darwin" ]]; then
  # macOS has find syntax `find -E . [...]`.
  if [ -z "$exclude" ]; then
    regexMatch=$(find -E . -regex "$include")
  else
    regexMatch=$(find -E . -regex "$include" -not -regex "$exclude")
  fi
else
  # Linux has find syntax `find -E . [...]`.
  if [ -z "$exclude" ]; then
    regexMatch=$(find . -regextype posix-extended -regex "$include")
  else
    regexMatch=$(find . -regextype posix-extended -regex "$include" -not -regex "$exclude")
  fi
fi

if [ -z "$regexMatch" ]; then
  echo "ERROR: no directory matches given regex."
  exit 1
fi

for dir in $regexMatch; do
  if ! [ -f "$dir/package.json" ]; then
    echo "If $dir is an environment, ensure the a package.json file exists with a \"pull\" command that pulls the environment (see the README)."
    continue
  fi

  # Append to enter-separated directory lists
  dirs="$dirs\n$dir"
done

# max number of parallel tasks at a time
numParallelTasks=8 # Future improvement: could set this to # of logical cores in localdevice

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
printf $dirs | xargs -P $numParallelTasks -I {} sh -c ""$shell_path"/pull-environment.sh {} "$region""
