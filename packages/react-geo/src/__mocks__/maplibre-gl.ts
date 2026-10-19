/**
 * maplibre-gl@6 is ESM-only (`.mjs`, no `require` export), which the
 * CommonJS-based Jest setup cannot load. Tests do not exercise maplibre-gl
 * rendering, so map the module to this minimal mock.
 */
export const Map = jest.fn();

export class Marker {
  addTo = jest.fn(() => this);
  remove = jest.fn(() => this);
  setLngLat = jest.fn(() => this);
}

export class Popup {
  addTo = jest.fn(() => this);
  remove = jest.fn(() => this);
  setHTML = jest.fn(() => this);
  setLngLat = jest.fn(() => this);
}
