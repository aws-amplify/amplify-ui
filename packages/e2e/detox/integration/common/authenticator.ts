import { Then, When } from '@cucumber/cucumber';
import { by, element, expect } from 'detox';

const getUserAlias = (status: string) =>
  `${process.env.USERNAME}+${status === 'UNKNOWN' ? Date.now() : status}`;

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
    let text = '';
    if (loginMechanism === 'email') {
      text = `${getUserAlias(status)}@${process.env.DOMAIN}`;
    } else if (loginMechanism === 'username') {
      text = getUserAlias(status);
    } else if (loginMechanism === 'phone number') {
      text = `${getCountryCode(status)}${process.env.PHONE_NUMBER}`;
    }
    await element(by.id(`authenticator__text-field__input-username`)).typeText(
      text
    );
  }
);

When('I type my password', async () => {
  await element(by.id('authenticator__text-field__input-password')).typeText(
    process.env.VALID_PASSWORD
  );
});

When('I select my country code with status {string}', (status: string) => {
  // do nothing, React-Native phonenumber field does not support country code selection yet
});

Then('I will be redirected to the confirm forgot password page', async () => {
  await expect(element(by.text('New Password')).atIndex(0)).toBeVisible();
});

Then('I type a valid code', async () => {
  await element(by.id('authenticator__text-field__input-container'))
    .atIndex(0)
    .typeText('1234');
});

Then('I type my new password', async () => {
  await element(by.id('authenticator__text-field__input-password')).typeText(
    process.env.VALID_PASSWORD
  );
});

Then('I confirm my password', async () => {
  await element(by.id('authenticator__text-field__input-container'))
    .atIndex(2)
    .typeText(process.env.VALID_PASSWORD);
});
