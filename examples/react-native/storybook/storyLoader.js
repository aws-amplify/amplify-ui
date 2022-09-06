function loadStories() {
  require('./stories/Button.stories');
  require('./stories/Label.stories');
}

const stories = ['./stories/Button.stories', './stories/Label.stories'];

module.exports = {
  loadStories,
  stories,
};
