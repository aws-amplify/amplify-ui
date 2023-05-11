#!/bin/bash

# Define the log file path
LOG_FILE=$1

# Define the color codes
BLUE_BOLD="\033[1;36m"
GREEN_BOLD="\033[1;32m"
RED_BOLD="\033[1;31m"
NC="\033[0m"

# Step 1: Log errors to LOG_FILE in the background
echo -e "${BLUE_BOLD}Create ${LOG_FILE}${NC}"
touch $LOG_FILE
echo -e "${BLUE_BOLD}Installing react-native-log-ios...${NC}"
npm install -D react-native-log-ios
echo -e "${BLUE_BOLD}Logging errors to $LOG_FILE in the background...${NC}"
npx react-native-log-ios rnLatestCliLatestNote18Ts >$LOG_FILE &

# Step 2: Run npm run android in the background for <time> seconds
echo -e "${BLUE_BOLD}Running npm run ios...${NC}"
npm run ios
