import { Hub } from 'aws-amplify';
import { renderHook, act } from '@testing-library/react-hooks';

import {
  ACTIONS_CHANNEL,
  ACTION_STATE_MUTATION_FINISHED,
  ACTION_STATE_MUTATION_STARTED,
} from '../constants';
import { useStateMutationAction } from '../useStateMutationAction';

jest.mock('aws-amplify');

describe('useStateMutationAction: ', () => {
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
    expect(Hub.dispatch).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      event: ACTION_STATE_MUTATION_STARTED,
      data,
    });
    expect(Hub.dispatch).toHaveBeenLastCalledWith(ACTIONS_CHANNEL, {
      event: ACTION_STATE_MUTATION_FINISHED,
      data,
    });
  });
});
