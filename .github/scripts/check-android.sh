#!/bin/bash

if [[ "$BUILD_TOOL" == 'cli' && "$FRAMEWORK" == 'react-native' ]]; then
  MEGA_APP_NAME="rn${FRAMEWORK_VERSION}Cli${BUILD_TOOL_VERSION}Node18Ts${PLATFORM}"
fi

echo "cd build-system-tests/mega-apps/${MEGA_APP_NAME}"
cd build-system-tests/mega-apps/${MEGA_APP_NAME}

# Define the log file path
LOG_FILE=$1

# Define the time to run the command
TIME_TO_RUN=30

# Define the color codes
BLUE_BOLD="\033[1;36m"
GREEN_BOLD="\033[1;32m"
RED_BOLD="\033[1;31m"
NC="\033[0m"

# Sleep for the specified time
sleep $TIME_TO_RUN

echo "${RED_BOLD}curl localhost:8081... ${NC}"
curl localhost:8081

# Check for errors in the log file
if grep -qi "error\|fail" "$LOG_FILE" || [ ! -s "$LOG_FILE" ]; then
  # Display the full log file and exit with a failure status code
  echo -e "${RED_BOLD}Error detected in $LOG_FILE:${NC}"
  cat $LOG_FILE
  exit 1
fi

# If no errors were found, exit with a success status code
echo -e "$LOG_FILE:"
cat $LOG_FILE
echo -e "${GREEN_BOLD}No errors detected in $LOG_FILE${NC}"
exit 0
