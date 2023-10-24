import { init, cleanup, onTestStart, onTestDone } from 'detox/internals';
import { log } from 'detox';
import {
  After,
  AfterAll,
  Before,
  BeforeAll,
  ITestCaseHookParameter,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import * as dotenv from 'dotenv';

type DetoxTestStatus = 'passed' | 'failed';

// maps cucumber test status to Detox onTestDone accepted values
const mapStatus = (message: ITestCaseHookParameter): DetoxTestStatus => {
  switch (message.result?.status) {
    case 'PASSED':
      return 'passed';
    default:
      return 'failed';
  }
};

// Load environment variables
dotenv.config();
// Cucumber has default timeout of 5000, not enough for Detox async operations
// https://wix.github.io/Detox/docs/guide/cucumber-js-integration
// anything lower than 500000 (8min) has caused flakiness in CI, especially for initial bundling
// TODO: review when more powerful mac-os runtimes are available in github workflows
setDefaultTimeout(500000);

BeforeAll(async () => {
  try {
    log.info('INIT');
    await init({ testRunnerArgv: { ...process.env } });
    log.info('POST INIT');
  } catch (error) {
    error.message = `Failed to init detox: ${error.message}`;
    throw error;
  }
});

AfterAll(async () => {
  await cleanup();
});

Before(async (message) => {
  console.log('BEFORE', message.pickle.name);

  const { pickle } = message;
  await onTestStart({
    title: pickle.uri,
    fullName: pickle.name,
    status: 'running',
  });
});

After(async (message) => {
  const { pickle } = message;
  console.log('AFTER', message.result);

  // inform Detox that Cucumber test ended, allows Detox to save logs/screenshots
  await onTestDone({
    title: pickle.name,
    fullName: `${pickle.uri}--${pickle.name}`,
    status: mapStatus(message),
  });
});
