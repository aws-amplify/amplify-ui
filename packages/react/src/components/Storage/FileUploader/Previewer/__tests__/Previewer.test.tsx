import * as React from 'react';
import { render } from '@testing-library/react';

import { Previewer } from '..';

import { ComponentClassNames } from '../../../../../primitives';
import { FileStatus, FileStatuses } from '../../types';

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

describe('Previewer', () => {
  it('renders as expected', async () => {
    const { container } = render(
      <Previewer
        acceptedFileTypes={['.png']}
        fileStatuses={fileStatuses}
        inDropZone={false}
        isEditingName={[]}
        isLoading={false}
        isSuccess={false}
        maxFilesError={false}
        multiple={true}
        onClear={() => {}}
        onDragEnter={() => {}}
        onDragLeave={() => {}}
        onDragOver={() => {}}
        onDragStart={() => {}}
        onDrop={() => {}}
        onFileChange={() => {}}
        onFileClick={() => {}}
        percentage={0}
      />
    );

    expect(container).toMatchSnapshot();
  });
  it('has two files passed in shows 2 files selected', async () => {
    const { findByText } = render(
      <Previewer
        acceptedFileTypes={['.png']}
        fileStatuses={fileStatuses2}
        inDropZone={false}
        isEditingName={[]}
        isLoading={false}
        isSuccess={false}
        maxFilesError={false}
        multiple={true}
        onClear={() => {}}
        onDragEnter={() => {}}
        onDragLeave={() => {}}
        onDragOver={() => {}}
        onDragStart={() => {}}
        onDrop={() => {}}
        onFileChange={() => {}}
        onFileClick={() => {}}
        percentage={0}
      />
    );

    expect(
      container.querySelectorAll(`.${ComponentClassNames.FileUploaderFile}`).length
    ).toEqual(2);
    expect(await findByText('2 files selected')).toBeVisible();
  });

  it('has one file passed in and shows one selected ', async () => {
    const { findByText } = render(
      <Previewer
        acceptedFileTypes={['.png']}
        fileStatuses={fileStatuses}
        inDropZone={false}
        isEditingName={[]}
        isLoading={false}
        isSuccess={false}
        maxFilesError={false}
        multiple={true}
        onClear={() => {}}
        onDragEnter={() => {}}
        onDragLeave={() => {}}
        onDragOver={() => {}}
        onDragStart={() => {}}
        onDrop={() => {}}
        onFileChange={() => {}}
        onFileClick={() => {}}
        percentage={0}
      />
    );

    expect(await findByText('1 files selected')).toBeVisible();
  });
});
