import React from 'react';
import { renderHook } from '@testing-library/react';

import {
  DisplayTextProvider,
  useDisplayText,
  resolveDisplayText,
} from '../context';
import { DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT } from '../libraries';
import { LocationState } from '../../providers/store/location';

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

describe('resolveDisplayText', () => {
  it('returns default displayText if user  is passed`', () => {
    const resultUndefined = resolveDisplayText(undefined);

    expect(resultUndefined).toStrictEqual(DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT);

    const resultEmptyObject = resolveDisplayText({});

    expect(resultEmptyObject).toStrictEqual(
      DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT
    );
  });

  it('returns user displayText`', () => {
    const result = resolveDisplayText({
      CopyView: {
        title: 'CopyViewTitle',
      },
      CreateFolderView: {
        title: 'CreateFolderViewTitle',
      },
      DeleteView: {
        title: 'DeleteViewTitle',
      },
      LocationDetailView: {
        getTitle: () => 'LocationDetailViewTitle',
      },
      LocationsView: {
        title: 'LocationsViewTitle',
      },
      UploadView: {
        title: 'UploadViewTitle',
      },
    });

    expect(result.CopyView.title).toBe('CopyViewTitle');
    expect(result.CreateFolderView.title).toBe('CreateFolderViewTitle');
    expect(result.DeleteView.title).toBe('DeleteViewTitle');
    expect(result.LocationDetailView.getTitle({} as LocationState)).toBe(
      'LocationDetailViewTitle'
    );
    expect(result.LocationsView.title).toBe('LocationsViewTitle');
    expect(result.UploadView.title).toBe('UploadViewTitle');
  });
});
