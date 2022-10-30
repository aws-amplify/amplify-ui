import { renderHook } from '@testing-library/react-hooks';
import { UseAuthenticator } from '@aws-amplify/ui-react-core';
import useRouteTypedFields from '../useRouteTypedFields';

const idle = 'idle';
const signIn = 'signIn';
const verifyUser = 'verifyUser';

const passwordField = {
  type: 'password',
  name: 'password',
  label: 'Password',
  required: true,
};
const phoneField = {
  dialCode: '999',
  dialCodeList: ['123', '456'],
  name: 'phonenumber',
  type: 'tel',
};
const textField = { order: 3, name: 'username', isRequired: true };

const radioField = { type: 'radio', name: 'email', value: 'hello@world.com' };

describe('useRouteTypedFields', () => {
  it('returns the expected value for a non-component route', () => {
    const { result } = renderHook(() =>
      useRouteTypedFields({ fields: [], route: idle })
    );

    expect(result.current).toStrictEqual([]);
    expect(result.current).toHaveLength(0);
  });

  it('returns the expected result for the verifyUser route', () => {
    const { result } = renderHook(() =>
      useRouteTypedFields({ fields: [radioField], route: verifyUser })
    );

    expect(result.current).toStrictEqual([radioField]);
  });

  it('returns the expected value for a component route', () => {
    const { rerender, result } = renderHook(
      (
        nextParams: Pick<UseAuthenticator, 'fields' | 'route'> = {
          fields: [],
          route: idle,
        }
      ) => useRouteTypedFields(nextParams)
    );

    // first render always returns an empty array
    expect(result.current).toStrictEqual([]);
    expect(result.current).toHaveLength(0);

    rerender({
      fields: [passwordField, phoneField, textField],
      route: signIn,
    });

    const expected = [
      passwordField,
      {
        defaultDialCode: phoneField.dialCode,
        dialCodes: undefined,
        name: phoneField.name,
        type: 'phone',
      },
      {
        name: textField.name,
        required: textField.isRequired,
        type: 'default',
      },
    ];

    expect(result.current).toStrictEqual(expected);
  });

  it('should reset the value of typedFields on non-component route change', () => {
    const { rerender, result } = renderHook(
      (
        nextParams: Pick<UseAuthenticator, 'fields' | 'route'> = {
          fields: [passwordField, phoneField, textField],
          route: signIn,
        }
      ) => useRouteTypedFields(nextParams)
    );

    expect(result.current).toHaveLength(3);

    rerender({ fields: [], route: idle });

    expect(result.current).toStrictEqual([]);
    expect(result.current).toHaveLength(0);
  });

  it('returns the same reference when passed the same field values', () => {
    const { rerender, result } = renderHook(
      (
        nextParams: Pick<UseAuthenticator, 'fields' | 'route'> = {
          fields: [passwordField, phoneField, textField],
          route: signIn,
        }
      ) => useRouteTypedFields(nextParams)
    );

    const firstResult = result.current;

    expect(result.current).toHaveLength(3);

    rerender({
      fields: [passwordField, phoneField, textField],
      route: signIn,
    });

    expect(result.current).toBe(firstResult);
  });
});
