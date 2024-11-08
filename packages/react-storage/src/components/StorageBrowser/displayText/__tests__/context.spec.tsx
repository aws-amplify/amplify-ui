import React from 'react';
import { renderHook } from '@testing-library/react';

import { DisplayTextProvider, useDisplayText } from '../context';
import { DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT } from '../libraries';

describe('useDisplayText', () => {
  it('returns default displayText`', () => {
    const { result } = renderHook(useDisplayText, {
      wrapper: (props) => <DisplayTextProvider {...props} />,
    });

    expect(result.current.LocationDetailView).toStrictEqual(
      DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT['LocationDetailView']
    );
    expect(result.current.LocationsView).toStrictEqual(
      DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT['LocationsView']
    );
    expect(result.current.UploadView).toStrictEqual(
      DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT['UploadView']
    );
  });
});
