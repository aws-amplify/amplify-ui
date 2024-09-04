import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { ComponentClassName } from '@aws-amplify/ui';
import { IconsProvider, View } from '@aws-amplify/ui-react';
import { classNameModifier } from '@aws-amplify/ui';

import { defaultFileUploaderDisplayText } from '../../../utils/displayText';
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
        displayText={defaultFileUploaderDisplayText}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('shows correct class when inDropZone is true', async () => {
    const testId = 'dropzone';
    render(
      <DropZone
        inDropZone
        onDragEnter={() => {}}
        onDragLeave={() => {}}
        onDragOver={() => {}}
        onDragStart={() => {}}
        onDrop={() => {}}
        displayText={defaultFileUploaderDisplayText}
        testId={testId}
      />
    );

    const dropZoneElement = await screen.findByTestId(testId);
    expect(dropZoneElement).toHaveClass(
      classNameModifier(ComponentClassName.FileUploaderDropZone, 'active')
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
        displayText={defaultFileUploaderDisplayText}
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
          displayText={defaultFileUploaderDisplayText}
        />
      </IconsProvider>
    );
    expect(screen.getByTestId('upload')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
