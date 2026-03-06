import { renderHook } from '@testing-library/react';

import { FolderNameFieldProps } from '../../../components/composables/FolderNameField';
import { useControlsContext } from '../../context';
import { useFolderNameField } from '../useFolderNameField';

jest.mock('../../../controls/context');

describe('useFolderNameField', () => {
  const data = {
    folderNameId: 'folder-name-id',
    folderNameLabel: 'folder-name-label',
    folderNamePlaceholder: 'folder-name-placeholder',
    folderNameValidationMessage: 'folder-name-validation-message',
    isFolderNameDisabled: false,
  };

  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({
      data,
      onFolderNameChange: jest.fn(),
      onValidateFolderName: jest.fn(),
    });
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns FolderNameField props', () => {
    const { result } = renderHook(() => useFolderNameField());

    const expected: FolderNameFieldProps = {
      id: data.folderNameId,
      isDisabled: data.isFolderNameDisabled,
      label: data.folderNameLabel,
      placeholder: data.folderNamePlaceholder,
      validationMessage: data.folderNameValidationMessage,
      onChange: expect.any(Function),
      onValidate: expect.any(Function),
    };

    expect(result.current).toStrictEqual(expected);
  });
});
