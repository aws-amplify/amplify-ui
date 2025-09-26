import React from 'react';
import { render } from '@testing-library/react';
import { FilePreviewProvider, useFilePreviewContext } from '../context';

const TestComponent = () => {
  const context = useFilePreviewContext();
  if (context === false) {
    return <div>disabled</div>;
  }
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

  it('can be disabled', () => {
    const filePreview = false;

    const { container } = render(
      <FilePreviewProvider filePreview={filePreview}>
        <TestComponent />
      </FilePreviewProvider>
    );

    expect(container.textContent).toBe('disabled');
  });
});
