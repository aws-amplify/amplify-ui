const reactConfig = require('../react');

describe('react config', () => {
  it('has the expected configuration', () => {
    expect(reactConfig).toMatchSnapshot();
  });
});
