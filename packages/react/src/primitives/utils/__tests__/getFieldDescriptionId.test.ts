import { getFieldDescriptionId } from '../getFieldDescriptionId';

describe('getFieldDescriptionId', () => {
  it('should return the concatenated string when descriptiveText is provided and descriptionId is not empty', () => {
    const descriptionId = 'testId';
    const descriptiveText = 'Some description';
    const result = getFieldDescriptionId(descriptionId, descriptiveText);
    expect(result).toBe('testId-description');
  });

  it('should return undefined when descriptiveText is not provided', () => {
    const descriptionId = 'testId';
    const result = getFieldDescriptionId(descriptionId);
    expect(result).toBeUndefined();
  });

  it('should return undefined when descriptionId is empty', () => {
    const descriptionId = '';
    const descriptiveText = 'Some description';
    const result = getFieldDescriptionId(descriptionId, descriptiveText);
    expect(result).toBeUndefined();
  });

  it('should return undefined when both descriptionId and descriptiveText are not provided', () => {
    const result = getFieldDescriptionId('');
    expect(result).toBeUndefined();
  });

  it('should return undefined when descriptionId is provided but descriptiveText is undefined', () => {
    const descriptionId = 'testId';
    const descriptiveText = undefined;
    const result = getFieldDescriptionId(descriptionId, descriptiveText);
    expect(result).toBeUndefined();
  });

  it('should return undefined when descriptionId is provided but descriptiveText is null', () => {
    const descriptionId = 'testId';
    const descriptiveText = null;
    const result = getFieldDescriptionId(descriptionId, descriptiveText);
    expect(result).toBeUndefined();
  });

  it('should return undefined when descriptionId is provided but descriptiveText is an empty string', () => {
    const descriptionId = 'testId';
    const descriptiveText = '';
    const result = getFieldDescriptionId(descriptionId, descriptiveText);
    expect(result).toBeUndefined();
  });
});
