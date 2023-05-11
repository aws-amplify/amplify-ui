#!/bin/bash

if [[ "$BUILD_TOOL" == 'cli' && "$FRAMEWORK" == 'react-native' ]]; then
  MEGA_APP_NAME="rn${FRAMEWORK_VERSION}Cli${BUILD_TOOL_VERSION}Node18Ts${PLATFORM}"
fi

echo "cd build-system-tests/mega-apps/${MEGA_APP_NAME}"
cd build-system-tests/mega-apps/${MEGA_APP_NAME}

# Define the log file to check
LOG_FILE=$1

# Define the time of seconds to wait the command
TIME_TO_WAIT=200

# Define the color codes
BLUE_BOLD="\033[1;36m"
GREEN_BOLD="\033[1;32m"
RED_BOLD="\033[1;31m"
YELLOW_BOLD="\033[1;33m"
NC="\033[0m"

# Sleep for the specified time
echo -e "${BLUE_BOLD}Sleep for $TIME_TO_WAIT second...${NC}"
sleep $TIME_TO_WAIT

# Define the exceptions to the error criteria
EXCEPTIONS=("Notifications.InAppMessaging - Failed to sync messages" "InAppMessaging.AWSPinpointProvider - Error getting in-app messages")

# Step 1: Check if all lines in the log file meet the criteria:
echo -e "${BLUE_BOLD}Checking log file \"$LOG_FILE\" for errors...${NC}"
LINE_ERROR=false

while read -r line; do
  if [[ "$line" == "" ]]; then
    continue
  elif [[ "$line" == *"ERROR"* ]]; then
    echo -e "${RED_BOLD}ERROR found:${NC}"
    echo -e $line
    LINE_ERROR=true
  elif [[ "$line" == *"fail"* ]]; then
    echo -e "${RED_BOLD}fail found: ${NC}"
    echo -e $line
    LINE_ERROR=true
  fi
  for exception in "${EXCEPTIONS[@]}"; do
    if [[ "$line" == *"$exception"* ]]; then
      echo -e "${YELLOW_BOLD}Exception found: $line${NC}"
      LINE_ERROR=false
      break
    fi
  done
  if [[ "$LINE_ERROR" == "true" ]]; then
    break
  fi
done <"$LOG_FILE"

# Step 2: Errors found, show the file and exit with failure
if $LINE_ERROR; then
  echo -e "${RED_BOLD}Errors found in log file \"$LOG_FILE\":${NC}"
  cat "$LOG_FILE"
  exit 1
elif [ ! -s "$LOG_FILE" ]; then
  echo -e "${RED_BOLD}log file \"$LOG_FILE\" is empty:${NC}"
  cat "$LOG_FILE"
  exit 1
fi

# Step 3: If no errors found, exit successfully
cat "$LOG_FILE"
echo -e "${GREEN_BOLD}No errors found in log file \"$LOG_FILE\". Exiting successfully.${NC}"
exit 0
