import { renderHook } from '@testing-library/react';

import { ActionsListProps } from '../../../components/composables/ActionsList';
import { useControlsContext } from '../../context';
import { useActionsList } from '../useActionsList';

jest.mock('../../../controls/context');

describe('useActionsList', () => {
  const mockUseControlsContext = jest.mocked(useControlsContext);

  afterEach(() => {
    mockUseControlsContext.mockReset();
  });

  it('returns useActionsList data', () => {
    const data = {
      actions: [{ actionType: 'action-type' }],
      isActionsListDisabled: true,
    };
    mockUseControlsContext.mockReturnValue({ data, onActionSelect: jest.fn() });

    const { result } = renderHook(() => useActionsList());

    const expected: ActionsListProps = {
      isDisabled: data.isActionsListDisabled,
      items: data.actions,
      onActionSelect: expect.any(Function),
    };

    expect(result.current).toStrictEqual(expected);
  });

  it('returns default values if actions is undefined', () => {
    mockUseControlsContext.mockReturnValue({ data: {} });

    const { result } = renderHook(() => useActionsList());

    expect(result.current).toStrictEqual({
      isDisabled: undefined,
      items: [],
      onActionSelect: undefined,
    });
  });
});
