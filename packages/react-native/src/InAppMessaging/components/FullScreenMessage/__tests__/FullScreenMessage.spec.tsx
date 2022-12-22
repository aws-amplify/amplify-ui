import React from 'react';
import { render } from '@testing-library/react-native';

import { useDeviceOrientation } from '../../../../hooks';
import { useMessageImage } from '../../../hooks';

import FullScreenMessage from '../FullScreenMessage';

jest.mock('../../../../hooks');
jest.mock('../../../hooks/useMessageImage');
jest.mock('../../MessageWrapper', () => ({ MessageWrapper: 'MessageWrapper' }));
jest.mock('../../MessageLayout', () => ({ MessageLayout: 'MessageLayout' }));

const baseProps = { layout: 'FULL_SCREEN' as const };

const mockUseMessageImage = useMessageImage as jest.Mock;

describe('FullScreenMessage', () => {
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
    mockUseMessageImage.mockReturnValueOnce({
      hasRenderableImage: false,
      imageDimensions: { height: null, width: null },
      isImageFetching: false,
    });

    const { toJSON } = render(<FullScreenMessage {...baseProps} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('returns null while an image is fetching', () => {
    mockUseMessageImage.mockReturnValueOnce({
      hasRenderableImage: false,
      imageDimensions: { height: null, width: null },
      isImageFetching: true,
    });

    const { toJSON } = render(<FullScreenMessage {...baseProps} />);

    expect(toJSON()).toBeNull();
  });
});
