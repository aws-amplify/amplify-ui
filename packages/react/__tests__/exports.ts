import { PrimitiveCatalog } from '@aws-amplify/ui-react/internal';

// Jest doesn't support `exports` maps, so we have to reference `dist` directly.
// See: https://github.com/facebook/jest/issues/9771
import * as exported from '../src';
import * as legacy from '../src/legacy';
import * as internal from '../src/internal';

describe('@aws-amplify/ui-react', () => {
  describe('exports', () => {
    it('should match snapshot', () => {
      const sortedExports = Object.keys(exported).sort();

      expect(sortedExports).toMatchSnapshot();
    });
  });
});

describe('@aws-amplify/ui-react/legacy', () => {
  describe('exports', () => {
    it('should match snapshot', () => {
      const sortedLegacyExports = Object.keys(legacy).sort();

      expect(sortedLegacyExports).toMatchSnapshot();
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

describe('primitive catalog', () => {
  it.each(Object.entries(PrimitiveCatalog))(
    'should contain properties for %s primitive',
    (name, primitive) => {
      expect(Object.keys(primitive.properties).length).toBeGreaterThan(0);
    }
  );

  it('should match primitives list snapshot', () => {
    const sortedPrimitiveCatalogExports = Object.keys(PrimitiveCatalog).sort();

    expect(sortedPrimitiveCatalogExports).toMatchSnapshot();
  });
});
