import { DataStore, Hub } from 'aws-amplify';

import {
  ACTIONS_CHANNEL,
  ACTION_DATASTORE_DELETE_FINISHED,
  ACTION_DATASTORE_DELETE_FINISHED_MESSAGE,
  ACTION_DATASTORE_DELETE_STARTED,
  ACTION_DATASTORE_DELETE_STARTED_MESSAGE,
} from '../constants';
import { Todo } from './shared';
import { useDataStoreDeleteAction } from '../useDataStoreDeleteAction';

jest.mock('aws-amplify');

const deleteSpy = jest.spyOn(DataStore, 'delete');
const hubDispatchSpy = jest.spyOn(Hub, 'dispatch');

const toDoId = '1234';

describe('useAuthSignOutAction', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should call DataStore.delete', async () => {
    const action = useDataStoreDeleteAction({
      model: Todo,
      id: toDoId,
    });

    await action();
    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  it('should call Hub with started and finished events', async () => {
    const action = useDataStoreDeleteAction({
      model: Todo,
      id: toDoId,
    });

    await action();
    expect(hubDispatchSpy).toHaveBeenCalledTimes(2);
    expect(hubDispatchSpy).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      data: { id: toDoId },
      event: ACTION_DATASTORE_DELETE_STARTED,
      message: ACTION_DATASTORE_DELETE_STARTED_MESSAGE,
    });
    expect(hubDispatchSpy).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      data: { id: toDoId },
      event: ACTION_DATASTORE_DELETE_FINISHED,
      message: ACTION_DATASTORE_DELETE_FINISHED_MESSAGE,
    });
  });
});
