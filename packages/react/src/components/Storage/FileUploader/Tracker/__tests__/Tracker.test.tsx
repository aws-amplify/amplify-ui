import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Tracker } from '..';
const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });

describe('Tracker', () => {
  it('exists', async () => {
    const { container } = render(
      <Tracker
        file={fakeFile}
        hasImage={true}
        url={''}
        onChange={() => {}}
        onCancel={() => {}}
        name={'hello.png'}
        isError={false}
        isLoading={false}
        isPaused={false}
        isSuccess={false}
        onDelete={() => {}}
        onPause={() => {}}
        onResume={() => {}}
        percentage={0}
        errorMessage={''}
        isEditing={false}
        saveEdit={() => null}
        startEdit={() => null}
        cancelEdit={() => null}
      />
    );

    expect(container).toMatchSnapshot();
  });
  it('shows the name of the file', async () => {
    const fileName = 'hello2.png';
    render(
      <Tracker
        file={fakeFile}
        hasImage={true}
        url={''}
        onChange={() => {}}
        onCancel={() => {}}
        name={fileName}
        isError={false}
        isLoading={false}
        isPaused={false}
        isSuccess={false}
        onDelete={() => {}}
        onPause={() => {}}
        onResume={() => {}}
        percentage={0}
        errorMessage={''}
        isEditing={false}
        saveEdit={() => null}
        startEdit={() => null}
        cancelEdit={() => null}
      />
    );

    const name = await screen.findByText(fileName);

    expect(name).toMatchSnapshot();
  });
  it('shows the file size', async () => {
    const fileName = 'hello2.png';
    render(
      <Tracker
        file={fakeFile}
        hasImage={true}
        url={''}
        onChange={() => {}}
        onCancel={() => {}}
        name={fileName}
        isError={false}
        isLoading={false}
        isPaused={false}
        isSuccess={false}
        onDelete={() => {}}
        onPause={() => {}}
        onResume={() => {}}
        percentage={0}
        errorMessage={''}
        isEditing={false}
        saveEdit={() => null}
        startEdit={() => null}
        cancelEdit={() => null}
      />
    );

    const name = await screen.findByText('5 B');

    expect(name).toMatchSnapshot();
  });
});
