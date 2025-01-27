import { LocationPermissions } from '../../../actions';
import { getNavigationParts } from '../getNavigationParts';

describe('getNavigationParts', () => {
  const bucket = 'bucket';
  const prefix = 'prefix';
  const partA = 'a';
  const partB = 'b';
  const path = `${partA}/${partB}/`;
  const locationBase = {
    bucket,
    id: 'id',
    permissions: ['delete', 'get', 'list', 'write'] as LocationPermissions,
    prefix: `${prefix}/`,
  };

  describe('PREFIX type location', () => {
    const location = { ...locationBase, type: 'PREFIX' } as const;

    it('creates a part for the prefix and each subpath', () => {
      // prefix > a > b
      expect(getNavigationParts({ location, path })).toStrictEqual([
        prefix,
        partA,
        partB,
      ]);
    });

    it('does not split the prefix into separate items', () => {
      const prefixWithSlashes = 'prefix/with/slashes';
      // prefix/with/slashes > a > b
      expect(
        getNavigationParts({
          location: {
            ...location,
            prefix: `${prefixWithSlashes}/`,
          },
          path,
        })
      ).toStrictEqual([prefixWithSlashes, partA, partB]);
    });

    it('can include the bucket as part of the prefix', () => {
      // bucket/prefix > a > b
      expect(
        getNavigationParts({ location, path, includeBucketInPrefix: true })
      ).toStrictEqual([`${bucket}/${prefix}`, partA, partB]);
    });
  });

  describe('BUCKET type location', () => {
    const location = { ...locationBase, type: 'BUCKET' } as const;
    it('creates an item for the bucket, prefix and each subpath', () => {
      // bucket > prefix > a > b
      expect(getNavigationParts({ location, path })).toStrictEqual([
        bucket,
        prefix,
        partA,
        partB,
      ]);
    });

    it('does not split the prefix into separate items', () => {
      const prefixWithSlashes = 'prefix/with/slashes';
      // Home > bucket > prefix/with/slashes > a > b
      expect(
        getNavigationParts({
          location: {
            ...location,
            prefix: `${prefixWithSlashes}/`,
          },
          path,
        })
      ).toStrictEqual([bucket, prefixWithSlashes, partA, partB]);
    });
  });
});
