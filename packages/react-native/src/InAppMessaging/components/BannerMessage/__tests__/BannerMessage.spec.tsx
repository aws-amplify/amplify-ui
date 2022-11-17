import React from 'react';
import TestRenderer from 'react-test-renderer';

import { IN_APP_MESSAGING_TEST_ID } from '../../../constants';
import { useMessageImage } from '../../../hooks/useMessageImage';

import BannerMessage from '../BannerMessage';

jest.mock('../../../hooks/useMessageImage');
jest.mock('../../MessageWrapper', () => ({ MessageWrapper: 'MessageWrapper' }));

const mockUseMessageImage = useMessageImage as jest.Mock;
const onAction = jest.fn();
const onClose = jest.fn();

const baseProps = { layout: 'TOP_BANNER' as const, onClose };

describe('BannerMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a message as expected without an image', () => {
    mockUseMessageImage.mockReturnValueOnce({
      hasRenderableImage: false,
      imageDimensions: { height: undefined, width: undefined },
      isImageFetching: false,
    });

    const renderer = TestRenderer.create(<BannerMessage {...baseProps} />);

    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('renders a message as expected with an image', () => {
    mockUseMessageImage.mockReturnValueOnce({
      hasRenderableImage: true,
      imageDimensions: { height: 100, width: 100 },
      isImageFetching: false,
    });

    const src = 'asset.png';
    const props = { ...baseProps, image: { src } };

    const renderer = TestRenderer.create(<BannerMessage {...props} />);

    const image = renderer.root.findByProps({
      testID: IN_APP_MESSAGING_TEST_ID.IMAGE,
    });

    expect(image.props).toEqual(
      expect.objectContaining({ source: { uri: src } })
    );
    expect(renderer.toJSON()).toMatchSnapshot();
  });

  it('returns null while an image is fetching', () => {
    mockUseMessageImage.mockReturnValueOnce({
      hasRenderableImage: false,
      imageDimensions: { height: undefined, width: undefined },
      isImageFetching: true,
    });

    const renderer = TestRenderer.create(<BannerMessage {...baseProps} />);

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
        imageDimensions: { height: undefined, width: undefined },
        isImageFetching: false,
      });

      const props = { ...baseProps, [key]: testProps };

      const renderer = TestRenderer.create(<BannerMessage {...props} />);
      const testElement = renderer.root.findByProps({ testID });

      expect(testElement.props).toEqual(expect.objectContaining(expectedProps));
    }
  );

  it('calls onClose when the close button is pressed', () => {
    mockUseMessageImage.mockReturnValueOnce({
      hasRenderableImage: false,
      imageDimensions: { height: undefined, width: undefined },
      isImageFetching: false,
    });

    const renderer = TestRenderer.create(<BannerMessage {...baseProps} />);
    const closeButton = renderer.root.findByProps({
      testID: IN_APP_MESSAGING_TEST_ID.CLOSE_BUTTON,
    });

    TestRenderer.act(() => {
      (closeButton.props as { onPress: () => void }).onPress();
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
