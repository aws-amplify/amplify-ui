function loadStories() {
  require('./stories/Button.stories');
  require('./stories/Checkbox.stories');
  require('./stories/Heading.stories');
  require('./stories/Icon.stories');
  require('./stories/Label.stories');
  require('./stories/Radio.stories');
  require('./stories/RadioGroup.stories');
}

const stories = [
  './stories/Button.stories',
  './stories/Checkbox.stories',
  './stories/Heading.stories',
  './stories/Icon.stories',
  './stories/Label.stories',
  './stories/Radio.stories',
  './stories/RadioGroup.stories',
];

module.exports = {
  loadStories,
  stories,
};
