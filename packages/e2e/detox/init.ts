import { init, cleanup, onTestDone } from 'detox/internals';
import {
  After,
  AfterAll,
  BeforeAll,
  ITestCaseHookParameter,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import * as dotenv from 'dotenv';

type DetoxTestStatus = 'passed' | 'failed';

// Load environment variables
dotenv.config();

// Cucumber has default timeout of 5000, not enough for Detox async operations
// https://wix.github.io/Detox/docs/guide/cucumber-js-integration
// anything lower than 400000 (6min) has caused flakiness in CI, especially for initial bundling
// TODO: review when more powerful mac-os runtimes are available in github workflows
setDefaultTimeout(400000);

BeforeAll(async () => {
  await init({
    testRunnerArgv: { ...process.env },
  });
});

AfterAll(async () => {
  await cleanup();
});

After(async (message: ITestCaseHookParameter) => {
  const { pickle } = message;

  // inform Detox that Cucumber test ended, allows Detox to save logs/screenshots
  await onTestDone({
    title: pickle.name,
    fullName: `${pickle.uri}--${pickle.name}`,
    status: mapStatus(message),
  });
});

/** maps cucumber test status to detox onTestDone accepted values */
const mapStatus = (message: ITestCaseHookParameter): DetoxTestStatus => {
  switch (message.result?.status) {
    case 'PASSED':
      return 'passed';
    default:
      return 'failed';
  }
};
