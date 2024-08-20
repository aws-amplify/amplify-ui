import React from 'react';
import {
  useProviderDataListContext,
  useRedirectFunctionContext,
  useDisplayTextContext,
  displayText,
  UseHandleSignInWithRedirectProvider,
} from '../../context';
import createProvider from '../createProvider';
import { renderHook } from '@testing-library/react';
import { signInWithRedirect } from 'aws-amplify/auth';
import * as DataStateModule from '@aws-amplify/ui-react-core';

const useDataStateSpy = jest.spyOn(DataStateModule, 'useDataState');

const EXPECTED_ACCEPTED_STATE = {
  data: undefined,
  hasError: false,
  isLoading: false,
  message: undefined,
};

describe('createProvider', () => {
  const Provider = createProvider({
    providers: [],
  });
  it('should create a provider', () => {
    const wrapper = ({ children }) => <Provider>{children}</Provider>;

    const { result: providerListContext } = renderHook(
      () => useProviderDataListContext(),
      { wrapper }
    );
    expect(providerListContext.current).toEqual([]);

    const { result: displayTextContext } = renderHook(
      () => useDisplayTextContext(),
      { wrapper }
    );
    expect(displayTextContext.current).toEqual(displayText);

    const { result: redirectFunctionContext } = renderHook(
      () => useRedirectFunctionContext(),
      { wrapper }
    );
    expect(redirectFunctionContext.current).toEqual(signInWithRedirect);
  });
  it('should use redirect hook if available', () => {
    const handlerFn = jest.fn();

    useDataStateSpy.mockImplementationOnce(() => {
      return [EXPECTED_ACCEPTED_STATE, handlerFn];
    });

    const wrapper = ({ children }) => (
      <UseHandleSignInWithRedirectProvider>
        <Provider>{children}</Provider>
      </UseHandleSignInWithRedirectProvider>
    );

    const { result: redirectFunctionContext } = renderHook(
      () => useRedirectFunctionContext(),
      { wrapper }
    );
    expect(redirectFunctionContext.current).toEqual(handlerFn);
  });
});
