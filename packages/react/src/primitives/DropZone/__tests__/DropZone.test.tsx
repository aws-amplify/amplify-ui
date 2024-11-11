import * as React from 'react';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { DropZone } from '../DropZone';
import { ComponentClassName } from '@aws-amplify/ui';
import { View } from '../../View';

describe('DropZone', () => {
  it('should match snapshot', () => {
    const { container } = render(<DropZone onDrop={async () => {}} />);
    expect(container).toMatchSnapshot();
  });

  it('should have the right class', () => {
    const { container } = render(<DropZone onDrop={async () => {}} />);
    expect(container.firstChild).toHaveClass(ComponentClassName.DropZone);
  });

  it('should conditionally render .Default', () => {
    render(
      <DropZone>
        <DropZone.Accepted>
          <View testId="accepted">Accepted</View>
        </DropZone.Accepted>
        <DropZone.Rejected>
          <View testId="rejected">Rejected</View>
        </DropZone.Rejected>
        <DropZone.Default>
          <View testId="default">Default</View>
        </DropZone.Default>
      </DropZone>
    );
    expect(screen.getByTestId('default')).toBeInTheDocument();
    expect(screen.queryByTestId('rejected')).not.toBeInTheDocument();
    expect(screen.queryByTestId('accepted')).not.toBeInTheDocument();
  });

  it('should conditionally render .Accept', () => {
    render(
      <DropZone testId="dropZone">
        <DropZone.Accepted>
          <View testId="accepted">Accepted</View>
        </DropZone.Accepted>
        <DropZone.Rejected>
          <View testId="rejected">Rejected</View>
        </DropZone.Rejected>
        <DropZone.Default>
          <View testId="default">Default</View>
        </DropZone.Default>
      </DropZone>
    );
    const drag = createEvent.dragOver(screen.getByTestId('dropZone'), {
      dataTransfer: {
        dropEffect: '',
        items: [
          {
            kind: 'file',
            type: 'image/png',
          },
        ],
      },
    });
    fireEvent(screen.getByTestId('dropZone'), drag);

    expect(screen.getByTestId('accepted')).toBeInTheDocument();
    expect(screen.queryByTestId('rejected')).not.toBeInTheDocument();
    expect(screen.queryByTestId('default')).not.toBeInTheDocument();
  });

  it('should conditionally render .Reject', () => {
    render(
      <DropZone acceptedFileTypes={['image/png']} testId="dropZone">
        <DropZone.Accepted>
          <View testId="accepted">Accepted</View>
        </DropZone.Accepted>
        <DropZone.Rejected>
          <View testId="rejected">Rejected</View>
        </DropZone.Rejected>
        <DropZone.Default>
          <View testId="default">Default</View>
        </DropZone.Default>
      </DropZone>
    );

    const drag = createEvent.dragOver(screen.getByTestId('dropZone'), {
      dataTransfer: {
        dropEffect: '',
        items: [
          {
            kind: 'file',
            type: 'image/jpg',
          },
        ],
      },
    });
    fireEvent(screen.getByTestId('dropZone'), drag);
    expect(screen.getByTestId('rejected')).toBeInTheDocument();
    expect(screen.queryByTestId('accepted')).not.toBeInTheDocument();
    expect(screen.queryByTestId('default')).not.toBeInTheDocument();
  });
});
