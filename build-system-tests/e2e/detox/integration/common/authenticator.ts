import { Then, When } from '@cucumber/cucumber';
import { by } from 'detox';

import { capitalize } from '@aws-amplify/ui';
import { typeInInputField } from './shared';

const AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX =
  'authenticator__text-field__input';

const getUserAlias = (status: string) =>
  `${process.env.USERNAME}+${
    status === 'UNKNOWN' ? status + Date.now() : status
  }`;

const getInputByLoginMechanism = (loginMechanism: string) => {
  if (loginMechanism === 'email') {
    return `${process.env.USERNAME}+${Date.now()}@${process.env.DOMAIN}`;
  } else if (loginMechanism === 'username') {
    return `${process.env.USERNAME}+${Date.now()}`;
  } else if (loginMechanism === 'phone number') {
    return `+1${process.env.PHONE_NUMBER}`;
  }
};

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

When('I type my password', async () => {
  await typeInInputField(
    by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-password`),
    process.env.VALID_PASSWORD
  );
});

When('I type a new {string}', async (field: string) => {
  await typeInInputField(
    by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-${field}`),
    getInputByLoginMechanism(field)
  );
});

Then('I confirm my password', async () => {
  await typeInInputField(
    by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-confirm_password`),
    process.env.VALID_PASSWORD
  );
});
