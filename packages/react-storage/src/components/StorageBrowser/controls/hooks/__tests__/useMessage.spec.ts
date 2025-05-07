import { renderHook } from '@testing-library/react';

import { MessageProps } from '../../../components/composables/Message';
import { useControlsContext } from '../../context';
import { useMessage } from '../useMessage';

jest.mock('../../../controls/context');

describe('useMessage', () => {
  const message = {
    id: 'message-id',
    content: 'message-content',
    type: 'success',
    onDismiss: jest.fn(),
  } as const;

  const mockUseControlsContext = jest.mocked(useControlsContext);

  beforeEach(() => {
    mockUseControlsContext.mockReturnValue({ data: { message } });
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns Message props', () => {
    const { result } = renderHook(() => useMessage());

    const expected: MessageProps = {
      id: message.id,
      content: message.content,
      type: message.type,
      onDismiss: expect.any(Function),
    };

    expect(result.current).toStrictEqual(expected);
  });

  it('returns empty object if message is undefined', () => {
    mockUseControlsContext.mockReturnValue({ data: {} });

    const { result } = renderHook(() => useMessage());

    expect(result.current).toStrictEqual({});
  });
});
