function loadStories() {
  // UI Primitives
  require('./stories/Button.stories');
  require('./stories/Checkbox.stories');
  require('./stories/ErrorMessage.stories');
  require('./stories/Heading.stories');
  require('./stories/Icon.stories');
  require('./stories/Label.stories');
  require('./stories/PasswordField.stories');
  require('./stories/Radio.stories');
  require('./stories/RadioGroup.stories');

  require('./stories/Tabs.stories');
  require('./stories/TextField.stories');

  // Authenticator Sub Components
  require('./stories/Authenticator.ConfirmResetPassword.stories');
  require('./stories/Authenticator.ConfirmSignUp.stories');
  require('./stories/Authenticator.ConfirmSignIn.stories');
  require('./stories/Authenticator.ConfirmVerifyUser.stories');
  require('./stories/Authenticator.ForceNewPassword.stories');
  require('./stories/Authenticator.ResetPassword.stories');
  require('./stories/Authenticator.SetupTOTP.stories');
  require('./stories/Authenticator.SignIn.stories');
  require('./stories/Authenticator.SignUp.stories');
  require('./stories/Authenticator.VerifyUser.stories');
}

const stories = [
  // UI Primitives
  './stories/Button.stories',
  './stories/Checkbox.stories',
  './stories/ErrorMessage.stories',
  './stories/Heading.stories',
  './stories/Icon.stories',
  './stories/Label.stories',
  './stories/PasswordField.stories',
  './stories/Radio.stories',
  './stories/RadioGroup.stories',
  './stories/Tabs.stories',
  './stories/TextField.stories',

  // Authenticator Sub Components
  './stories/Authenticator.ConfirmResetPassword.stories',
  './stories/Authenticator.ConfirmSignUp.stories',
  './stories/Authenticator.ConfirmSignIn.stories',
  './stories/Authenticator.ConfirmVerifyUser.stories',
  './stories/Authenticator.ForceNewPassword.stories',
  './stories/Authenticator.ResetPassword.stories',
  './stories/Authenticator.SetupTOTP.stories',
  './stories/Authenticator.SignIn.stories',
  './stories/Authenticator.SignUp.stories',
  './stories/Authenticator.VerifyUser.stories',
];

module.exports = {
  loadStories,
  stories,
};
