import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Previewer } from '..';

import { FileStatus, FileStatuses } from '../../types';
import { ComponentClassNames } from '../../../../../primitives';

const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
const fakeFile2 = new File(['goodbye'], 'goodbye.png', {
  type: 'image/png',
});
const fileStatus: FileStatus = {
  errorMessage: '',
  file: fakeFile,
  fileErrors: '',
  fileState: null,
  name: 'hello.png',
  percentage: 0,
  uploadTask: undefined,
};

const fileStatus2: FileStatus = {
  ...fileStatus,
  file: fakeFile2,
  name: 'hello.png',
};
const fileStatuses: FileStatuses = [fileStatus];
const fileStatuses2: FileStatuses = [fileStatus, fileStatus2];
const ref = {
  current: {
    info: jest.fn(),
  },
} as unknown as React.MutableRefObject<HTMLInputElement>;

const commonProps = {
  acceptedFileTypes: ['.png'],
  fileStatuses: fileStatuses,
  inDropZone: false,
  isEditingName: [],
  isLoading: false,
  isSuccessful: false,
  hasMaxFilesError: false,
  multiple: true,
  onClear: () => null,
  onDragEnter: () => null,
  onDragLeave: () => null,
  onDragOver: () => null,
  onDragStart: () => null,
  onDrop: () => null,
  onFileChange: () => null,
  onFileClick: () => null,
  percentage: 0,
  hiddenInput: ref,
  onUploadButtonClick: () => null,
};

describe('Previewer', () => {
  it('renders as expected', async () => {
    const { container } = render(<Previewer {...commonProps} />);

    expect(container).toMatchSnapshot();
  });
  it('shows 2 files selected when two files are passed in', async () => {
    render(<Previewer {...commonProps} fileStatuses={fileStatuses2} />);

    expect(await screen.findByText('2 files selected')).toBeVisible();
  });

  it('has one file passed in and shows one selected ', async () => {
    render(<Previewer {...commonProps} fileStatuses={fileStatuses} />);

    expect(await screen.findByText('1 files selected')).toBeVisible();
  });
  it('shows a disabled button when any file is in an edit state', async () => {
    render(
      <Previewer
        {...commonProps}
        fileStatuses={[
          {
            ...fileStatus,
            fileState: 'editing',
          },
        ]}
      />
    );

    expect(await screen.findByText(/Upload 1 files/)).toBeDisabled();
  });
  it('shows max files error alert when hasMaxFilesError is true', async () => {
    const { container } = render(
      <Previewer {...commonProps} hasMaxFilesError={true} />
    );

    expect(
      await container.getElementsByClassName(
        ComponentClassNames.AlertHeading
      )[0]
    ).toBeVisible();
  });
  it('shows the number of files uploaded', async () => {
    const fileStatus: FileStatus = {
      errorMessage: '',
      file: fakeFile,
      fileErrors: '',
      fileState: 'success',
      name: 'hello.png',
      percentage: 0,
      uploadTask: undefined,
    };
    render(
      <Previewer
        {...commonProps}
        fileStatuses={[fileStatus]}
        isSuccessful={true}
      />
    );

    expect(await screen.findByText(/1 files uploaded/)).toBeVisible();
  });
  it('shows when loading an uploading with percentage', async () => {
    render(<Previewer {...commonProps} isLoading={true} percentage={23} />);

    expect(await screen.findByText(/Uploading: 23%/)).toBeVisible();
  });
  it('shows disabled upload button when file status is in error', async () => {
    const fileStatus: FileStatus = {
      errorMessage: 'error',
      file: fakeFile,
      fileErrors: '',
      fileState: 'error',
      name: 'hello.png',
      percentage: 0,
      uploadTask: undefined,
    };
    render(<Previewer {...commonProps} fileStatuses={[fileStatus]} />);

    expect(await screen.findByText(/Upload 1 files/)).toBeDisabled();
  });
  it('shows disabled upload button when remaining files uploaded is zero', async () => {
    const fileStatus: FileStatus = {
      errorMessage: 'error',
      file: fakeFile,
      fileErrors: '',
      fileState: 'success',
      name: 'hello.png',
      percentage: 0,
      uploadTask: undefined,
    };
    render(<Previewer {...commonProps} fileStatuses={[fileStatus]} />);

    expect(await screen.findByText(/Upload 0 files/)).toBeDisabled();
  });
  it('shows disabled upload button when max files is showing an error', async () => {
    render(<Previewer {...commonProps} hasMaxFilesError={true} />);

    expect(await screen.findByText(/Upload 1 files/)).toBeDisabled();
  });
  it('shows done when upload is completed', async () => {
    render(<Previewer {...commonProps} isSuccessful={true} />);

    expect(await screen.findByText(/Done/)).toBeVisible();
  });
});
