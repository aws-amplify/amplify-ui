import { displayTextEn } from '..';

describe('displayTextEn', () => {
  it('contains the expected functions and values', () => {
    const {
      getChallengeText,
      getCopyButtonText,
      getDescriptionText,
      getProviderButtonText,
      getResetPasswordLinkText,
      getSecondaryButtonText,
      getSignInLinkText,
      getSignUpLinkText,
      getPrimaryButtonText,
      getTitleText,
      providersDividerText,
    } = displayTextEn;

    expect(getChallengeText('CUSTOM_CHALLENGE')).toMatchSnapshot();
    expect(getCopyButtonText(true)).toMatchSnapshot();
    expect(getCopyButtonText(false)).toMatchSnapshot();
    expect(getDescriptionText('confirmResetPassword')).toMatchSnapshot();
    expect(getProviderButtonText('Fake Provider')).toMatchSnapshot();
    expect(getResetPasswordLinkText('resetPassword')).toMatchSnapshot();
    expect(getSecondaryButtonText('confirmResetPassword')).toMatchSnapshot();
    expect(getSignInLinkText('resetPassword')).toMatchSnapshot();
    expect(getSignUpLinkText('resetPassword')).toMatchSnapshot();
    expect(getPrimaryButtonText('confirmResetPassword')).toMatchSnapshot();
    expect(getTitleText('confirmResetPassword')).toMatchSnapshot();
    expect(providersDividerText).toMatchSnapshot();
  });
});
