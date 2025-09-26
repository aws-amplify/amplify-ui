import React, { ComponentType } from 'react';
import { render } from '@testing-library/react';
import { FilePreviewControl } from '../FilePreviewControl';
import { FilePreviewProps } from '../../components/composables/FilePreview';
import { useControlsContext } from '../context';

jest.mock('../hooks/useResolvedComposable', () => ({
  useResolvedComposable:
    (Component: ComponentType<any>, _name: string) =>
    (props: Record<string, any>) => <Component {...props} />,
}));

jest.mock('../context', () => ({
  useControlsContext: jest.fn(() => ({
    data: {
      activeFile: {
        key: 'test.jpg',
        size: 1024,
        type: 'FILE',
        id: 'test-id',
        fileType: 'image',
        lastModified: new Date(),
      },
      filePreviewState: {
        enabled: true,
        isLoading: false,
        url: 'https://example.com/test.jpg',
      },
    },
    onRetryFilePreview: jest.fn(),
    onSelectActiveFile: jest.fn(),
  })),
}));

jest.mock('../../components/composables/FilePreview', () => ({
  FilePreview: ({ activeFile }: FilePreviewProps) =>
    activeFile ? <div>File Preview Component</div> : null,
}));

describe('FilePreviewControl', () => {
  it('renders FilePreview with correctly', () => {
    const { container } = render(<FilePreviewControl />);
    expect(container.textContent).toContain('File Preview Component');
  });

  it('does not render FilePreview when activeFile is missing', () => {
    const mockUseControlsContext = jest.mocked(useControlsContext);
    mockUseControlsContext.mockReturnValueOnce({
      data: {
        activeFile: undefined,
        filePreviewState: {
          enabled: true,
          isLoading: true,
        },
      },
      onRetryFilePreview: jest.fn(),
      onSelectActiveFile: jest.fn(),
    });
    const { container } = render(<FilePreviewControl />);
    expect(container.textContent).toEqual('');
  });
});
