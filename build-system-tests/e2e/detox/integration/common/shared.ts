import { Given, Then, When } from '@cucumber/cucumber';
import { by, element, expect } from 'detox';

/**
 * Use this util for replacing text instead of typing into input fields for faster test run duration
 * Note: validations trigger after text was replaced, if you need to mimic user behavior use typeText instead
 *
 * @param inputFieldMatcher
 * @param text
 */
export const typeInInputField = async (
  inputFieldMatcher: Detox.NativeMatcher,
  text: string
) => {
  const inputField = element(inputFieldMatcher);
  // replaceText is much faster than typeText
  // downside: doesn't trigger text input callbacks (such as validations) so we need to tap return key
  await inputField.replaceText(text);
  await inputField.tapReturnKey();
};

Given("I'm running the example {string}", async (name: string) => {
  try {
    await device.launchApp({
      newInstance: true,
      launchArgs: {
        EXAMPLE_APP_NAME: name,
      },
    });
  } catch (error) {
    error.message = `Failed to launch app with error: ${error.message}`;
    throw error;
  }
});

Given(
  'I intercept {string} with fixture {string}',
  (json: string, fixture: string) => {
    // don't need to do anything
  }
);

Then('I see {string}', async (message: string) => {
  await expect(element(by.text(message))).toBeVisible();
});
