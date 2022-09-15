function loadStories() {
  require('./stories/Button.stories');
  require('./stories/Heading.stories');
}

const stories = ['./stories/Button.stories', './stories/Heading.stories'];

module.exports = {
  loadStories,
  stories,
};
