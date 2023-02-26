import { renderHook } from '@testing-library/react-hooks';
import { MessageComponentBaseProps } from '@aws-amplify/ui-react-core';

import { useMessageImage } from '../../useMessageImage';
import { MessageOverrideStyle } from '../types';

import useMessageProps from '../useMessageProps';

jest.mock('../../useMessageImage');

type TestComponentProps = MessageComponentBaseProps<MessageOverrideStyle>;

const mockUseMessageImage = useMessageImage as jest.Mock;

const onDisplay = jest.fn();

describe('useMessageProps', () => {
  beforeEach(() => {
    mockUseMessageImage.mockReturnValue({
      hasRenderableImage: false,
      isImageFetching: false,
    });
    onDisplay.mockClear();
  });

  it('behaves as expected in the happy path', () => {
    const props: TestComponentProps = {
      layout: 'MIDDLE_BANNER',
      onDisplay,
    };

    const { result } = renderHook(() => useMessageProps(props));

    expect(onDisplay).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual({
      hasRenderableImage: false,
      shouldRenderMessage: true,
      styles: expect.any(Object) as MessageOverrideStyle,
    });
  });

  it('behaves as expected when props includes an image', () => {
    mockUseMessageImage.mockReturnValue({
      hasRenderableImage: false,
      isImageFetching: true,
    });

    const props: TestComponentProps = {
      image: { src: 'https://test.png' },
      layout: 'MIDDLE_BANNER',
      onDisplay,
    };

    const { result, rerender } = renderHook(() => useMessageProps(props));

    // first render
    expect(onDisplay).not.toHaveBeenCalled();
    expect(result.current).toEqual({
      hasRenderableImage: false,
      shouldRenderMessage: false,
      styles: expect.any(Object) as MessageOverrideStyle,
    });

    mockUseMessageImage.mockReturnValue({
      hasRenderableImage: true,
      isImageFetching: false,
    });

    rerender();

    expect(onDisplay).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual({
      hasRenderableImage: true,
      shouldRenderMessage: true,
      styles: expect.any(Object) as MessageOverrideStyle,
    });
  });
});
