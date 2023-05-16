#!/bin/bash

# Define the log file path
LOG_FILE=$1
# Define app name
MEGA_APP_NAME=$2

# Define the color codes
BLUE_BOLD="\033[1;36m"
RESET="\033[0m"

echo -e "${BLUE_BOLD}cd build-system-tests/mega-apps/${MEGA_APP_NAME}${RESET}"
cd build-system-tests/mega-apps/${MEGA_APP_NAME}

# Step 1: Log errors to LOG_FILE in the background
echo -e "${BLUE_BOLD}Create ${LOG_FILE}${RESET}"
touch $LOG_FILE
echo -e "${BLUE_BOLD}Installing react-native-log-ios...${RESET}"
npm install -D react-native-log-ios
echo -e "${BLUE_BOLD}Logging errors from mega-app $MEGA_APP_NAME to $LOG_FILE in the background...${RESET}"
npx react-native-log-ios $MEGA_APP_NAME >$LOG_FILE &

# Run `npm start` to prevent "no bundle URL present"
# details: https://stackoverflow.com/questions/42610070/what-is-the-meaning-of-no-bundle-url-present-in-react-native
echo -e "${BLUE_BOLD}npm start${RESET}"
npm start &

# Step 2: Run npm run android in the background for <time> seconds
echo -e "${BLUE_BOLD}npx pod-install${RESET}" # To prevent "AsyncStorage is null." https://react-native-async-storage.github.io/async-storage/docs/install/
npx pod-install
echo -e "${BLUE_BOLD}Running npm run ios...${RESET}"
npm run ios
