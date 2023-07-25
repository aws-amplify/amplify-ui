import fs from 'fs';
import { Command } from 'commander';
import { PromisePool } from '@supercharge/promise-pool';

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
  log('info', `Checking log file ${logFileName} for errors...`);

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

const checkReactNativeLog = async (): Promise<void> => {
  log('command', `cd mega-apps/${megaAppName}`);
  process.chdir(`mega-apps/${megaAppName}`);

  // Wait for the logging messages to be ready. The number is based on real experiments in Github Actions.
  let timeToWait = platform === 'android' ? 200 : 300;

  log('info', `Sleep for '${timeToWait}' seconds...`);
  await sleep(timeToWait);

  const logFile = fs.readFileSync(logFileName, 'utf-8');
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
