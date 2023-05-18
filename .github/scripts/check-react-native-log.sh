#!/bin/bash

echo "cd build-system-tests/mega-apps/${MEGA_APP_NAME}"
cd build-system-tests/mega-apps/${MEGA_APP_NAME}

# Define the time of seconds to wait the command
if [ "$PLATFORM" = "ios" ]; then
  TIME_TO_WAIT=300
else
  TIME_TO_WAIT=200
fi

# Define the color codes
BLUE_BOLD="\033[1;36m"
GREEN_BOLD="\033[1;32m"
RED_BOLD="\033[1;31m"
YELLOW_BOLD="\033[1;33m"
RESET="\033[0m"

# Sleep for the specified time
echo -e "${BLUE_BOLD}Sleep for $TIME_TO_WAIT second...${RESET}"
sleep $TIME_TO_WAIT

# Check if the log file only has one line
if [[ $(wc -l <"$LOG_FILE") -eq 1 && $(head -n 1 "$LOG_FILE") == "info Starting logkitty" ]]; then
  echo -e "${RED_BOLD}Failed to get the logging messages. Please increase TIME_TO_WAIT.${RESET}"
  exit 1
fi

# Define the exceptions to the error criteria
EXCEPTIONS=("AuthError -")
START_MESSAGES=("info Starting logkitty" "React Native iOS Logger started for XCode project")

# Step 0: Check if the log file has only one line with the start message
echo -e "${BLUE_BOLD}Checking log file for start messages...\n${RESET}"
if [[ $(wc -l <"$LOG_FILE") -eq 1 ]]; then
  for start_message in "${START_MESSAGES[@]}"; do
    if echo $(head -n 1 "$LOG_FILE") | grep -q "$start_message"; then
      echo -e "${RED_BOLD}Failed to get the logging messages. Please increase TIME_TO_WAIT.${RESET}"
      echo -e "${BLUE_BOLD}Full log:${RESET}"
      cat "$LOG_FILE"
      exit 1
    fi
  done
fi

# Step 1: Check if all lines in the log file meet the criteria:
echo -e "${BLUE_BOLD}Checking log file \"$LOG_FILE\" for errors...${RESET}"
HAS_ERROR=false

while read -r line; do
  LINE_ERROR=false
  if [[ "$line" == "" ]]; then
    continue
  # Check if there's any line has "NN:NN:NN"(N is 0-9) and "Error" or "ERROR".
  elif echo "$line" | grep -Eq '(([0-9]{2}:){2}[0-9]{2},?).*(Error|ERROR)'; then
    echo -e "${RED_BOLD}ERROR found:${RESET}"
    echo -e $line
    LINE_ERROR=true
    # Check if there's any line has "NN:NN:NN"(N is 0-9) and "fail".
  elif echo "$line" | grep -Eq '(([0-9]{2}:){2}[0-9]{2},?).*(fail)'; then
    echo -e "${RED_BOLD}fail found:${RESET}"
    echo -e $line
    LINE_ERROR=true
    # Check if there's any line has "NN:NN:NN"(N is 0-9) and "Could not connect to development server".
  elif echo "$line" | grep -Eq '(([0-9]{2}:){2}[0-9]{2},?).*(Could not connect to development server)'; then
    echo -e "${RED_BOLD}Connection error:${RESET}"
    echo -e $line
    LINE_ERROR=true
  fi
  for exception in "${EXCEPTIONS[@]}"; do
    if [[ "$line" == *"$exception"* ]]; then
      echo -e "${YELLOW_BOLD}Exception found:${RESET}"
      echo -e $line
      LINE_ERROR=false
      break
    fi
  done
  if [[ $LINE_ERROR == true ]]; then
    HAS_ERROR=true
  fi
done <"$LOG_FILE"

# Step 2: Errors found, show the file and exit with failure
if [[ $HAS_ERROR == true ]]; then
  echo -e "${RED_BOLD}Errors found in log file \"$LOG_FILE\":${RESET}"
  echo -e "${BLUE_BOLD}Full log:${RESET}"
  cat "$LOG_FILE"
  exit 1
elif [ ! -s "$LOG_FILE" ]; then
  echo -e "${RED_BOLD}log file \"$LOG_FILE\" is empty:${RESET}"
  echo -e "${BLUE_BOLD}Full log:${RESET}"
  cat "$LOG_FILE"
  exit 1
fi

# Step 3: If no errors found, exit successfully
echo -e "${BLUE_BOLD}Full log:${RESET}"
cat "$LOG_FILE"
echo -e "${GREEN_BOLD}No errors found in log file \"$LOG_FILE\". Exiting successfully.${RESET}"
exit 0
