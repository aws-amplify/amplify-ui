function loadStories() {
  require('./stories/Button.stories');
  require('./stories/Checkbox.stories');
  require('./stories/Heading.stories');
  require('./stories/Icon.stories');
  require('./stories/Label.stories');
}

const stories = [
  './stories/Button.stories',
  './stories/Checkbox.stories',
  './stories/Heading.stories',
  './stories/Icon.stories',
  './stories/Label.stories',
];

module.exports = {
  loadStories,
  stories,
};
