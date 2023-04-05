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

When('I click the {string} button', async (name: string) => {
  await element(by.text(name)).tap();
});

Then('I see {string}', async (message: string) => {
  await expect(element(by.text(message))).toBeVisible();
});

Then("I don't see {string}", async (message: string) => {
  await expect(element(by.text(message))).not.toBeVisible();
});

When('I reload the page', () => {
  device.reloadReactNative();
});
