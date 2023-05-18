const fs = require('fs');

const checkReactNativeLog = () => {
  console.log(`cd build-system-tests/mega-apps/${process.env.MEGA_APP_NAME}`);
  process.chdir(`build-system-tests/mega-apps/${process.env.MEGA_APP_NAME}`);
  const colors = {
    blueBold: '\x1b[1;36m',
    greenBold: '\x1b[1;32m',
    redBold: '\x1b[1;31m',
    yellowBold: '\x1b[1;33m',
    colorReset: '\x1b[0m',
  };

  let timeToWait;
  if (process.env.PLATFORM === 'ios') {
    timeToWait = 300;
  } else {
    timeToWait = 200;
  }

  console.log(
    `${colors.blueBold}Sleep for'${timeToWait}'seconds...${colors.colorReset}}`
  );
  sleep(timeToWait);

  const logFile = fs.readFileSync(process.env.LOG_FILE, 'utf-8');
  const logLines = logFile.split('\n');

  if (logLines.length === 1 && logLines[0] === 'info Starting logkitty') {
    console.error(
      `Failed to get the logging messages. Please increase TIME_TO_WAIT.`
    );
    process.exit(1);
  }

  const exceptions = ['AuthError -'];
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

  let hasError = false;

  console.log(
    `${colors.blueBold}Checking log file ${process.env.LOG_FILE} for errors...${colors.colorReset}`
  );

  for (const line of logLines) {
    if (line === '') {
      continue;
    } else if (line.match(/(([0-9]{2}:){2}[0-9]{2},?).*(Error|ERROR)/)) {
      console.error(`${colors.redBold}ERROR found:${colors.colorReset}`);
      console.error(line);
      hasError = true;
    } else if (line.match(/(([0-9]{2}:){2}[0-9]{2},?).*(fail)/)) {
      console.error(`${colors.redBold}fail found:${colors.colorReset}`);
      console.error(line);
      hasError = true;
    } else if (
      line.match(
        /(([0-9]{2}:){2}[0-9]{2},?).*(Could not connect to development server)/
      )
    ) {
      console.error(`${colors.redBold}Connection error:${colors.colorReset}`);
      console.error(line);
      hasError = true;
    }

    let isException = false;
    for (const exception of exceptions) {
      if (line.includes(exception)) {
        console.warn(
          `${colors.yellowBold}Exception found:${colors.colorReset}`
        );
        console.warn(line);
        isException = true;
        break;
      }
    }

    /*
     * `errorRegex` finds a line that starts with NN:NN:NN (N is a number)
     * and contains the word 'Error' or 'fail' or 'Could not connect to development server'
     */
    const errorRegex =
      '/(([0-9]{2}:){2}[0-9]{2},?).*(Error|ERROR|fail|Could not connect to development server)/';
    if (!isException && line.match(errorRegex)) {
      hasError = true;
    }
  }

  if (hasError) {
    console.error(
      `${colors.redBold}Errors found in log file ${process.env.LOG_FILE}${colors.colorReset}`
    );
    console.log(`${colors.blueBold}Full log:${colors.colorReset}`);
    console.log(logFile);
    process.exit(1);
  } else if (logFile === '') {
    console.error(
      `${colors.redBold}Log file ${process.env.LOG_FILE} is empty.${colors.colorReset}`
    );
    console.log(`${colors.blueBold}Full log:${colors.colorReset}`);
    console.log(logFile);
    process.exit(1);
  }

  console.log(`${colors.greenBold}Full log:${colors.colorReset}`);
  console.log(logFile);
  console.log(
    `${colors.greenBold}No errors found in log file ${process.env.LOG_FILE}${colors.colorReset}`
  );
  process.exit(0);
};

const sleep = (seconds) => {
  const milliseconds = seconds * 1000;
  const start = new Date().getTime();
  while (true) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
};

checkReactNativeLog();
