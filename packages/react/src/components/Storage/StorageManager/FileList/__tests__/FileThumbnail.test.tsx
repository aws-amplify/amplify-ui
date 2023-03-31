import * as React from 'react';
import { render } from '@testing-library/react';

import { FileThumbnail } from '../FileThumbnail';
import { FileThumbnailProps } from '../types';
import { ComponentClassNames } from '../../../../../primitives/shared/constants';

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
        `${ComponentClassNames.StorageManagerFileImage}`
      )
    ).toHaveLength(1);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    const img = container.querySelector('img');
    expect(img).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('renders an image', () => {
    const { container } = render(
      <FileThumbnail {...thumbnailProps} isImage={true} />
    );
    expect(
      container.getElementsByClassName(
        `${ComponentClassNames.StorageManagerFileImage}`
      )
    ).toHaveLength(1);

    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', thumbnailProps.url);

    const svg = container.querySelector('svg');
    expect(svg).not.toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
