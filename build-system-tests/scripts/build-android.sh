#!/bin/bash

# Define the log file path
LOG_FILE=$1
# Define app name
MEGA_APP_NAME=$2
# Define build tool
BUILD_TOOL=$3

# Import log function
source "./scripts/log.sh"

log "command" "cd mega-apps"
cd mega-apps/$MEGA_APP_NAME

# Log errors to LOG_FILE in the background
log "command" "touch $LOG_FILE"
touch $LOG_FILE
log "command" "npx react-native log-android >$LOG_FILE &"
npx react-native log-android >$LOG_FILE &

# Check if the command succeeded
if [ $? -ne 0 ]; then
  log "error" "Failed to run command: npx react-native log-android > $LOG_FILE &"
  exit 1
fi

# Run npm run android in the background
if [ $BUILD_TOOL == 'expo' ]; then
  log "command" "npm run android"
  # Run npm run android in the background
  npm run android &
  npx wait-on -t 20000 tcp:19000
else
  log "command" "cd android"
  cd android
  log "command" "./gradlew clean" # To prevent "installDebug FAILED" https://stackoverflow.com/a/54955869/12610324
  ./gradlew clean
  log "command" "cd .."
  cd ..
  log "command" "npm run android"
  npm run android
fi
