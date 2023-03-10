const jestConfig = require('../react');

describe('jest config', () => {
  it('has the expected configuration', () => {
    expect(jestConfig).toMatchSnapshot();
  });
});
