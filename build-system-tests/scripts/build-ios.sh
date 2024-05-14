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

# Step 1: Log errors to LOG_FILE in the background
log "command" "touch $LOG_FILE"
touch $LOG_FILE
log "command" "npm install -D react-native-log-ios"
npm install -D react-native-log-ios
log "command" "npx react-native-log-ios $MEGA_APP_NAME >$LOG_FILE &"
npx react-native-log-ios $MEGA_APP_NAME >$LOG_FILE &

# Run `npm start` to prevent "no bundle URL present"
# details: https://stackoverflow.com/questions/42610070/what-is-the-meaning-of-no-bundle-url-present-in-react-native
log "command" "npm start"
npm start &

# Step 2: Run npm run android in the background
log "command" "npx pod-install" # To prevent "AsyncStorage is null." https://react-native-async-storage.github.io/async-storage/docs/install/
npx pod-install
log "command" "npm run ios"
if [ $BUILD_TOOL == 'expo' ]; then
  npx expo start --ios -p 19001
else
  npm run ios
fi
