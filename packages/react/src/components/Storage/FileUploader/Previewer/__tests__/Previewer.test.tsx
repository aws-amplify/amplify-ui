import * as React from 'react';
import { act, render, screen } from '@testing-library/react';

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
  isSuccess: false,
  maxFilesError: false,
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
  it('has two files passed in shows 2 files selected', async () => {
    const { findByText } = render(
      <Previewer {...commonProps} fileStatuses={fileStatuses2} />
    );

    expect(await findByText('2 files selected')).toBeVisible();
  });

  it('has one file passed in and shows one selected ', async () => {
    const { findByText } = render(
      <Previewer {...commonProps} fileStatuses={fileStatuses} />
    );

    expect(await findByText('1 files selected')).toBeVisible();
  });
  it('shows a disabled button when any file is in an edit state', async () => {
    const { findByText } = render(
      <Previewer {...commonProps} isEditingName={[true]} />
    );

    expect(await findByText(/Upload 1 files/)).toBeDisabled();
  });
  it('shows max files error alert when maxFilesError is true', async () => {
    const { container } = render(
      <Previewer {...commonProps} maxFilesError={true} />
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
    const { findByText } = render(
      <Previewer
        {...commonProps}
        fileStatuses={[fileStatus]}
        isSuccess={true}
      />
    );

    expect(await findByText(/1 files uploaded/)).toBeVisible();
  });
  it('shows when loading an uploading with percentage', async () => {
    const { findByText } = render(
      <Previewer {...commonProps} isLoading={true} percentage={23} />
    );

    expect(await findByText(/Uploading: 23%/)).toBeVisible();
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
    const { findByText } = render(
      <Previewer {...commonProps} fileStatuses={[fileStatus]} />
    );

    expect(await findByText(/Upload 1 files/)).toBeDisabled();
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
    const { findByText } = render(
      <Previewer {...commonProps} fileStatuses={[fileStatus]} />
    );

    expect(await findByText(/Upload 0 files/)).toBeDisabled();
  });
  it('shows disabled upload button when max files is showing an error', async () => {
    const { findByText } = render(
      <Previewer {...commonProps} maxFilesError={true} />
    );

    expect(await findByText(/Upload 1 files/)).toBeDisabled();
  });
  it('shows done when upload is completed', async () => {
    const { findByText } = render(
      <Previewer {...commonProps} isSuccess={true} />
    );

    expect(await findByText(/Done/)).toBeVisible();
  });
});
