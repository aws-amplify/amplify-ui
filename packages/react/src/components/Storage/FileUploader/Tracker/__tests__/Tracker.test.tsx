import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Tracker } from '..';
const fakeFile = new File(['hello'], 'hello.png', { type: 'image/png' });

describe('Tracker', () => {
  it('exists', async () => {
    const { container } = render(
      <Tracker
        file={fakeFile}
        hasImage={true}
        url={''}
        onChange={() => ''}
        onCancel={() => ''}
        name={'hello.png'}
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
        onChange={() => ''}
        onCancel={() => ''}
        name={fileName}
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
        onChange={() => ''}
        onCancel={() => ''}
        name={fileName}
      />
    );

    const name = await screen.findByText('5 B');

    expect(name).toMatchSnapshot();
  });
});
