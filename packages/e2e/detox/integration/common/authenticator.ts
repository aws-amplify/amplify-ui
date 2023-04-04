import { When } from '@cucumber/cucumber';
import { by, element } from 'detox';

const getUserAlias = (status: string) =>
  `${process.env.USERNAME}+${status === 'UNKNOWN' ? Date.now() : status}`;

When(
  'I type my {string} with status {string}',
  async (loginMechanism: string, status: string) => {
    let text = '';
    if (loginMechanism === 'email') {
      text = `${getUserAlias(status)}@${process.env.DOMAIN}`;
    } else if (loginMechanism === 'username') {
      text = getUserAlias(status);
    } else if (loginMechanism === 'phone number') {
      text = process.env.PHONE_NUMBER;
    }
    await element(by.id('amplify__text-field__input-container'))
      .atIndex(0)
      .typeText(text);
  }
);

When('I type my password', async () => {
  await element(by.id('amplify__text-field__input-container'))
    .atIndex(1)
    .typeText(process.env.VALID_PASSWORD);
});

When('I select my country code with status {string}', (status: string) => {
  // do nothing, React-Native phonenumber field does not support country code selection yet
});
