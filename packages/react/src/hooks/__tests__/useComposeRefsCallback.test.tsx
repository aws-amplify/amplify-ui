import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import {
  useComposeRefsCallback,
  UseComposeRefsCallbackProps,
} from '../useComposeRefsCallback';

const externalRef = React.createRef<HTMLInputElement>();
const internalRef: UseComposeRefsCallbackProps<HTMLInputElement>['internalRef'] =
  React.useRef<HTMLInputElement>(document.createElement('input'));

let externalRefCallbackNode: HTMLInputElement | null;
const externalRefCallback: UseComposeRefsCallbackProps<HTMLInputElement>['externalRef'] =
  (node: HTMLInputElement | null) => {
    externalRefCallbackNode = node;
  };

describe('useComposeRefsCallback', () => {
  it('should compose both internal RefObject and external RefObject', () => {
    const callback = renderHook(() =>
      useComposeRefsCallback({ externalRef, internalRef })
    );

    const inputNode = document.createElement('input');
    callback.result.current(inputNode);

    expect(internalRef.current).toBe(inputNode);
    expect(externalRef.current).toBe(inputNode);
  });

  it('should compose both internal RefObject and external callback', () => {
    const callback = renderHook(() =>
      useComposeRefsCallback({ externalRef: externalRefCallback, internalRef })
    );

    const inputNode = document.createElement('input');
    callback.result.current(inputNode);

    expect(internalRef.current).toBe(inputNode);
    expect(externalRefCallbackNode).toBe(inputNode);
  });
});
