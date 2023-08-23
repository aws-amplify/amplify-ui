import * as React from 'react';
import { render, screen } from '@testing-library/react';

import {
  ComponentClassNames,
  IconsProvider,
  View,
} from '@aws-amplify/ui-react';
import { classNameModifier } from '@aws-amplify/ui';

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

  it('shows correct class when isDragAccept is true', async () => {
    const testId = 'dropzone';
    render(
      <DropZone
        isDragAccept
        onDragEnter={() => {}}
        onDragLeave={() => {}}
        onDragOver={() => {}}
        onDragStart={() => {}}
        onDrop={() => {}}
        displayText={defaultStorageManagerDisplayText}
        testId={testId}
      />
    );

    const dropZoneElement = await screen.findByTestId(testId);
    expect(dropZoneElement).toHaveClass(
      classNameModifier(ComponentClassNames.DropZone, 'accepted')
    );
  });

  it('shows correct class when isDragReject is true', async () => {
    const testId = 'dropzone';
    render(
      <DropZone
        isDragReject
        onDragEnter={() => {}}
        onDragLeave={() => {}}
        onDragOver={() => {}}
        onDragStart={() => {}}
        onDrop={() => {}}
        displayText={defaultStorageManagerDisplayText}
        testId={testId}
      />
    );

    const dropZoneElement = await screen.findByTestId(testId);
    expect(dropZoneElement).toHaveClass(
      classNameModifier(ComponentClassNames.DropZone, 'rejected')
    );
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
