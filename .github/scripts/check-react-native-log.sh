#!/bin/bash

if [[ "$BUILD_TOOL" == 'cli' && "$FRAMEWORK" == 'react-native' ]]; then
  MEGA_APP_NAME="rn${FRAMEWORK_VERSION}Cli${BUILD_TOOL_VERSION}Node18Ts"
fi

echo "cd build-system-tests/mega-apps/${MEGA_APP_NAME}"
cd build-system-tests/mega-apps/${MEGA_APP_NAME}

# Define the time of seconds to wait the command
if $PLATFORM == "ios"; then
  TIME_TO_WAIT=240
else
  TIME_TO_WAIT=200
fi

# Define the color codes
BLUE_BOLD="\033[1;36m"
GREEN_BOLD="\033[1;32m"
RED_BOLD="\033[1;31m"
YELLOW_BOLD="\033[1;33m"
NC="\033[0m"

# Sleep for the specified time
echo -e "${BLUE_BOLD}Sleep for $TIME_TO_WAIT second...${NC}"
sleep $TIME_TO_WAIT

# Check if the log file only has one line
if [[ $(wc -l <"$LOG_FILE") -eq 1 && $(head -n 1 "$LOG_FILE") == "info Starting logkitty" ]]; then
  echo -e "${RED_BOLD}Failed to get the logging messages. Please increase TIME_TO_WAIT.${NC}"
  exit 1
fi

# Define the exceptions to the error criteria
EXCEPTIONS=("Notifications.InAppMessaging - Failed to sync messages" "InAppMessaging.AWSPinpointProvider - Error getting in-app messages")
START_MESSAGES=("info Starting logkitty" "React Native iOS Logger started for XCode project ${MEGA_APP_NAME}")

# Step 0: Check if the log file has only one line with the start message
echo -e "${BLUE_BOLD}Checking log file for start messages...\n${NC}"
if [[ $(wc -l <"$LOG_FILE") -eq 1 ]]; then
  for start_message in "${START_MESSAGES[@]}"; do
    if [[ $(head -n 1 "$LOG_FILE") == "$start_message" ]]; then
      echo -e "${RED_BOLD}Failed to get the logging messages. Please increase TIME_TO_WAIT.${NC}"
      echo -e "${BLUE_BOLD}Full log:${NC}"
      cat "$LOG_FILE"
      exit 1
    fi
  done
fi

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
  echo -e "${BLUE_BOLD}Full log:${NC}"
  cat "$LOG_FILE"
  exit 1
elif [ ! -s "$LOG_FILE" ]; then
  echo -e "${RED_BOLD}log file \"$LOG_FILE\" is empty:${NC}"
  echo -e "${BLUE_BOLD}Full log:${NC}"
  cat "$LOG_FILE"
  exit 1
fi

# Step 3: If no errors found, exit successfully
echo -e "${BLUE_BOLD}Full log:${NC}"
cat "$LOG_FILE"
echo -e "${GREEN_BOLD}No errors found in log file \"$LOG_FILE\". Exiting successfully.${NC}"
exit 0
