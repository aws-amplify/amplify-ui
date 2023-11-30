import { by, element, expect } from 'detox';

const AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX =
  'authenticator__text-field__input';

const getUserAlias = (status: string) =>
  `${process.env.USERNAME}+${
    status === 'UNKNOWN' ? status + Date.now() : status
  }`;

describe('Sign in with email', () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
      launchArgs: {
        EXAMPLE_APP_NAME: '/ui/components/authenticator/sign-in-with-email',
      },
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show error when signing in with unknown credentials', async () => {
    await expect(element(by.text('Sign In'))).toBeVisible();
    await element(by.id('authenticator__text-field__input-username')).typeText(
      `${getUserAlias('UNKNOWN')}@${process.env.DOMAIN}`
    );
    await element(by.id('authenticator__text-field__input-password')).typeText(
      process.env.VALID_PASSWORD
    );

    await element(by.text('Sign in')).tap();
    await expect(element(by.text('User does not exist.'))).toBeVisible();
  });

  it('should redirect if signing in with unconfirmed credentials', async () => {
    await expect(element(by.text('Sign In'))).toBeVisible();
    await element(
      by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-username`)
    ).typeText(`${getUserAlias('UNCONFIRMED')}@${process.env.DOMAIN}`);
    await element(
      by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-password`)
    ).typeText(process.env.VALID_PASSWORD);

    await element(by.text('Sign in')).tap();
    await expect(element(by.text('We Emailed You'))).toBeVisible();
    await expect(element(by.text('Confirmation Code'))).toBeVisible();

    await element(
      by.id(`${AUTHENTICATOR_TEXT_FIELD_TEST_ID_PREFIX}-confirmation_code`)
    ).typeText('123456');
    await element(by.text('Confirm')).tap();
  });

  it('should sign in with confirmed credentials', async () => {
    await expect(element(by.text('Sign In'))).toBeVisible();
    await element(by.id('authenticator__text-field__input-username')).typeText(
      `${getUserAlias('CONFIRMED')}@${process.env.DOMAIN}`
    );
    await element(by.id('authenticator__text-field__input-password')).typeText(
      process.env.VALID_PASSWORD
    );

    await element(by.text('Sign in')).tap();
    await expect(element(by.text('Sign out'))).toBeVisible();
    await element(by.text('Sign out')).tap();
    await expect(element(by.text('Sign In'))).toBeVisible();
  });
});
