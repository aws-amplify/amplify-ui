import { searchItems } from '../searchItems';

interface Item {
  key: string;
}

describe('Search', () => {
  beforeAll(() => {
    let uuid = 0;
    Object.defineProperty(globalThis, 'crypto', {
      value: {
        randomUUID: () => {
          uuid++;
          return uuid.toString();
        },
      },
    });
  });

  it('should handle empty lists', () => {
    const result = searchItems({
      prefix: '',
      items: [],
      options: { query: 'test', filterBy: 'path', groupBy: '/' },
    });

    expect(result).toEqual([]);
  });

  it('should return all items matching the prefix when the query is empty', () => {
    const items: Item[] = [
      { key: 'folder/file1.txt' },
      { key: 'folder/file2.txt' },
    ];

    const result = searchItems({
      prefix: 'folder/',
      items,
      options: { query: '', filterBy: 'key', groupBy: '/' },
    });

    expect(result).toEqual([
      { id: expect.any(String), key: 'folder/file1.txt', type: 'FILE' },
      { id: expect.any(String), key: 'folder/file2.txt', type: 'FILE' },
    ]);
  });

  it('should return an empty array when no items match the query', () => {
    const items: Item[] = [
      { key: '/folder/file1.txt' },
      { key: '/folder/file2.txt' },
    ];

    const result = searchItems({
      prefix: '/folder',
      items,
      options: { query: 'nonexistent', filterBy: 'key', groupBy: '/' },
    });

    expect(result).toEqual([]);
  });

  describe('group by', () => {
    it('should handle root level objects', () => {
      const items: Item[] = [
        { key: 'photo1.jpg' },
        { key: 'photos/' },
        { key: 'pic.jpg' },
      ];

      const output = searchItems({
        items,
        prefix: '',
        options: { filterBy: 'key', groupBy: '/', query: 'photo' },
      });

      expect(output).toEqual([
        { id: expect.any(String), key: 'photo1.jpg', type: 'FILE' },
        { id: expect.any(String), key: 'photos/', type: 'FOLDER' },
      ]);
    });

    it('should handle single level structures', () => {
      const items: Item[] = [
        { key: 'collections/photo1.jpg' },
        { key: 'collections/photo2.jpg' },
      ];

      const output = searchItems({
        items,
        prefix: 'collections/',
        options: { filterBy: 'key', groupBy: '/', query: 'photo' },
      });

      expect(output).toEqual([
        { id: expect.any(String), key: 'collections/photo1.jpg', type: 'FILE' },
        { id: expect.any(String), key: 'collections/photo2.jpg', type: 'FILE' },
      ]);
    });

    it('should handle multi level structures', () => {
      const items: Item[] = [
        { key: 'collections/photos/beach.jpg' },
        { key: 'collections/photos/pic.jpg' },
        { key: 'collections/photos/hawaii/beaches/beach.jpg' },
      ];

      const output = searchItems({
        items,
        prefix: 'collections/',
        options: { filterBy: 'key', groupBy: '/', query: 'beach' },
      });

      expect(output).toEqual([
        {
          id: expect.any(String),
          key: 'collections/photos/beach.jpg',
          type: 'FILE',
        },
        {
          id: expect.any(String),
          key: 'collections/photos/hawaii/beaches/',
          type: 'FOLDER',
        },
        {
          id: expect.any(String),
          key: 'collections/photos/hawaii/beaches/beach.jpg',
          type: 'FILE',
        },
      ]);
    });

    it('de-dupes paths', () => {
      const items: Item[] = [
        { key: 'collections/photos/beach.jpg' },
        { key: 'collections/photos/pic.jpg' },
        { key: 'collections/photos/hawaii/beaches/beach.jpg' },
      ];

      const output = searchItems({
        items,
        prefix: 'collections/',
        options: { filterBy: 'key', groupBy: '/', query: 'photos' },
      });

      expect(output).toEqual([
        { id: expect.any(String), key: 'collections/photos/', type: 'FOLDER' },
      ]);
    });

    it('handles complex group-by delimiters', () => {
      const items: Item[] = [
        { key: 'collections<.>photos<.>beach.jpg' },
        { key: 'collections<.>photos<.>pic.jpg' },
        { key: 'collections<.>beaches<.>beach<.>' },
      ];

      const output = searchItems({
        items,
        prefix: 'collections/',
        options: { filterBy: 'key', groupBy: '<.>', query: 'beach' },
      });

      expect(output).toEqual([
        {
          id: expect.any(String),
          key: 'collections<.>photos<.>beach.jpg',
          type: 'FILE',
        },
        {
          id: expect.any(String),
          key: 'collections<.>beaches<.>',
          type: 'FOLDER',
        },
        {
          id: expect.any(String),
          key: 'collections<.>beaches<.>beach<.>',
          type: 'FOLDER',
        },
      ]);
    });

    it('should only match paths ahead of prefix', () => {
      const items: Item[] = [
        { key: 'photos/album/random-photos/photo1.jpg' },
        { key: 'photos/album/cats/pic.jpg' },
      ];

      const output = searchItems({
        items,
        prefix: 'photos/album/',
        options: { filterBy: 'key', groupBy: '/', query: 'photo' },
      });

      expect(output).toEqual([
        {
          id: expect.any(String),
          key: 'photos/album/random-photos/',
          type: 'FOLDER',
        },
        {
          id: expect.any(String),
          key: 'photos/album/random-photos/photo1.jpg',
          type: 'FILE',
        },
      ]);
    });

    it('should handle consecutive delimiters', () => {
      const items: Item[] = [
        { key: 'collections////photo1.jpg' },
        { key: 'collections/photos///' },
        { key: 'collections//animals//' },
      ];

      const output = searchItems({
        items,
        prefix: 'collections/',
        options: { filterBy: 'key', groupBy: '/', query: 'photo' },
      });

      expect(output).toEqual([
        {
          id: expect.any(String),
          key: 'collections////photo1.jpg',
          type: 'FILE',
        },
        { id: expect.any(String), key: 'collections/photos/', type: 'FOLDER' },
      ]);
    });

    it('should handle special characters', () => {
      const items: Item[] = [
        { key: 'collections/special!@#$/photo1.jpg' },
        { key: 'collections/ photo folder with spaces /' },
        { key: 'collections/ wildlife\x00photos.jpg ' },
        { key: 'collections/nomatch' },
      ];

      const output = searchItems({
        items,
        prefix: 'collections/',
        options: { filterBy: 'key', groupBy: '/', query: 'photo' },
      });

      expect(output).toEqual([
        {
          id: expect.any(String),
          key: 'collections/special!@#$/photo1.jpg',
          type: 'FILE',
        },
        {
          id: expect.any(String),
          key: 'collections/ photo folder with spaces /',
          type: 'FOLDER',
        },
        {
          id: expect.any(String),
          key: 'collections/ wildlife\x00photos.jpg ',
          type: 'FILE',
        },
      ]);
    });

    it('should be case insensitive', () => {
      const items: Item[] = [
        { key: 'collections/seattle/Cafè.jpg' },
        { key: 'collections/ Ca\uFB00e\x01photos.jpg ' },
        { key: 'collections/album/CaFe/' },
        { key: 'collections/album/random/cafe-vita.png' },
        { key: 'collections/album/random/pic.jpg' },
      ];

      const output = searchItems({
        items,
        prefix: 'collections/',
        options: { filterBy: 'key', groupBy: '/', query: 'càf' },
      });

      expect(output).toEqual([
        {
          id: expect.any(String),
          key: 'collections/seattle/Cafè.jpg',
          type: 'FILE',
        },
        {
          id: expect.any(String),
          key: 'collections/ Ca\uFB00e\x01photos.jpg ',
          type: 'FILE',
        },
        {
          id: expect.any(String),
          key: 'collections/album/CaFe/',
          type: 'FOLDER',
        },
        {
          id: expect.any(String),
          key: 'collections/album/random/cafe-vita.png',
          type: 'FILE',
        },
      ]);
    });
    it('ignores diacritics', () => {
      const items: Item[] = [
        { key: 'collections/São Paulo/' },
        { key: 'collections/random/Sãopaulino.jpg' },
        { key: 'collections/random/photos.jpg ' },
      ];

      const output = searchItems({
        items,
        prefix: 'collections/',
        options: { filterBy: 'key', groupBy: '/', query: 'sao' },
      });

      expect(output).toEqual([
        {
          id: expect.any(String),
          key: 'collections/São Paulo/',
          type: 'FOLDER',
        },
        {
          id: expect.any(String),
          key: 'collections/random/Sãopaulino.jpg',
          type: 'FILE',
        },
      ]);
    });
  });
});
