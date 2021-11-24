import { getItemsAtPage, getPageCount, itemHasText } from '../utils';

describe('getItemsAtPage', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  it('should return expected items', () => {
    expect(getItemsAtPage(items, 2, 3)).toStrictEqual([4, 5, 6]);
    expect(getItemsAtPage(items, 5, 1)).toStrictEqual([5]);
    expect(getItemsAtPage(items, 3, 3)).toStrictEqual([7, 8, 9]);
  });

  it('should return no items if page is lower than 1 ', () => {
    expect(getItemsAtPage(items, 0, 3)).toHaveLength(0);
    expect(getItemsAtPage(items, -3, 3)).toHaveLength(0);
    expect(getItemsAtPage(items, -10, 3)).toHaveLength(0);
  });

  it('should return no items if page is greater than available pages', () => {
    expect(getItemsAtPage(items, 5, 3)).toHaveLength(0);
    expect(getItemsAtPage(items, 10, 3)).toHaveLength(0);
    expect(getItemsAtPage(items, 30, 3)).toHaveLength(0);
  });
});

describe('itemsHasText', () => {
  it("should return false if item doesn't match provided text", () => {
    const result = itemHasText('hello world', 'not found');
    expect(result).toBe(false);
  });

  it('should return true if item matches provided text', () => {
    const result = itemHasText('hello world', 'o wo');
    expect(result).toBe(true);
  });

  it('should return true if any of item properties matches provided text', () => {
    const obj = {
      very: {
        nested: {
          property: 'this is a secret',
        },
      },
    };

    const result = itemHasText(obj, 'secret');
    expect(result).toBe(true);
  });

  it('should return false if no item properties matches provided text', () => {
    const obj = {
      very: {
        nested: {
          property: 'this is a secret',
        },
      },
    };

    const result = itemHasText(obj, 'not found');
    expect(result).toBe(false);
  });
});

describe('getPageCount', () => {
  it('should return available page count', () => {
    // Exact match
    expect(getPageCount(100, 20)).toBe(5);
    expect(getPageCount(3, 1)).toBe(3);

    // Rounded match (Math.ceil)
    expect(getPageCount(100, 15)).toBe(7);
    expect(getPageCount(100, 12)).toBe(9);
    expect(getPageCount(3, 2)).toBe(2);
    expect(getPageCount(1, 30)).toBe(1);
  });
});
