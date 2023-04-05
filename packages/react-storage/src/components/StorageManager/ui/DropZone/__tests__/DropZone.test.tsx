import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { ComponentClassNames } from '@aws-amplify/ui-react';
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
        displayText={defaultStorageManagerDisplayText}
        testId={testId}
      />
    );

    const dropZoneElement = await screen.findByTestId(testId);
    expect(dropZoneElement).toHaveClass(
      classNameModifier(ComponentClassNames.StorageManagerDropZone, 'active')
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
});
