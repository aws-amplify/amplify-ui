import React from 'react';
import { render } from '@testing-library/react-native';

import { useDeviceOrientation } from '../../../../hooks';
import { useMessageImage } from '../../../hooks/useMessageImage';

import CarouselMessageItem from '../CarouselMessageItem';

jest.mock('../../../../hooks');
jest.mock('../../../hooks/useMessageImage');
jest.mock('../../MessageLayout', () => ({ MessageLayout: 'MessageLayout' }));
jest.mock('../../MessageWrapper', () => ({ MessageWrapper: 'MessageWrapper' }));

const baseProps = { layout: 'CAROUSEL' as const };

describe('CarouselMessageItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each([
    ['landscape', false],
    ['portrait', true],
  ])('renders as expected in %s mode', (deviceOrientation, isPortraitMode) => {
    (useDeviceOrientation as jest.Mock).mockReturnValue({
      deviceOrientation,
      isPortraitMode,
    });
    (useMessageImage as jest.Mock).mockReturnValueOnce({
      hasRenderableImage: false,
      imageDimensions: { height: null, width: null },
      isImageFetching: false,
    });

    const { toJSON } = render(<CarouselMessageItem {...baseProps} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('returns null if message is not ready for rendering', () => {
    (useMessageImage as jest.Mock).mockReturnValueOnce({
      hasRenderableImage: false,
      imageDimensions: { height: null, width: null },
      isImageFetching: true,
    });
    const { toJSON } = render(<CarouselMessageItem {...baseProps} />);

    expect(toJSON()).toBeNull();
  });
});
