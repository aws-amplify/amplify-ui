const baseConfig = require('..');

describe('base config', () => {
  it('has the expected configuration', () => {
    expect(baseConfig).toMatchSnapshot();
  });
});
