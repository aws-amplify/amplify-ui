#!/bin/bash
set -e

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
  log "command" "npm run android -- -p 19000 >$LOG_FILE &"
  # Run npm run android in the background
  npm run android -- -p 19000 >$LOG_FILE &
  npx wait-on -t 20000 tcp:19000
else
  log "command" "cd android >$LOG_FILE "
  cd android >$LOG_FILE
  log "command" "./gradlew clean >$LOG_FILE" # To prevent "installDebug FAILED" https://stackoverflow.com/a/54955869/12610324
  ./gradlew clean >$LOG_FILE
  log "command" "cd .. >$LOG_FILE"
  cd .. >$LOG_FILE
  log "command" "npm run android >$LOG_FILE"
  npm run android >$LOG_FILE
fi
