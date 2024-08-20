import { PrimitiveCatalog } from '@aws-amplify/ui-react/internal';

import * as exported from '../src';
import * as internal from '../src/internal';
import * as server from '../src/server';

describe('@aws-amplify/ui-react', () => {
  describe('exports', () => {
    it('should match snapshot', () => {
      const sortedExports = Object.keys(exported).sort();

      expect(sortedExports).toMatchSnapshot();
    });
  });
});

describe('@aws-amplify/ui-react/internal', () => {
  describe('exports', () => {
    it('should match snapshot', () => {
      const sortedInternalExports = Object.keys(internal).sort();

      expect(sortedInternalExports).toMatchSnapshot();
    });
  });
});

describe('@aws-amplify/ui-react/server', () => {
  describe('exports', () => {
    it('should match snapshot', () => {
      const sortedServerExports = Object.keys(server).sort();

      expect(sortedServerExports).toMatchSnapshot();
    });
  });
});

describe('primitive catalog', () => {
  it('should match primitives catalog snapshot', () => {
    expect(PrimitiveCatalog).toMatchSnapshot();
  });
});
