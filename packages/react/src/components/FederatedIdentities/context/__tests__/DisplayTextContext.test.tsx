import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import {
  displayText,
  DisplayTextProvider,
  useDisplayTextContext,
} from '../DisplayTextContext';

describe('useDisplayTextContext', () => {
  const customDisplayText = jest.fn();

  it('should return the default displayText function when no custom displayText is provided', () => {
    const { result } = renderHook(() => useDisplayTextContext());

    expect(result.current).toBe(displayText);
  });

  it('should return the custom displayText function when provided', () => {
    const wrapper = ({ children }) => (
      <DisplayTextProvider customDisplayText={customDisplayText}>
        {children}
      </DisplayTextProvider>
    );

    const { result } = renderHook(() => useDisplayTextContext(), { wrapper });

    expect(result.current).toBe(customDisplayText);
  });

  it('should display text correctly', () => {
    expect(displayText('test')).toBe('Sign in with test');
  });
});
