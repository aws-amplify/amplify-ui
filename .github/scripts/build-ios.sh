#!/bin/bash

# Define the log file path
LOG_FILE=$1
# Define app name
MEGA_APP_NAME=$2

# Define the color codes
BLUE_BOLD="\033[1;36m"
NC="\033[0m"

# Step 1: Log errors to LOG_FILE in the background
echo -e "${BLUE_BOLD}Create ${LOG_FILE}${NC}"
touch $LOG_FILE
echo -e "${BLUE_BOLD}Installing react-native-log-ios...${NC}"
npm install -D react-native-log-ios
echo -e "${BLUE_BOLD}Logging errors from mega-app $MEGA_APP_NAME to $LOG_FILE in the background...${NC}"
npx react-native-log-ios $MEGA_APP_NAME >$LOG_FILE &

# Run `npm start` to prevent "no bundle URL present"
# details: https://stackoverflow.com/questions/42610070/what-is-the-meaning-of-no-bundle-url-present-in-react-native
echo -e "${BLUE_BOLD}npm start${NC}"
npm start &

# Step 2: Run npm run android in the background for <time> seconds
echo -e "${BLUE_BOLD}npx pod-install${NC}" # To prevent "AsyncStorage is null." https://react-native-async-storage.github.io/async-storage/docs/install/
npx pod-install
echo -e "${BLUE_BOLD}Running npm run ios...${NC}"
npm run ios
