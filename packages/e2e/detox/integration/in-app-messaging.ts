import { Then, When } from '@cucumber/cucumber';
import { by, element, expect } from 'detox';

// timeout for the banner to display, to prevent flaky tests
const POPUP_DISPLAY_TIMEOUT = 5000;

Then('{string} checkbox is checked', async (checkboxName: string) => {
  await expect(element(by.label(checkboxName))).toBeVisible();
});

Then(
  '{string} layout radio option is selected',
  async (radioButtonName: string) => {
    await expect(element(by.label(radioButtonName))).toBeVisible();
  }
);

Then('I see a {string} banner dialog', async (type: string) => {
  await waitFor(element(by.id(`inappmessaging-${type}banner-dialog`)))
    .toExist()
    .withTimeout(POPUP_DISPLAY_TIMEOUT);
  await expect(
    element(by.id(`inappmessaging-${type}banner-dialog`))
  ).toBeVisible();
  await expect(element(by.id('in-app-messaging--body'))).toBeVisible();
});

Then('I see a {string} dialog', async (type: string) => {
  await waitFor(element(by.id(`inappmessaging-${type}-dialog`)))
    .toExist()
    .withTimeout(POPUP_DISPLAY_TIMEOUT);
  await expect(element(by.id(`inappmessaging-${type}-dialog`))).toBeVisible();
});

Then('the banner has {int} buttons', async (buttonCount: number) => {
  if (buttonCount === 0) {
    await expect(
      element(by.id('in-app-messaging--primary-button'))
    ).not.toBeVisible();
  } else {
    await expect(
      element(by.id('in-app-messaging--primary-button'))
    ).toBeVisible();
    if (buttonCount === 2) {
      await expect(
        element(by.id('in-app-messaging--secondary-button'))
      ).toBeVisible();
    }
  }
});

Then('I dismiss the banner', async () => {
  await element(by.id('in-app-messaging--close-button')).tap();
});

Then('I do not see the banner', async () => {
  await expect(element(by.id('in-app-messaging--body'))).not.toBeVisible();
});

When('I toggle {string} checkbox', async (checkboxName: string) => {
  await element(by.text(checkboxName)).tap();
});

When(
  'I click the {string} layout radio option',
  async (radioButtonName: string) => {
    await element(by.text(radioButtonName)).tap();
  }
);

Then('the banner has an image', async () => {
  await expect(element(by.id('in-app-messaging--image'))).toBeVisible();
});
