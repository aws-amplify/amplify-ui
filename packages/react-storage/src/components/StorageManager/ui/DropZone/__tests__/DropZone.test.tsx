import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { IconsProvider, View } from '@aws-amplify/ui-react';

import { defaultStorageManagerDisplayText } from '../../../utils/displayText';
import { DropZone } from '../DropZone';

describe('DropZone', () => {
  it('renders correctly', () => {
    const { container } = render(
      <DropZone
        inDropZone={false}
        onDragEnter={() => {}}
        onDragLeave={() => {}}
        onDragOver={() => {}}
        onDragStart={() => {}}
        onDrop={() => {}}
        displayText={defaultStorageManagerDisplayText}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders children', async () => {
    const testId = 'dropzone';
    const testText = 'test';
    render(
      <DropZone
        inDropZone
        onDragEnter={() => {}}
        onDragLeave={() => {}}
        onDragOver={() => {}}
        onDragStart={() => {}}
        onDrop={() => {}}
        displayText={defaultStorageManagerDisplayText}
        testId={testId}
      >
        {testText}
      </DropZone>
    );

    const dropZoneChildren = await screen.findByTestId(testId);
    expect(dropZoneChildren).toHaveTextContent(testText);
  });

  it('renders custom icons from IconProvider', () => {
    const { container } = render(
      <IconsProvider
        icons={{
          storageManager: {
            upload: <View testId="upload" />,
          },
        }}
      >
        <DropZone
          inDropZone={false}
          onDragEnter={() => {}}
          onDragLeave={() => {}}
          onDragOver={() => {}}
          onDragStart={() => {}}
          onDrop={() => {}}
          displayText={defaultStorageManagerDisplayText}
        />
      </IconsProvider>
    );
    expect(screen.getByTestId('upload')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
