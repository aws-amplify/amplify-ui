#!/bin/bash

# Define the log file path
LOG_FILE=$1
# Define app name
MEGA_APP_NAME=$2

# Import log function
source "../../../.github/scripts/log.sh"

# To resolve "error Command failed: /Users/runner/Library/Android/sdk/platform-tools/adb logcat -c"
# https://stackoverflow.com/questions/63617294/error-while-running-android-build-on-react-native
# https://stackoverflow.com/questions/55677874/failed-to-launch-emulator-error-emulator-didnt-connect-within-60-seconds
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools

log "command" "cd build-system-tests/mega-apps/${MEGA_APP_NAME}"
cd build-system-tests/mega-apps/${MEGA_APP_NAME}

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
log "command" "npm run android"
npm run android
