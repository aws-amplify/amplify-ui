import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { ComponentClassName } from '@aws-amplify/ui';
import { IconsProvider, View } from '@aws-amplify/ui-react';

import { FileThumbnail } from '../FileThumbnail';
import { FileThumbnailProps } from '../types';

const thumbnailProps: FileThumbnailProps = {
  fileName: 'test',
  url: 'testURL',
  isImage: false,
};

describe('FileThumbnail', () => {
  it('renders an icon', () => {
    const { container } = render(<FileThumbnail {...thumbnailProps} />);

    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderFileImage}`
      )
    ).toHaveLength(1);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    const img = container.querySelector('img');
    expect(img).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('renders an image', () => {
    const { container } = render(<FileThumbnail {...thumbnailProps} isImage />);
    expect(
      container.getElementsByClassName(
        `${ComponentClassName.FileUploaderFileImage}`
      )
    ).toHaveLength(1);

    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', thumbnailProps.url);

    const svg = container.querySelector('svg');
    expect(svg).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('renders custom icons from IconProvider', () => {
    const { container } = render(
      <IconsProvider
        icons={{
          storageManager: {
            file: <View testId="file" />,
          },
        }}
      >
        <FileThumbnail {...thumbnailProps} />
      </IconsProvider>
    );
    expect(screen.getByTestId('file')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
