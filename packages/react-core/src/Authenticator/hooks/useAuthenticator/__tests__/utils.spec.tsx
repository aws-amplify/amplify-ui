import { AuthenticatorServiceFacade } from '@aws-amplify/ui';

import { areSelectorDepsEqual, getComparator } from '../utils';

describe('areSelectorDepsEqual', () => {
  it('returns false when dep arrays have different lengths', () => {
    const output = areSelectorDepsEqual([0, {}], [0]);

    expect(output).toBe(false);
  });

  it('returns false when comparing an empty array and an empty object', () => {
    const output = areSelectorDepsEqual([{}], [[]]);

    expect(output).toBe(false);
  });

  it('returns false when dep arrays have similar object values', () => {
    const output = areSelectorDepsEqual([0, { id: 4 }], [0, { id: 4 }]);

    expect(output).toBe(false);
  });

  it('returns false when nested object values are different', () => {
    const output = areSelectorDepsEqual(
      [0, { options: {} }],
      [0, { options: {} }]
    );

    expect(output).toBe(false);
  });

  it('returns true when arrays are equal length and have same deps', () => {
    const output = areSelectorDepsEqual([{}, 0], [{}, 0]);

    expect(output).toBe(true);
  });
});

describe('getComparator', () => {
  it('returns a comparator that compares arrays', () => {
    const comparator = getComparator(({ route }) => [route]);

    expect(comparator).toEqual(expect.any(Function));

    expect(
      comparator(
        { route: 'autoSignIn' } as AuthenticatorServiceFacade,
        { route: 'confirmSignIn' } as AuthenticatorServiceFacade
      )
    ).toBe(false);

    expect(
      comparator(
        { route: 'idle' } as AuthenticatorServiceFacade,
        { route: 'idle' } as AuthenticatorServiceFacade
      )
    ).toBe(true);
  });
});
