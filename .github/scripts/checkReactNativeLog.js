const fs = require('fs');

const sleep = (seconds) => {
  const milliseconds = seconds * 1000;
  const start = new Date().getTime();
  while (true) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
};

/**
 * checkStartMessage is a function that checks if the log file ONLY contains the starting message
 * If the log file ONLY contains the starting message, it means that the logging messages are not ready yet
 */
const checkStartMessage = (colors, logLines, logFile) => {
  const startMessages = [
    'info Starting logkitty',
    'React Native iOS Logger started for XCode project',
  ];

  console.log(
    `${colors.blueBold}Checking log file for start messages...${colors.colorReset}}`
  );
  if (logLines.length === 1) {
    for (const startMessage of startMessages) {
      if (logLines[0].includes(startMessage)) {
        console.error(
          `${colors.redBold}Failed to get the logging messages. Please increase TIME_TO_WAIT.${colors.colorReset}`
        );
        console.log(`${colors.blueBold}Full log:${colors.colorReset}`);
        console.log(logFile);
        process.exit(1);
      }
    }
  }
};

/**
 * checkErrorMessage is a function that checks if there is an error in the log file
 * @returns {boolean} hasError
 */
const checkErrorMessage = (colors, logLines) => {
  console.log(
    `${colors.blueBold}Checking log file ${process.env.LOG_FILE} for errors...${colors.colorReset}`
  );

  let hasError = false;
  for (const line of logLines) {
    let isErrorLine = false;
    const errorKeyWords = [
      'Error',
      'ERROR',
      'fail',
      'Could not connect to development server',
    ];
    const errorRegex = `(([0-9]{2}:){2}[0-9]{2},?).*(${errorKeyWords.join(
      '|'
    )})`;

    if (line.match(errorRegex)) {
      console.error(`${colors.redBold}ERROR found:${colors.colorReset}`);
      console.error(line);
      isErrorLine = true;
    }

    // Exceptions are errors that are not really errors
    const exceptions = ['AuthError -'];
    for (const exception of exceptions) {
      if (line.includes(exception)) {
        console.warn(
          `${colors.yellowBold}Exception found:${colors.colorReset}`
        );
        console.warn(line);
        isErrorLine = false;
        break;
      }
    }
    hasError = hasError || isErrorLine;
  }
  return hasError;
};

const checkReactNativeLog = () => {
  console.log(`cd build-system-tests/mega-apps/${process.env.MEGA_APP_NAME}`);
  process.chdir(`build-system-tests/mega-apps/${process.env.MEGA_APP_NAME}`);
  const colors = {
    blueBold: '\x1b[1;36m',
    greenBold: '\x1b[1;32m',
    redBold: '\x1b[1;31m',
    yellowBold: '\x1b[1;33m',
    colorEnd: '\x1b[0m',
  };

  // Wait for the logging messages to be ready. The number is based on real experiments in Github Actions.
  let timeToWait = process.env.PLATFORM === 'ios' ? 300 : 200;

  console.log(
    `${colors.blueBold}Sleep for'${timeToWait}'seconds...${colors.colorEnd}}`
  );
  sleep(timeToWait);

  const logFile = fs.readFileSync(process.env.LOG_FILE, 'utf-8');
  const logLines = logFile.split('\n').filter((line) => line !== '');

  checkStartMessage(colors, logLines, logFile);

  let hasError = checkErrorMessage(colors, logLines);

  if (hasError) {
    console.error(
      `${colors.redBold}Errors found in log file ${process.env.LOG_FILE}${colors.colorEnd}`
    );
    console.log(`${colors.blueBold}Full log:${colors.colorEnd}`);
    console.log(logFile);
    process.exit(1);
  } else if (logFile === '') {
    console.error(
      `${colors.redBold}Log file ${process.env.LOG_FILE} is empty.${colors.colorEnd}`
    );
    console.log(`${colors.blueBold}Full log:${colors.colorEnd}`);
    console.log(logFile);
    process.exit(1);
  }

  console.log(`${colors.greenBold}Full log:${colors.colorEnd}`);
  console.log(logFile);
  console.log(
    `${colors.greenBold}No errors found in log file ${process.env.LOG_FILE}${colors.colorEnd}`
  );
  process.exit(0);
};

checkReactNativeLog();
