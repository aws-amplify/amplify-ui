import { getOverrideProps } from '../getOverrideProps';

describe('getOverrideProps', () => {
  const overrides = {
    View: {
      width: '436px',
      padding: '0px 0px 0px 0px',
      backgroundColor: 'rgba(50.36245197057724,0,251.81250303983688,1)',
      overflow: 'hidden',
      position: 'relative',
      height: '98px',
    },
    'View.Text[0]': {
      fontSize: '12px',
      color: 'red',
    },
  };

  it('returns the correct overrides when path matches', () => {
    const result = getOverrideProps(overrides, 'View');
    expect(result).toEqual({
      width: '436px',
      padding: '0px 0px 0px 0px',
      backgroundColor: 'rgba(50.36245197057724,0,251.81250303983688,1)',
      overflow: 'hidden',
      position: 'relative',
      height: '98px',
    });
  });

  it('returns the correct overrides when path matches complex', () => {
    const result = getOverrideProps(overrides, 'View.Text[0]');
    expect(result).toEqual({
      fontSize: '12px',
      color: 'red',
    });
  });

  it('returns an empty object when nothing matches', () => {
    const result = getOverrideProps(overrides, 'Flex');
    expect(result).toEqual({});
  });
});
