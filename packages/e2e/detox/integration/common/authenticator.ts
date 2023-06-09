import { Then, When } from '@cucumber/cucumber';
import { by, element, expect } from 'detox';

import { capitalize } from '@aws-amplify/ui';
import { typeInInputField } from './shared';

const AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX =
  'authenticator__text-field__input';

const getUserAlias = (status: string) =>
  `${process.env.USERNAME}+${
    status === 'UNKNOWN' ? status + Date.now() : status
  }`;

const getCountryCode = (status: string) => {
  switch (status) {
    case 'CONFIRMED':
      return '+1';
    case 'UNCONFIRMED':
      return '+7';
    case 'UNKNOWN':
      return '+20';
    case 'FORCE_CHANGE_PASSWORD':
      return '+30';
    default:
      return '';
  }
};

When(
  'I type my {string} with status {string}',
  async (loginMechanism: string, status: string) => {
    let text = '',
      usernameAttribute = capitalize(loginMechanism),
      testIdSuffix = loginMechanism;
    if (loginMechanism === 'email') {
      text = `${getUserAlias(status)}@${process.env.DOMAIN}`;
    } else if (loginMechanism === 'username') {
      text = getUserAlias(status);
    } else if (loginMechanism === 'phone number') {
      text = `${getCountryCode(status)}${process.env.PHONE_NUMBER}`;
      usernameAttribute = 'Phone Number';
      testIdSuffix = 'phone-number';
    }

    try {
      // try to retrieve element by testID first
      await typeInInputField(
        by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-${testIdSuffix}`),
        text
      );
    } catch (e) {
      // for some custom fields the test id doesn't match the login mechanism
      const nativeInputType =
        device.getPlatform() === 'ios'
          ? 'UITextField'
          : 'android.widget.EditText';
      // match by text field label instead
      await typeInInputField(
        by
          .type(nativeInputType)
          .withAncestor(
            by
              .id('amplify__text-field-container')
              .withDescendant(by.text(usernameAttribute))
          ),
        text
      );
    }
  }
);

When(
  'I type a new {string} with value {string}',
  async (field: string, text: string) => {
    await typeInInputField(
      by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-${field}`),
      text
    );
  }
);

When('I type my password', async () => {
  await typeInInputField(
    by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-password`),
    process.env.VALID_PASSWORD
  );
});

Then('I slowly type an invalid wrong complexity new password', async () => {
  await element(
    by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-password`)
  ).typeText('inv');
});

When('I type an invalid wrong complexity password', async () => {
  await typeInInputField(
    by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-password`),
    'inv'
  );
});

When('I type an invalid wrong complexity new password', async () => {
  await typeInInputField(
    by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-password`),
    'inv'
  );
});

When('I type an invalid no lower case password', async () => {
  await typeInInputField(
    by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-password`),
    'INV'
  );
});

When('I type an invalid no lower case new password', async () => {
  await typeInInputField(
    by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-password`),
    'INV'
  );
});

When('I type a new {string}', async (field: string) => {
  await typeInInputField(
    by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-${field}`),
    `${Date.now()}`
  );
});

When('I select my country code with status {string}', (status: string) => {
  // do nothing, React-Native phone number field does not support country code selection yet
});

Then('I will be redirected to the confirm forgot password page', async () => {
  await expect(element(by.text('New Password')).atIndex(0)).toBeVisible();
});

Then('I type a valid code', async () => {
  await typeInInputField(
    by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-confirmation_code`),
    '1234'
  );
});

Then('I type a valid confirmation code', async () => {
  await typeInInputField(
    by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-confirmation_code`),
    '123456'
  );
});

Then('I type an invalid confirmation code', async () => {
  await typeInInputField(
    by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-confirmation_code`),
    '0000'
  );
});

Then('I type my new password', async () => {
  await typeInInputField(
    by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-password`),
    process.env.VALID_PASSWORD
  );
});

Then('I confirm my password', async () => {
  await typeInInputField(
    by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-confirm_password`),
    process.env.VALID_PASSWORD
  );
});

When('I click the {string} button', async (name: string) => {
  if (name === 'Create Account') {
    // Create Account tab and button have the same text
    await element(by.text(name)).atIndex(1).tap();
  } else {
    await element(by.text(name)).tap();
  }
});

When('I click the {string} radio button', async (label: string) => {
  await element(by.id('amplify__radio-button__container')).tap();
});

Then(
  'I confirm {string} error is accessible in password field',
  async (label: string) => {
    await expect(element(by.label(label))).toBeVisible();
  }
);

Then(
  'I confirm {string} error is accessible in new password field',
  async (label: string) => {
    await expect(element(by.label(label))).toBeVisible();
  }
);
