import React from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';

import { useDeviceOrientation } from '../../../../hooks';
import { useMessageImage } from '../../../hooks/useMessageImage';

import CarouselMessageItem from '../CarouselMessageItem';

jest.mock('../../../../hooks');
jest.mock('../../../hooks/useMessageImage');
jest.mock('../../MessageLayout', () => ({ MessageLayout: 'MessageLayout' }));
jest.mock('../../MessageWrapper', () => ({ MessageWrapper: 'MessageWrapper' }));

const baseProps = { layout: 'CAROUSEL' as const };

describe('CarouselMessageItem', () => {
  let carouselMessageItem: ReactTestRenderer;

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

    act(() => {
      carouselMessageItem = create(<CarouselMessageItem {...baseProps} />);
    });

    expect(carouselMessageItem.toJSON()).toMatchSnapshot();
  });

  it('returns null if message is not ready for rendering', () => {
    (useMessageImage as jest.Mock).mockReturnValueOnce({
      hasRenderableImage: false,
      imageDimensions: { height: null, width: null },
      isImageFetching: true,
    });
    act(() => {
      carouselMessageItem = create(<CarouselMessageItem {...baseProps} />);
    });

    expect(carouselMessageItem.toJSON()).toBeNull();
  });
});
