import { DataStore, Hub } from 'aws-amplify';

import {
  ACTIONS_CHANNEL,
  ACTION_DATASTORE_DELETE_FINISHED,
  ACTION_DATASTORE_DELETE_FINISHED_ERRORS_MESSAGE,
  ACTION_DATASTORE_DELETE_FINISHED_MESSAGE,
  ACTION_DATASTORE_DELETE_STARTED,
  ACTION_DATASTORE_DELETE_STARTED_MESSAGE,
} from '../constants';
import { Todo } from '../testShared';
import { useDataStoreDeleteAction } from '../useDataStoreDeleteAction';

jest.mock('aws-amplify');

const deleteSpy = jest.spyOn(DataStore, 'delete');
const hubDispatchSpy = jest.spyOn(Hub, 'dispatch');

const id = '1234';
const dataStoreDeleteArgs = {
  model: Todo,
  id,
};

describe('useDataStoreDeleteAction', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should call DataStore.delete', async () => {
    const action = useDataStoreDeleteAction(dataStoreDeleteArgs);

    await action();
    expect(deleteSpy).toHaveBeenCalledTimes(1);
  });

  it('should call Hub with started and finished events', async () => {
    const action = useDataStoreDeleteAction(dataStoreDeleteArgs);

    await action();
    expect(hubDispatchSpy).toHaveBeenCalledTimes(2);
    expect(hubDispatchSpy).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      data: { id },
      event: ACTION_DATASTORE_DELETE_STARTED,
      message: ACTION_DATASTORE_DELETE_STARTED_MESSAGE,
    });
    expect(hubDispatchSpy).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      data: { id },
      event: ACTION_DATASTORE_DELETE_FINISHED,
      message: ACTION_DATASTORE_DELETE_FINISHED_MESSAGE,
    });
  });

  it('should call Hub with error message if DataStore.delete rejects', async () => {
    const errorMessage = 'Invalid data model';
    deleteSpy.mockImplementation(() => Promise.reject(new Error(errorMessage)));

    const action = useDataStoreDeleteAction(dataStoreDeleteArgs);

    await action();

    expect(hubDispatchSpy).toHaveBeenCalledTimes(2);
    expect(hubDispatchSpy).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      data: { id },
      event: ACTION_DATASTORE_DELETE_STARTED,
      message: ACTION_DATASTORE_DELETE_STARTED_MESSAGE,
    });
    expect(hubDispatchSpy).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      data: {
        id,
        errorMessage,
      },
      event: ACTION_DATASTORE_DELETE_FINISHED,
      message: ACTION_DATASTORE_DELETE_FINISHED_ERRORS_MESSAGE,
    });
  });
});
