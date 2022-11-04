import * as React from 'react';
import { render } from '@testing-library/react';

import { Previewer } from '..';
import { ComponentClassNames } from '../../../../../primitives';
const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
const fakeFile2 = new File(['goodbye'], 'goodbye.png', {
  type: 'image/png',
});

describe('Previewer', () => {
  it('renders as expected', async () => {
    const { container } = render(
      <Previewer
        acceptedFileTypes={['.png']}
        files={[fakeFile]}
        inDropZone={false}
        multiple={true}
        onClear={() => {}}
        onDragEnter={() => {}}
        onDragLeave={() => {}}
        onDragOver={() => {}}
        onDragStart={() => {}}
        onDrop={() => {}}
        onFileChange={() => {}}
        allFileNames={[]}
        onFileCancel={() => {}}
        onNameChange={() => {}}
        fileStatuses={[]}
        isLoading={false}
        isSuccess={false}
        onDelete={() => {}}
        onFileClick={() => {}}
        onPause={(index) => () => {}}
        onResume={(index) => () => {}}
        percentage={0}
        onCancelEdit={() => {}}
        isEditingName={[]}
        onSaveEdit={() => {}}
        onStartEdit={() => {}}
        maxFilesError={false}
      />
    );

    expect(container).toMatchSnapshot();
  });
  it('has two files passed in and displays them', async () => {
    const { container } = render(
      <Previewer
        acceptedFileTypes={['.png']}
        files={[fakeFile, fakeFile2]}
        inDropZone={false}
        multiple={true}
        onClear={() => {}}
        onDragEnter={() => {}}
        onDragLeave={() => {}}
        onDragOver={() => {}}
        onDragStart={() => {}}
        onDrop={() => {}}
        onFileChange={() => {}}
        allFileNames={[]}
        onFileCancel={() => {}}
        onNameChange={() => {}}
        fileStatuses={[]}
        isLoading={false}
        isSuccess={false}
        onDelete={() => {}}
        onFileClick={() => {}}
        onPause={(index) => () => {}}
        onResume={(index) => () => {}}
        percentage={0}
        onCancelEdit={() => {}}
        isEditingName={[]}
        onSaveEdit={() => {}}
        onStartEdit={() => {}}
        maxFilesError={false}
      />
    );

    expect(
      container.querySelectorAll(ComponentClassNames.FileUploaderFile).length
    ).toEqual(2);
  });

  it('has one file passed in and shows one selected ', async () => {
    const { findByText } = render(
      <Previewer
        acceptedFileTypes={['.png']}
        files={[fakeFile]}
        inDropZone={false}
        multiple={true}
        onClear={() => {}}
        onDragEnter={() => {}}
        onDragLeave={() => {}}
        onDragOver={() => {}}
        onDragStart={() => {}}
        onDrop={() => {}}
        onFileChange={() => {}}
        allFileNames={[]}
        onFileCancel={() => {}}
        onNameChange={() => {}}
        fileStatuses={[]}
        isLoading={false}
        isSuccess={false}
        onDelete={() => {}}
        onFileClick={() => {}}
        onPause={(index) => () => {}}
        onResume={(index) => () => {}}
        percentage={0}
        onCancelEdit={() => {}}
        isEditingName={[]}
        onSaveEdit={() => {}}
        onStartEdit={() => {}}
        maxFilesError={false}
      />
    );

    expect(await findByText('1 files selected')).toBeVisible();
  });
});
