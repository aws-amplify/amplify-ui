import { renderHook } from '@testing-library/react';
import * as controlsContextModule from '../../context';
import { ControlsContext } from '../../types';
import { useFolderNameField } from '../useFolderNameField';

const folderNameId = 'folderNameId';
const folderNameLabel = 'folderNameLabel';
const folderNamePlaceholder = 'folderNamePlaceholder';
const folderNameValidationMessage = 'folderNameValidationMessage';
const isFolderNameDisabled = false;

const onFolderNameChange = jest.fn();
const onValidateFolderName = jest.fn();

describe('useFolderNameField', () => {
  const controlsContext: ControlsContext = {
    data: {
      folderNameId,
      folderNameLabel,
      folderNamePlaceholder,
      folderNameValidationMessage,
      isFolderNameDisabled,
    },
    onFolderNameChange,
    onValidateFolderName,
  };

  const useControlsContextSpy = jest.spyOn(
    controlsContextModule,
    'useControlsContext'
  );

  afterEach(() => {
    useControlsContextSpy.mockClear();
  });

  it('provides the expected values to consumers', () => {
    useControlsContextSpy.mockReturnValue(controlsContext);
    const { result } = renderHook(() => useFolderNameField());

    expect(result.current).toMatchObject({
      id: folderNameId,
      isDisabled: isFolderNameDisabled,
      label: folderNameLabel,
      onChange: onFolderNameChange,
      onValidate: onValidateFolderName,
      placeholder: folderNamePlaceholder,
      validationMessage: folderNameValidationMessage,
    });
  });
});
