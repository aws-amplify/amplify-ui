function loadStories() {
  require('./stories/Button.stories');
  require('./stories/Heading.stories');
  require('./stories/Label.stories');
  require('./stories/Radio.stories');
}

const stories = [
  './stories/Button.stories',
  './stories/Heading.stories',
  './stories/Label.stories',
  './stories/Radio.stories',
];

module.exports = {
  loadStories,
  stories,
};
