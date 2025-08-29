import React from 'react';
import { render } from '@testing-library/react';
import { FilePreviewProvider, useFilePreviewContext } from '../context';

const TestComponent = () => {
  const context = useFilePreviewContext();
  return (
    <div>{context?.fileTypeResolver ? 'has resolver' : 'no resolver'}</div>
  );
};

describe('FilePreviewProvider', () => {
  it('provides context value to children', () => {
    const filePreview = {
      fileTypeResolver: jest.fn(),
      maxFileSize: 1000000,
    };

    const { container } = render(
      <FilePreviewProvider filePreview={filePreview}>
        <TestComponent />
      </FilePreviewProvider>
    );

    expect(container.textContent).toBe('has resolver');
  });
});
