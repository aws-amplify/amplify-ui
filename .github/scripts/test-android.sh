#!/bin/bash

# Define the log file path
LOG_FILE="test.log"

# Define the time to run the command
TIME_TO_RUN=30

# Step 1: Log errors to test.log in the background
echo -e "\033[1;36mLogging errors to $LOG_FILE in the background\033[0m"
npx react-native log-android >$LOG_FILE &

# Step 2: Run npm run android in the background for <time> seconds
echo -e "\033[1;36mRunning npm run android in the background for $TIME_TO_RUN seconds\033[0m"
npm run android >/dev/null &

# Sleep for the specified time
sleep $TIME_TO_RUN

# Step 3: Check for errors in the log file
if grep -q "error" "$LOG_FILE"; then
  # Display the full log file and exit with a failure status code
  echo -e "\033[1;31mError detected in $LOG_FILE:\033[0m"
  cat $LOG_FILE
  exit 1
fi

# Step 4: If no errors were found, exit with a success status code
echo -e "\033[1;32mNo errors detected in $LOG_FILE\033[0m"
exit 0
