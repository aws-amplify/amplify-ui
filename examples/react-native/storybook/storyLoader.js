function loadStories() {
  require('./stories/Authenticator.stories');
  require('./stories/Button.stories');
  require('./stories/Checkbox.stories');
  require('./stories/Divider.stories');
  require('./stories/ErrorMessage.stories');
  require('./stories/FederatedProviderButton.stories');
  require('./stories/Heading.stories');
  require('./stories/Icon.stories');
  require('./stories/Label.stories');
  require('./stories/PasswordField.stories');
  require('./stories/PhoneNumberField.stories');
  require('./stories/Radio.stories');
  require('./stories/RadioGroup.stories');
  require('./stories/Tabs.stories');
  require('./stories/TextField.stories');
}

const stories = [
  './stories/Authenticator.stories',
  './stories/Button.stories',
  './stories/Checkbox.stories',
  './stories/Divider.stories',
  './stories/ErrorMessage.stories',
  './stories/FederatedProviderButton.stories',
  './stories/Heading.stories',
  './stories/Icon.stories',
  './stories/Label.stories',
  './stories/PasswordField.stories',
  './stories/PhoneNumberField.stories',
  './stories/Radio.stories',
  './stories/RadioGroup.stories',
  './stories/Tabs.stories',
  './stories/TextField.stories',
];

module.exports = {
  loadStories,
  stories,
};
