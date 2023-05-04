import { Given, Then, When } from '@cucumber/cucumber';
import { by, element, expect } from 'detox';

Given("I'm running the example {string}", async (name: string) => {
  await device.launchApp({
    newInstance: true,
    delete: true,
    launchArgs: {
      EXAMPLE_APP_NAME: name,
    },
  });
});

Given(
  'I intercept {string} with fixture {string}',
  (json: string, fixture: string) => {
    // don't need to do anything
  }
);

Given(
  'I intercept {string} with error fixture {string}',
  (json: string, fixture: string) => {
    // don't need to do anything
  }
);

Given(
  'I mock {string} with fixture {string}',
  (json: string, fixture: string) => {
    // don't need to do anything
  }
);

Given(
  'I mock {string} event with fixture {string}',
  (json: string, fixture: string) => {
    // don't need to do anything
  }
);

Then('I see {string}', async (message: string) => {
  await expect(element(by.text(message))).toBeVisible();
});

Then("I don't see {string}", async (message: string) => {
  await expect(element(by.text(message))).not.toExist();
});

When('I reload the page', async () => {
  await device.reloadReactNative();
});

Then('I see {string} as an input field', async (label: string) => {
  await expect(element(by.text(label))).toBeVisible();
});

Then(
  'I see {string} as an {string} field',
  async (label: string, type: string) => {
    await expect(element(by.text(label))).toBeVisible();
  }
);

Then(
  'I see {string} as a {string} field',
  async (label: string, type: string) => {
    await expect(element(by.text(label))).toExist();
  }
);

Then("I don't see {string} as an input field", async (label: string) => {
  await expect(element(by.text(label))).not.toExist();
});
