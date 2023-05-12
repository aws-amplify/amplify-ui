#!/bin/bash

# Define the log file path
LOG_FILE=$1
# Define app name
MEGA_APP_NAME=$2

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
echo -e "${BLUE_BOLD}Logging errors from mega-app $MEGA_APP_NAME to $LOG_FILE in the background...${NC}"
echo -e "${GREEN_BOLD}npx react-native-log-ios $MEGA_APP_NAME >$LOG_FILE &${NC}"
npx react-native-log-ios $MEGA_APP_NAME >$LOG_FILE &

# Step 2: Run npm run android in the background for <time> seconds
echo "npx pod-install" # To prevent "AsyncStorage is null." https://react-native-async-storage.github.io/async-storage/docs/install/
npx pod-install
echo -e "${BLUE_BOLD}Running npm run ios...${NC}"
npm run ios
