import { PromisePool } from '@supercharge/promise-pool';
import { Command } from 'commander';
import fs from 'fs';

const program = new Command();

/**
 * Example usage:
 * $ node --require esbuild-register ./scripts/checkReactNativeLog.ts --log-file-name test.log --mega-app-name rnlatestclilatesttsios --platform android
 */
program
  .option('-l, --log-file-name <filename>', 'Specify the log file name')
  .option('-n, --mega-app-name <appname>', 'Specify the mega app name')
  .option('-p, --platform <platform>', 'Specify the platform (ios/android)')
  .parse(process.argv);

program.parse();

const {
  logFileName = 'test.log',
  megaAppName,
  platform = 'ios',
} = program.opts();

if (!megaAppName) {
  console.error('Missing --mega-app-name');
  process.exit(1);
}

const sleep = (seconds: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
};

type LogType = 'info' | 'command' | 'success' | 'error' | 'warning';

const log = (type: LogType | 'log', message: string): void => {
  const colors: { [key in LogType]: string } = {
    info: '\x1b[1;36m',
    command: '\x1b[1;34m',
    success: '\x1b[1;32m',
    error: '\x1b[1;31m',
    warning: '\x1b[1;33m',
  };
  const colorEnd = '\x1b[0m';

  if (type === 'log') {
    console.log(message);
  } else {
    console.log(
      `${
        colors[type]
      }[ amplify-ui - ${type.toUpperCase()}] ${message}${colorEnd}`
    );
  }
};

/**
 * checkStartMessage is a function that checks if the log file ONLY contains the starting message
 * If the log file ONLY contains the starting message, it means that the logging messages are not ready yet
 */
const checkStartMessage = async (
  logLines: string[],
  logFile: string
): Promise<void> => {
  const startMessages = [
    'info Starting logkitty',
    'React Native iOS Logger started for XCode project',
  ];

  log('info', 'Checking log file for start messages...');
  if (logLines.length === 1) {
    for (const startMessage of startMessages) {
      if (logLines[0].includes(startMessage)) {
        log(
          'error',
          `Failed to get the logging messages. It might because 1) the logging messages are not ready, or 2) failed to log all the messages, or 3) no error is thrown. 
           If it\'s 1), \`timeToWait\` needs to be increased. 
           If it\'s 2), please check if the logging tools (react-native-log-ios, log-android) work as expected.
           If it\'s 3), please make sure to throw some errors so that we can check if the logging messages are ready.`
        );
        log('info', 'Log file:');
        log('log', logFile);
        process.exit(1);
      }
    }
  }
};

/**
 * checkErrorMessage is a function that checks if there is an error in the log file
 * @returns {boolean} hasError
 */
const checkErrorMessage = async (logLines: string[]): Promise<boolean> => {
  log(
    'info',
    `Checking log file ${logFileName} on  ${platform} platform for errors...`
  );

  const { results } = await PromisePool.withConcurrency(1)
    .for(logLines)
    .process(async (line) => {
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
        log('error', 'Error found:');
        log('error', line);
        isErrorLine = true;
      }

      // Exceptions are errors that are not really errors
      const exceptions = ['AuthError -'];
      for (const exception of exceptions) {
        if (line.includes(exception)) {
          log('warning', 'Exception found:');
          log('log', line);
          console.warn(line);
          isErrorLine = false;
          break;
        }
      }
      return isErrorLine;
    });

  return results.some((result) => result === true);
};

/**
 * Patterns that indicate the app has successfully loaded and is running
 */
const APP_READY_PATTERNS = [
  'Running "', // React Native CLI: Running "AppName"
  'BUNDLE', // Metro bundler loaded bundle
  'LOG', // App is logging (runtime)
  'Welcome to React', // Default RN app screen
  'Open up App', // Expo default screen text
];

/**
 * waitForAppToRun polls the log file until the app appears to be running
 * @returns {string} the log file content
 */
const waitForAppToRun = async (): Promise<string> => {
  const pollInterval = 15; // seconds between checks
  const maxWaitTime = 300; // max 5 minutes total wait (app needs time to build, install, and run)
  const minWaitTime = 60; // minimum wait time to let app fully initialize

  const startMessages = [
    'info Starting logkitty',
    'React Native iOS Logger started for XCode project',
  ];

  let elapsed = 0;
  let appReadyDetected = false;

  log(
    'info',
    `Waiting for app to run (polling every ${pollInterval}s, max ${maxWaitTime}s, min ${minWaitTime}s)...`
  );

  while (elapsed < maxWaitTime) {
    await sleep(pollInterval);
    elapsed += pollInterval;

    if (!fs.existsSync(logFileName)) {
      log('info', `[${elapsed}s] Log file not found yet...`);
      continue;
    }

    const logFile = fs.readFileSync(logFileName, 'utf-8');
    const logLines = logFile.split('\n').filter((line) => line !== '');

    // Check if we only have the start message (logs not ready yet)
    if (logLines.length === 1) {
      const isOnlyStartMessage = startMessages.some((msg) =>
        logLines[0].includes(msg)
      );
      if (isOnlyStartMessage) {
        log('info', `[${elapsed}s] Only start message found, waiting...`);
        continue;
      }
    }

    // Check if app appears to be running
    const hasAppReadyPattern = APP_READY_PATTERNS.some((pattern) =>
      logFile.includes(pattern)
    );

    if (hasAppReadyPattern && !appReadyDetected) {
      appReadyDetected = true;
      log(
        'info',
        `[${elapsed}s] App appears to be running, waiting for it to stabilize...`
      );
    }

    // Only proceed if we've waited minimum time AND app is ready (or we've timed out)
    if (elapsed >= minWaitTime && (appReadyDetected || logLines.length > 10)) {
      log(
        'success',
        `[${elapsed}s] Found ${logLines.length} log lines, app ready: ${appReadyDetected}, proceeding with check`
      );
      return logFile;
    }

    log(
      'info',
      `[${elapsed}s] Found ${logLines.length} lines, app ready: ${appReadyDetected}, waiting...`
    );
  }

  // Timeout reached, return whatever we have
  log('warning', `Timeout reached after ${maxWaitTime}s`);
  if (fs.existsSync(logFileName)) {
    return fs.readFileSync(logFileName, 'utf-8');
  }
  return '';
};

const checkReactNativeLog = async (): Promise<void> => {
  log('command', `cd mega-apps/${megaAppName}`);
  process.chdir(`mega-apps/${megaAppName}`);

  const logFile = await waitForAppToRun();
  const logLines = logFile.split('\n').filter((line) => line !== '');

  await checkStartMessage(logLines, logFile);

  let hasError = await checkErrorMessage(logLines);

  if (hasError) {
    log('error', `Errors found in log file ${logFileName}`);
    log('info', 'Log file:');
    log('log', logFile);
    process.exit(1);
  } else if (logFile === '') {
    log('error', `Log file ${logFileName} is empty.`);
    log('info', 'Full log:');
    log('log', logFile);
    process.exit(1);
  } else {
    log('info', 'Full log:');
    log('log', logFile);
    log('success', `No errors found in log file ${logFileName}`);

    process.exit(0);
  }
};

checkReactNativeLog();
