import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

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

    const { toJSON } = render(<BannerMessage {...baseProps} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders a message as expected with an image', () => {
    mockUseMessageImage.mockReturnValueOnce({
      hasRenderableImage: true,
      imageDimensions: { height: 100, width: 100 },
      isImageFetching: false,
    });

    const src = 'asset.png';
    const props = { ...baseProps, image: { src } };

    const { toJSON, getByTestId } = render(<BannerMessage {...props} />);

    const image = getByTestId(IN_APP_MESSAGING_TEST_ID.IMAGE);

    expect(image.props).toEqual(
      expect.objectContaining({ source: { uri: src } })
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('returns null while an image is fetching', () => {
    mockUseMessageImage.mockReturnValueOnce({
      hasRenderableImage: false,
      imageDimensions: { height: undefined, width: undefined },
      isImageFetching: true,
    });

    const { toJSON } = render(<BannerMessage {...baseProps} />);

    expect(toJSON()).toBeNull();
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
  ])(
    'correctly handles a %s prop',
    (key, testID, { testProps, expectedProps }) => {
      mockUseMessageImage.mockReturnValueOnce({
        hasRenderableImage: false,
        imageDimensions: { height: undefined, width: undefined },
        isImageFetching: false,
      });

      const props = { ...baseProps, [key]: testProps };

      const { getByTestId } = render(<BannerMessage {...props} />);
      const testElement = getByTestId(testID);

      expect(testElement.children).toContain(expectedProps.children);
    }
  );

  it.each([
    [
      'primaryButton',
      IN_APP_MESSAGING_TEST_ID.PRIMARY_BUTTON,
      {
        testProps: { onAction, title: 'primary button' },
      },
    ],
    [
      'secondaryButton',
      IN_APP_MESSAGING_TEST_ID.SECONDARY_BUTTON,
      {
        testProps: { onAction, title: 'secondary button' },
      },
    ],
  ])('correctly handles a %s button prop', (key, testID, { testProps }) => {
    mockUseMessageImage.mockReturnValueOnce({
      hasRenderableImage: false,
      imageDimensions: { height: undefined, width: undefined },
      isImageFetching: false,
    });

    const props = { ...baseProps, [key]: testProps };
    const { toJSON, getByRole, getByTestId, getByText, queryAllByRole } =
      render(<BannerMessage {...props} />);

    expect(toJSON()).toMatchSnapshot();
    expect(queryAllByRole('button')).toHaveLength(2);
    expect(getByTestId(testID)).toBeDefined();
    expect(getByTestId(IN_APP_MESSAGING_TEST_ID.CLOSE_BUTTON)).toBeDefined();

    expect(getByRole('image')).toBeDefined();
    expect(getByText(testProps.title)).toBeDefined();
  });

  it('calls onClose when the close button is pressed', () => {
    mockUseMessageImage.mockReturnValueOnce({
      hasRenderableImage: false,
      imageDimensions: { height: undefined, width: undefined },
      isImageFetching: false,
    });

    const { getByTestId } = render(<BannerMessage {...baseProps} />);
    const closeButton = getByTestId(IN_APP_MESSAGING_TEST_ID.CLOSE_BUTTON);

    fireEvent.press(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
