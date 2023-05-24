import * as notificationExports from '..';

describe('exports', () => {
  it('should match the expected snapshot', () => {
    const sortedExports = Object.keys(notificationExports).sort();

    expect(sortedExports).toMatchSnapshot();
  });
});
