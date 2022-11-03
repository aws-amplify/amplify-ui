import * as React from 'react';
import { render } from '@testing-library/react';

import { Previewer } from '..';
const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });
const fakeFile2 = new File(['goodbye'], 'goodbye.png', {
  type: 'image/png',
});

describe('Previewer', () => {
  it('renders as expected', async () => {
    const { container } = render(
      <Previewer
        acceptedFileTypes={['.png']}
        fileStatuses={[]}
        files={[fakeFile]}
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
        fileStatuses={[]}
        files={[fakeFile, fakeFile2]}
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

    expect(await findByText('2 files selected')).toBeVisible();
  });

  it('has one file passed in and shows one selected ', async () => {
    const { findByText } = render(
      <Previewer
        acceptedFileTypes={['.png']}
        fileStatuses={[]}
        files={[fakeFile]}
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
