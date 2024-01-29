import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import createContextUtilities, {
  INVALID_OPTIONS_MESSAGE,
} from '../createContextUtilities';

interface Stuff {
  items: Record<string, number> | undefined;
  things: number | undefined;
}

const contextName = 'Stuff';
const defaultValue: Stuff = { items: { '1': 1, '2': 2 }, things: 1 };
const errorMessage = '`useStuff` must be used in a `StuffProvider`';

describe('createContextUtilities', () => {
  it('utility hook exposes the expected values of a defined defaultValue', () => {
    const { useStuff } = createContextUtilities({
      contextName,
      defaultValue,
    });

    const { result } = renderHook(useStuff);

    expect(result.current).toStrictEqual(defaultValue);
  });

  it('throws an error when defaultValue is undefined and no errorMessage is provided', () => {
    const defaultValue = undefined as unknown as {};

    expect(() => createContextUtilities({ contextName, defaultValue })).toThrow(
      INVALID_OPTIONS_MESSAGE
    );
  });

  it('throws an error when no options are provided', () => {
    // @ts-expect-error
    expect(() => createContextUtilities(undefined)).toThrow(
      INVALID_OPTIONS_MESSAGE
    );
  });

  it('utility hook exposes expected values without a defaultValue provided', () => {
    const { StuffProvider, useStuff } = createContextUtilities<Stuff>({
      contextName,
      errorMessage,
    });

    const { result } = renderHook(() => useStuff(), {
      wrapper: (props: { children?: React.ReactNode }) => (
        <StuffProvider {...defaultValue} {...props} />
      ),
    });

    expect(result.current).toStrictEqual(defaultValue);
  });

  it('utility hook throws an error when no defaultValue is provided and used outside its context', () => {
    const errorMessage = '`useStuff` ust be used in a `StuffProvider`';

    const { useStuff } = createContextUtilities<Stuff>({
      contextName,
      errorMessage,
    });

    const { result } = renderHook(() => useStuff());

    expect(result.error?.message).toStrictEqual(errorMessage);
  });

  it('utility hook throws a custom error when provided', () => {
    const defaultMessage = '`useStuff` must be used in a `StuffProvider`';

    const { useStuff } = createContextUtilities<Stuff>({
      contextName,
      errorMessage: defaultMessage,
    });

    const customMessage = '`useStuff` must be used in a `SecretProvider`';

    const { result } = renderHook(() =>
      useStuff({ errorMessage: customMessage })
    );

    expect(result.error?.message).toStrictEqual(customMessage);
  });

  it('utility hook throws default error when a custom message is not provided', () => {
    const defaultMessage = '`useStuff` must be used in a `StuffProvider`';

    const { useStuff } = createContextUtilities<Stuff>({
      contextName,
      errorMessage: defaultMessage,
    });

    const errorMessage = '`useStuff` must be used in a `SecretProvider`';

    const { result } = renderHook(() => useStuff({ errorMessage }));

    expect(result.error?.message).toStrictEqual(errorMessage);
  });
});
