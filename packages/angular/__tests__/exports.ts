import * as exported from '../projects/ui-angular/src';

describe('exports', () => {
  it('should match the expected snapshot', () => {
    const sortedExports = Object.keys(exported).sort();

    expect(sortedExports).toMatchSnapshot();
  });
});
