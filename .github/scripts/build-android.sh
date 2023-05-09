#!/bin/bash

# Define the log file path
LOG_FILE=$1

# Define the color codes
BLUE_BOLD="\033[1;36m"
GREEN_BOLD="\033[1;32m"
RED_BOLD="\033[1;31m"
NC="\033[0m"

# To resolve "error Command failed: /Users/runner/Library/Android/sdk/platform-tools/adb logcat -c"
# https://stackoverflow.com/questions/63617294/error-while-running-android-build-on-react-native
export ANDROID_HOME=/Users/$USER/Library/Android/sdk
export PATH=$ANDROID_HOME/platform-tools:$PATH
export PATH=$ANDROID_HOME/tools:$PATH

# Step 1: Log errors to LOG_FILE in the background
echo -e "${BLUE_BOLD}Create ${LOG_FILE}${NC}"
touch $LOG_FILE
echo -e "${BLUE_BOLD}Logging errors to $LOG_FILE in the background${NC}"
npx react-native log-android >$LOG_FILE &

# Step 2: Run npm run android in the background for <time> seconds
echo -e "${BLUE_BOLD}Running npm run android${NC}"
npm run android
