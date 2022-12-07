import React from 'react';
import TestRenderer from 'react-test-renderer';

import { IN_APP_MESSAGING_TEST_ID } from '../../../constants';
import { useDeviceOrientation } from '../../../../hooks';
import { useMessageImage } from '../../../hooks';

import ModalMessage from '../ModalMessage';

jest.mock('../../../../hooks/useDeviceOrientation');
jest.mock('../../../hooks/useMessageImage');
jest.mock('../../MessageWrapper', () => ({ MessageWrapper: 'MessageWrapper' }));

const mockUseMessageImage = useMessageImage as jest.Mock;
const onAction = jest.fn();
const onClose = jest.fn();

const baseProps = { layout: 'MODAL' as const, onClose };

describe('ModalMessage', () => {
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

    const renderer = TestRenderer.create(<ModalMessage {...baseProps} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('renders a message as expected with an image', () => {
    (useDeviceOrientation as jest.Mock).mockReturnValue({
      deviceOrientation: 'portrait',
      isPortraitMode: true,
    });
    mockUseMessageImage.mockReturnValueOnce({
      hasRenderableImage: true,
      imageDimensions: { height: 100, width: 100 },
      isImageFetching: false,
    });

    const src = 'asset.png';
    const props = { ...baseProps, image: { src } };

    const renderer = TestRenderer.create(<ModalMessage {...props} />);

    const image = renderer.root.findByProps({
      testID: IN_APP_MESSAGING_TEST_ID.IMAGE,
    });

    expect(image.props).toEqual(
      expect.objectContaining({ source: { uri: src } })
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('returns null while an image is fetching', () => {
    (useDeviceOrientation as jest.Mock).mockReturnValue({
      deviceOrientation: 'portrait',
      isPortraitMode: true,
    });
    mockUseMessageImage.mockReturnValueOnce({
      hasRenderableImage: false,
      imageDimensions: { height: null, width: null },
      isImageFetching: true,
    });

    const renderer = TestRenderer.create(<ModalMessage {...baseProps} />);

    expect(renderer.toJSON()).toBeNull();
  });

  it.each([
    [
      'header',
      IN_APP_MESSAGING_TEST_ID.HEADER,
      {
        testProps: { content: 'header content' },
        expectedProps: { children: 'header content' },
      },
    ],
    [
      'body',
      IN_APP_MESSAGING_TEST_ID.BODY,
      {
        testProps: { content: 'body content' },
        expectedProps: { children: 'body content' },
      },
    ],
    [
      'primaryButton',
      IN_APP_MESSAGING_TEST_ID.PRIMARY_BUTTON,
      {
        testProps: { onAction, title: 'primary button' },
        expectedProps: { children: 'primary button', onPress: onAction },
      },
    ],
    [
      'secondaryButton',
      IN_APP_MESSAGING_TEST_ID.SECONDARY_BUTTON,
      {
        testProps: { onAction, title: 'secondary button' },
        expectedProps: { children: 'secondary button', onPress: onAction },
      },
    ],
  ])(
    'correctly handles a %s prop',
    (key, testID, { testProps, expectedProps }) => {
      mockUseMessageImage.mockReturnValueOnce({
        hasRenderableImage: false,
        imageDimensions: { height: null, width: null },
        isImageFetching: false,
      });

      const props = { ...baseProps, [key]: testProps };

      const renderer = TestRenderer.create(<ModalMessage {...props} />);
      const testElement = renderer.root.findByProps({ testID });

      expect(testElement.props).toEqual(expect.objectContaining(expectedProps));
    }
  );

  it('calls onClose when the close button is pressed', () => {
    mockUseMessageImage.mockReturnValueOnce({
      hasRenderableImage: false,
      imageDimensions: { height: null, width: null },
      isImageFetching: false,
    });

    const renderer = TestRenderer.create(<ModalMessage {...baseProps} />);
    const closeButton = renderer.root.findByProps({
      testID: IN_APP_MESSAGING_TEST_ID.CLOSE_BUTTON,
    });

    TestRenderer.act(() => {
      (closeButton.props as { onPress: () => void }).onPress();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
