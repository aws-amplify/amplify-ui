function loadStories() {
  require('./stories/Button.stories');
  require('./stories/Checkbox.stories');
  require('./stories/ErrorMessage.stories');
  require('./stories/Heading.stories');
  require('./stories/Icon.stories');
  require('./stories/Label.stories');
  require('./stories/PasswordField.stories');
  require('./stories/PhoneNumberField.stories');
  require('./stories/Radio.stories');
  require('./stories/RadioGroup.stories');
  require('./stories/TextField.stories');
}

const stories = [
  './stories/Buttons.stories',
  './stories/Checkbox.stories',
  './stories/ErrorMessage.stories',
  './stories/Heading.stories',
  './stories/Icon.stories',
  './stories/Label.stories',
  './stories/PasswordField.stories',
  './stories/PhoneNumberField.stories',
  './stories/Radio.stories',
  './stories/RadioGroup.stories',
  './stories/TextField.stories',
];

module.exports = {
  loadStories,
  stories,
};
