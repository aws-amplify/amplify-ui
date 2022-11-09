import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import * as UseHooks from '../hooks/useFileUploader';
import { FileUploader } from '..';
import * as UIModule from '@aws-amplify/ui';
const uploadFileSpy = jest.spyOn(UIModule, 'uploadFile');
const useFileUploaderSpy = jest.spyOn(UseHooks, 'useFileUploader');
const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });

describe('File Uploader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('exists', async () => {
    const comp = render(
      <FileUploader
        level="public"
        acceptedFileTypes={['.png']}
        variation="drop"
      />
    );

    expect(comp.container).toMatchSnapshot();
  });
  it('shows a button when variation is set to button', async () => {
    render(
      <FileUploader
        level="public"
        acceptedFileTypes={['.png']}
        variation="button"
      />
    );
    const button = await screen.findByRole('button');

    expect(button).toBeTruthy();
  });
  it('shows svg drop icon when variation is set to drop', async () => {
    const { container } = render(
      <FileUploader
        level="public"
        acceptedFileTypes={['.png']}
        variation="drop"
      />
    );
    const svg = container.querySelector('svg');

    expect(svg).toBeInTheDocument();
  });

  it('Previewer is not shown on empty file target', async () => {
    const { container, queryByText } = render(
      <FileUploader
        level="public"
        acceptedFileTypes={['.png']}
        variation="button"
      />
    );

    const input = container.getElementsByTagName('input')[0];
    fireEvent.change(input, {
      target: { files: [] },
    });
    const text = await queryByText(/files selected/);

    expect(text).not.toBeInTheDocument();
  });

  it('it calls uploadFile with expected arguments', async () => {
    uploadFileSpy.mockResolvedValue({} as never);
    const { container } = render(
      <FileUploader
        level="public"
        acceptedFileTypes={['.png']}
        variation="drop"
      />
    );

    const input = container.getElementsByTagName('input')[0];
    fireEvent.change(input, {
      target: { files: [fakeFile] },
    });

    const clickButton = await screen.findByRole('button', {
      name: 'Upload 1 files',
    });

    fireEvent.click(clickButton);

    expect(uploadFileSpy).toBeCalledWith({
      completeCallback: expect.any(Function),
      errorCallback: expect.any(Function),
      file: fakeFile,
      fileName: fakeFile.name,
      level: 'public',
      resumable: false,
      progressCallback: expect.any(Function),
    });
  });
  it('it skips files that are already uploaded', async () => {
    uploadFileSpy.mockResolvedValue({} as never);
    const fileName2 = 'hello2.png';
    const fileStatuses = [
      {
        percentage: 100,
        uploadTask: undefined,
        fileErrors: undefined,
        name: 'hello.png',
        file: fakeFile,
        fileState: 'success' as any,
      },
      {
        percentage: 0,
        uploadTask: undefined,
        fileErrors: undefined,
        name: fileName2,
        file: fakeFile,
        fileState: null,
      },
    ];

    useFileUploaderSpy.mockReturnValue({
      fileStatuses,
      onDragStart: () => null,
      onDragEnter: () => null,
      onDragLeave: () => null,
      onDrop: () => null,
      onDragOver: () => null,
      setFileStatuses: () => null,
      addTargetFiles: () => 1,
      showPreviewer: true,
      setShowPreviewer: () => null,
    });
    const { container } = render(
      <FileUploader
        level="public"
        acceptedFileTypes={['.png']}
        variation="drop"
      />
    );

    const input = container.getElementsByTagName('input')[0];
    fireEvent.change(input, {
      target: { files: [fakeFile] },
    });

    const clickButton = await screen.findByRole('button', {
      name: 'Upload 1 files',
    });

    fireEvent.click(clickButton);

    expect(uploadFileSpy).toBeCalledWith({
      completeCallback: expect.any(Function),
      errorCallback: expect.any(Function),
      file: fakeFile,
      fileName: fileName2,
      level: 'public',
      resumable: false,
      progressCallback: expect.any(Function),
    });
  });
});
