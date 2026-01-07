import { resolveUrlOptions } from '../url';

describe('resolveUrlOptions', () => {
  it('returns default options when no options provided', () => {
    const result = resolveUrlOptions(undefined, 'image');
    expect(result).toEqual({ validateObjectExistence: true, expiresIn: 7200 });
  });

  it('returns merged options when object provided', () => {
    const options = { validateObjectExistence: false };
    const result = resolveUrlOptions(options, 'image');
    expect(result).toEqual({ validateObjectExistence: false, expiresIn: 7200 });
  });

  it('calls function resolver and returns result', () => {
    const resolver = jest.fn().mockReturnValue({ bucket: 'custom-bucket' });
    const result = resolveUrlOptions(resolver, 'video');

    expect(resolver).toHaveBeenCalledWith('video');
    expect(result).toEqual({ bucket: 'custom-bucket' });
  });

  it('returns default when function resolver returns null', () => {
    const resolver = jest.fn().mockReturnValue(null);
    const result = resolveUrlOptions(resolver, 'text');

    expect(result).toEqual({ validateObjectExistence: true, expiresIn: 7200 });
  });

  it('returns default when function resolver returns undefined', () => {
    const resolver = jest.fn().mockReturnValue(undefined);
    const result = resolveUrlOptions(resolver, 'text');

    expect(result).toEqual({ validateObjectExistence: true, expiresIn: 7200 });
  });
});
