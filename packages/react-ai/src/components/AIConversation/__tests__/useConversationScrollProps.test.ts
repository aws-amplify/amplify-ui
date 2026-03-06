import { act, renderHook } from '@testing-library/react';
import useShouldAutoScroll from '../useConversationScrollProps';
import { ConversationMessage } from '../../../types';

const messages: ConversationMessage[] = [];

type ScrollEvent = React.UIEvent<HTMLDivElement>;

describe('useShouldAutoScroll', () => {
  it('returns the expected values on mount', () => {
    const { result } = renderHook(() => useShouldAutoScroll(messages));

    const { autoScroll, onScroll } = result.current;

    expect(autoScroll).toBe('smooth');
    expect(onScroll).toStrictEqual(expect.any(Function));
  });

  it('returns the expected values on messages length change', () => {
    const { result, rerender } = renderHook(
      (_messages: ConversationMessage[] = messages) =>
        useShouldAutoScroll(_messages)
    );

    const { autoScroll: initAutoScroll, onScroll } = result.current;

    expect(initAutoScroll).toBe('smooth');

    const scrollStartEvent = {
      currentTarget: { scrollTop: 120 },
    } as ScrollEvent;

    act(() => {
      onScroll?.(scrollStartEvent);
    });

    const { autoScroll: startAutoScroll } = result.current;
    expect(startAutoScroll).toBe('smooth');

    const scrollUpEvent = { currentTarget: { scrollTop: 119 } } as ScrollEvent;

    act(() => {
      onScroll?.(scrollUpEvent);
    });

    const { autoScroll: disabledAutoScroll } = result.current;

    expect(disabledAutoScroll).toBeUndefined();

    // increase `messages` length
    rerender([...messages, {} as ConversationMessage]);

    const { autoScroll: nextMessagesAutoScroll } = result.current;

    expect(nextMessagesAutoScroll).toBe('smooth');
  });
});
