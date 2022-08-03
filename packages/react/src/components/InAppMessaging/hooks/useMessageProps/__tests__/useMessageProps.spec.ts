import { renderHook } from '@testing-library/react-hooks';
import {
  MessageButtonProps,
  MessageComponentBaseProps,
} from '@aws-amplify/ui-react-core';

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
      hasButtons: false,
      hasPrimaryButton: false,
      hasRenderableImage: false,
      hasSecondaryButton: false,
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
      hasButtons: false,
      hasPrimaryButton: false,
      hasRenderableImage: false,
      hasSecondaryButton: false,
      shouldRenderMessage: false,
      styles: null,
    });

    mockUseMessageImage.mockReturnValue({
      hasRenderableImage: true,
      isImageFetching: false,
    });

    rerender();

    expect(onDisplay).toHaveBeenCalledTimes(1);
    expect(result.current).toEqual({
      hasButtons: false,
      hasPrimaryButton: false,
      hasRenderableImage: true,
      hasSecondaryButton: false,
      shouldRenderMessage: true,
      styles: expect.any(Object) as MessageOverrideStyle,
    });
  });

  it('returns the expected values when props includes buttons', () => {
    const props: TestComponentProps = {
      layout: 'MIDDLE_BANNER',

      primaryButton: { title: 'primary', onAction: jest.fn() },
      secondaryButton: { title: 'secondary', onAction: jest.fn() },
    };

    const { result } = renderHook(() => useMessageProps(props));

    expect(result.current.hasButtons).toBe(true);
    expect(result.current.hasPrimaryButton).toBe(true);
    expect(result.current.hasSecondaryButton).toBe(true);
  });

  it('returns the expected values when props includes empty buttons', () => {
    const props: TestComponentProps = {
      layout: 'MIDDLE_BANNER',

      primaryButton: {} as MessageButtonProps,
      secondaryButton: {} as MessageButtonProps,
    };

    const { result } = renderHook(() => useMessageProps(props));

    expect(result.current.hasButtons).toBe(false);
    expect(result.current.hasPrimaryButton).toBe(false);
    expect(result.current.hasSecondaryButton).toBe(false);
  });

  it('returns the expected values when props includes only a primary button', () => {
    const props: TestComponentProps = {
      layout: 'MIDDLE_BANNER',
      primaryButton: { title: 'primary', onAction: jest.fn() },
    };

    const { result } = renderHook(() => useMessageProps(props));

    expect(result.current.hasButtons).toBe(true);
    expect(result.current.hasPrimaryButton).toBe(true);
    expect(result.current.hasSecondaryButton).toBe(false);
  });

  it('returns the expected values when props includes only a secondary button', () => {
    const props: TestComponentProps = {
      layout: 'MIDDLE_BANNER',
      secondaryButton: { title: 'primary', onAction: jest.fn() },
    };

    const { result } = renderHook(() => useMessageProps(props));

    expect(result.current.hasButtons).toBe(true);
    expect(result.current.hasPrimaryButton).toBe(false);
    expect(result.current.hasSecondaryButton).toBe(true);
  });
});
