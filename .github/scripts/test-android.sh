#!/bin/bash

# Define the log file path
LOG_FILE="test.log"

# Define the time to run the command
TIME_TO_RUN=30

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

# Step 1: Log errors to test.log in the background
echo -e "${BLUE_BOLD}Create test.log${NC}"
touch test.log
echo -e "${BLUE_BOLD}Logging errors to $LOG_FILE in the background${NC}"
npx react-native log-android >$LOG_FILE &
log_pid=$!

# Step 2: Run npm run android in the background for <time> seconds
echo -e "${BLUE_BOLD}Running npm run android in the background for $TIME_TO_RUN seconds${NC}"
npm run android >/dev/null &
android_pid=$!

# Sleep for the specified time
sleep $TIME_TO_RUN

# Step 3: Check for errors in the log file
if grep -q "error" "$LOG_FILE"; then
  # Display the full log file and exit with a failure status code
  echo -e "${RED_BOLD}Error detected in $LOG_FILE:${NC}"
  cat $LOG_FILE
  exit 1
fi

# Step 4: If no errors were found, exit with a success status code
cat $LOG_FILE
echo -e "${GREEN_BOLD}No errors detected in $LOG_FILE${NC}"
exit 0

# Kill the log and android processes
kill ${log_pid}
kill ${android_pid}
