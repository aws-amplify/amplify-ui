#!/bin/sh

# total number of .feature files that has unresolved @todo-tags
nTodoFiles=$(grep -R -e "@todo-*" ./packages/e2e/features/ -l | wc -l | sed -e 's/^[ \t]*//');

red="\033[0;31m"
nocolor="\033[0m"

if [ ${nTodoFiles} -gt 0 ]; then
  echo "\n---------"
  echo "ERROR: There are ${red}${nTodoFiles}${nocolor} feature files with @todo tags."
  echo "---------"

  grep -RIci "@todo-" ./packages/e2e/features/ | awk -v FS=":" '$2>0 { print $1, "has", $2, "@todo tags." }';
  echo "\n"
  exit 1;
else
  echo "🎉 No @todo tags were found."
fi
