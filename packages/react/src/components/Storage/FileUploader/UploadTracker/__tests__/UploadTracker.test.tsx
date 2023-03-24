import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { UploadTracker } from '..';
import { FileState } from '../../types';
const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });

describe('UploadTracker', () => {
  it('exists', async () => {
    const { container } = render(
      <UploadTracker
        file={fakeFile}
        hasImage
        fileState={FileState.INIT}
        onCancel={() => {}}
        name={'hello.png'}
        onPause={() => {}}
        onResume={() => {}}
        percentage={0}
        errorMessage={''}
        onSaveEdit={() => null}
        onStartEdit={() => null}
        onCancelEdit={() => null}
        showImage
      />
    );

    expect(container).toMatchSnapshot();
  });
  it('shows the name of the file', async () => {
    const fileName = 'hello2.png';
    render(
      <UploadTracker
        file={fakeFile}
        fileState={FileState.INIT}
        hasImage
        onCancel={() => {}}
        name={fileName}
        onPause={() => {}}
        onResume={() => {}}
        percentage={0}
        errorMessage={''}
        onSaveEdit={() => null}
        onStartEdit={() => null}
        onCancelEdit={() => null}
        showImage
      />
    );

    const name = await screen.findByText(fileName);

    expect(name).toMatchSnapshot();
  });
  it('shows the file size', async () => {
    const fileName = 'hello2.png';
    render(
      <UploadTracker
        file={fakeFile}
        fileState={FileState.INIT}
        hasImage
        onCancel={() => {}}
        name={fileName}
        onPause={() => {}}
        onResume={() => {}}
        percentage={0}
        errorMessage={''}
        onSaveEdit={() => null}
        onStartEdit={() => null}
        onCancelEdit={() => null}
        showImage
      />
    );

    const name = await screen.findByText('5 B');

    expect(name).toMatchSnapshot();
  });
  it('shows the pencil icon if the error messages is for extension', async () => {
    const fileName = 'hello2.png';
    render(
      <UploadTracker
        file={fakeFile}
        fileState={FileState.ERROR}
        hasImage
        onCancel={() => {}}
        name={fileName}
        onPause={() => {}}
        onResume={() => {}}
        percentage={0}
        errorMessage={'Extension not allowed'}
        onSaveEdit={() => null}
        onStartEdit={() => null}
        onCancelEdit={() => null}
        showImage
      />
    );

    const button = await screen.queryByText(/Edit file name/);

    expect(button).toBeVisible();
  });
  it('does not show the pencil icon if the error messages is not for extension', async () => {
    const fileName = 'hello2.png';
    render(
      <UploadTracker
        file={fakeFile}
        fileState={FileState.ERROR}
        hasImage
        onCancel={() => {}}
        name={fileName}
        onPause={() => {}}
        onResume={() => {}}
        percentage={0}
        errorMessage={'Error'}
        onSaveEdit={() => null}
        onStartEdit={() => null}
        onCancelEdit={() => null}
        showImage
      />
    );

    const button = await screen.queryByText(/Edit file name/);

    expect(button).toBeNull();
  });
  it('shows pause button when file is in resume status', async () => {
    const fileName = 'hello2.png';
    render(
      <UploadTracker
        file={fakeFile}
        fileState={FileState.RESUME}
        hasImage
        onCancel={() => {}}
        isResumable
        name={fileName}
        onPause={() => {}}
        onResume={() => {}}
        percentage={50}
        errorMessage={''}
        onSaveEdit={() => null}
        onStartEdit={() => null}
        onCancelEdit={() => null}
        showImage
      />
    );

    const button = await screen.getByRole('button', { name: 'pause' });

    expect(button).toBeVisible();
  });
});
