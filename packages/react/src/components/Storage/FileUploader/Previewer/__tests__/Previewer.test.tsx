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
        fileNames={[]}
        allFileNames={[]}
        onFileCancel={() => {}}
        onNameChange={() => {}}
        level="public"
      />
    );

    expect(container).toMatchSnapshot();
  });
  it('has two files passed in and displays them', async () => {
    const { container, findByText } = render(
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
        fileNames={[]}
        allFileNames={[]}
        onFileCancel={() => {}}
        onNameChange={() => {}}
        level="public"
      />
    );

    expect(
      container.querySelectorAll('.amplify-fileuploader-file').length
    ).toEqual(2);

    expect(await findByText('hello.png')).toBeVisible();
    expect(await findByText('goodbye.png')).toBeVisible();
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
        fileNames={[]}
        level="public"
      />
    );

    expect(await findByText('1 files selected')).toBeVisible();
  });
});
