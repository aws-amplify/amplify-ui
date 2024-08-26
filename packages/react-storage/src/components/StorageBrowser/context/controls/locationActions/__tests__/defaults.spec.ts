import { ACTIONS_DEFAULT, OPTIONS_DEFAULT } from '../defaults';
import { LocationActionOptions } from '../types';

describe('default actions', () => {
  it('contains the expected properties', () => {
    expect(ACTIONS_DEFAULT).toMatchSnapshot();
  });

  it('has the expected behavior for the values of default options', () => {
    const disable = OPTIONS_DEFAULT?.disable as Exclude<
      LocationActionOptions['disable'],
      undefined | boolean
    >;

    expect(typeof disable).toBe('function');
    expect(disable([])).toBe(false);
    expect(disable([{ type: 'FOLDER', key: 'something' }])).toBe(true);

    const hide = OPTIONS_DEFAULT?.hide as Exclude<
      LocationActionOptions['hide'],
      undefined | boolean
    >;

    expect(typeof hide).toBe('function');
    expect(hide('READWRITE')).toBe(false);
    expect(hide('WRITE')).toBe(false);
    expect(hide('READ')).toBe(true);
  });
});
