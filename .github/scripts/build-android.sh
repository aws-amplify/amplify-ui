#!/bin/bash

# Define the log file path
LOG_FILE=$1
# Define app name
MEGA_APP_NAME=$2
# Define build tool
BUILD_TOOL=$3

# Import log function
source "../../../.github/scripts/log.sh"

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

  # Store the process ID (PID) of the last background command
  log "command" "PID=\$!"
  PID=$!
  echo $PID

  # Wait for 30 seconds
  SLEEP_TIME=30
  log "command" "sleep $SLEEP_TIME"
  sleep $SLEEP_TIME

  # Terminate the command using the stored PID
  log "command" "pkill -P $PID"
  pkill -P $PID
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
