import React from 'react';
import { render } from '@testing-library/react';
import { FilePreviewControl } from '../FilePreviewControl';
import { useResolvedComposable } from '../hooks/useResolvedComposable';

jest.mock('../hooks/useResolvedComposable');

jest.mock('../context', () => ({
  useControlsContext: () => ({
    data: {
      filePreviewState: {
        isLoading: false,
        hasError: false,
        previewedFile: {
          key: 'test.jpg',
          size: 1024,
          type: 'FILE',
          id: 'test-id',
          fileType: 'image',
          lastModified: new Date(),
        },
        url: 'https://example.com/test.jpg',
        hasLimitExceeded: false,
      },
    },
    onCloseFilePreview: jest.fn(),
    onRetryFilePreview: jest.fn(),
  }),
}));

jest.mock('../../components/composables/FilePreview', () => ({
  FilePreview: ({ previewedFile }: any) =>
    previewedFile ? <div>File Preview Component</div> : null,
}));

describe('FilePreviewControl', () => {
  const mockUseResolvedComposable = jest.mocked(useResolvedComposable);

  beforeAll(() => {
    mockUseResolvedComposable.mockImplementation(
      (component) => component as () => React.JSX.Element
    );
  });

  it('renders FilePreview with correctly', () => {
    const { container } = render(<FilePreviewControl />);
    expect(container.textContent).toContain('File Preview Component');
  });
});
