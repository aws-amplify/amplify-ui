describe('lazy module loaders', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.dontMock('maplibre-gl');
    jest.dontMock('maplibre-gl-js-amplify');
  });

  it('memoizes the maplibre-gl import across calls', async () => {
    const { loadMaplibre } = await import('../utils');

    const first = loadMaplibre();
    const second = loadMaplibre();

    expect(second).toBe(first);
    expect(await first).toHaveProperty('Map');
  });

  it('memoizes the maplibre-gl-js-amplify import across calls', async () => {
    jest.doMock('maplibre-gl-js-amplify', () => ({
      createAmplifyGeocoder: jest.fn(),
    }));
    const { loadMaplibreGlJsAmplify } = await import('../utils');

    const first = loadMaplibreGlJsAmplify();
    const second = loadMaplibreGlJsAmplify();

    expect(second).toBe(first);
    expect(await first).toHaveProperty('createAmplifyGeocoder');
  });

  it('clears the maplibre-gl cache after a failed import so a later call can retry', async () => {
    let attempts = 0;
    jest.doMock('maplibre-gl', () => {
      attempts += 1;
      if (attempts === 1) {
        throw new Error('ChunkLoadError');
      }
      return { Map: jest.fn() };
    });
    const { loadMaplibre } = await import('../utils');

    await expect(loadMaplibre()).rejects.toThrow('ChunkLoadError');

    const retry = loadMaplibre();
    await expect(retry).resolves.toHaveProperty('Map');
    expect(loadMaplibre()).toBe(retry);
    expect(attempts).toBe(2);
  });

  it('clears the maplibre-gl-js-amplify cache after a failed import so a later call can retry', async () => {
    let attempts = 0;
    jest.doMock('maplibre-gl-js-amplify', () => {
      attempts += 1;
      if (attempts === 1) {
        throw new Error('ChunkLoadError');
      }
      return { createAmplifyGeocoder: jest.fn() };
    });
    const { loadMaplibreGlJsAmplify } = await import('../utils');

    await expect(loadMaplibreGlJsAmplify()).rejects.toThrow('ChunkLoadError');

    const retry = loadMaplibreGlJsAmplify();
    await expect(retry).resolves.toHaveProperty('createAmplifyGeocoder');
    expect(loadMaplibreGlJsAmplify()).toBe(retry);
    expect(attempts).toBe(2);
  });
});
