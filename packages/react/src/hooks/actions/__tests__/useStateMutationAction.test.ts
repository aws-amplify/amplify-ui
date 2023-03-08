import { Hub } from 'aws-amplify';
import { renderHook, act } from '@testing-library/react-hooks';

import {
  ACTION_STATE_MUTATION_FINISHED,
  ACTION_STATE_MUTATION_STARTED,
  EVENT_ACTION_CORE_STATE_MUTATION,
  UI_CHANNEL,
} from '../constants';
import { useStateMutationAction } from '../useStateMutationAction';
import { AMPLIFY_SYMBOL } from '../../../helpers/constants';

jest.mock('aws-amplify');

describe('useStateMutationAction:', () => {
  it('should update state correctly', () => {
    const prevState = 'none';
    const newState = 'block';
    const data = { prevState, newState };

    const { result } = renderHook(() => useStateMutationAction(prevState));
    act(() => {
      const [_, setNewState] = result.current;
      setNewState(newState);
    });

    const [state, _] = result.current;
    expect(state).toBe(newState);

    expect(Hub.dispatch).toHaveBeenCalledTimes(2);
    expect(Hub.dispatch).toHaveBeenCalledWith(
      UI_CHANNEL,
      {
        event: ACTION_STATE_MUTATION_STARTED,
        data,
      },
      EVENT_ACTION_CORE_STATE_MUTATION,
      AMPLIFY_SYMBOL
    );
    expect(Hub.dispatch).toHaveBeenLastCalledWith(
      UI_CHANNEL,
      {
        event: ACTION_STATE_MUTATION_FINISHED,
        data,
      },
      EVENT_ACTION_CORE_STATE_MUTATION,
      AMPLIFY_SYMBOL
    );
  });
});
