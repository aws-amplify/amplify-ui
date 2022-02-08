import { DataStore, Hub } from 'aws-amplify';

import {
  ACTIONS_CHANNEL,
  ACTION_DATASTORE_UPDATE_FINISHED_ERRORS_MESSAGE,
  ACTION_DATASTORE_UPDATE_FINISHED,
  ACTION_DATASTORE_UPDATE_FINISHED_MESSAGE,
  ACTION_DATASTORE_UPDATE_STARTED,
  ACTION_DATASTORE_UPDATE_STARTED_MESSAGE,
} from '../constants';
import { Todo } from '../testShared';
import { useDataStoreUpdateAction } from '../useDataStoreUpdateAction';

jest.mock('aws-amplify');
const name = 'milk';
const id = '1234';
const updateActionArgs = {
  model: Todo,
  id,
  fields: { name },
};

const saveSpy = jest.spyOn(DataStore, 'save');
const querySpy = jest
  .spyOn(DataStore, 'query')
  .mockImplementation(() => Promise.resolve([{ id, name }]));
const hubDispatchSpy = jest.spyOn(Hub, 'dispatch');

describe('useAuthSignOutAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call DataStore.save', async () => {
    const action = useDataStoreUpdateAction(updateActionArgs);

    await action();
    expect(querySpy).toHaveBeenCalledTimes(1);
    expect(saveSpy).toHaveBeenCalledTimes(1);
  });

  it('should call Hub with started and finished events', async () => {
    const action = useDataStoreUpdateAction(updateActionArgs);

    await action();
    expect(hubDispatchSpy).toHaveBeenCalledTimes(2);
    expect(hubDispatchSpy).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      data: { id, fields: { name } },
      event: ACTION_DATASTORE_UPDATE_STARTED,
      message: ACTION_DATASTORE_UPDATE_STARTED_MESSAGE,
    });
    expect(hubDispatchSpy).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      data: { id, fields: { name } },
      event: ACTION_DATASTORE_UPDATE_FINISHED,
      message: ACTION_DATASTORE_UPDATE_FINISHED_MESSAGE,
    });
  });

  it('should call Hub with error message if DataStore.save rejects', async () => {
    const errorMessage = 'Invalid data model';
    saveSpy.mockImplementation(() => Promise.reject(new Error(errorMessage)));
    querySpy.mockImplementation(() => Promise.resolve([{ id, name }]));
    const action = useDataStoreUpdateAction(updateActionArgs);

    await action();

    expect(hubDispatchSpy).toHaveBeenCalledTimes(2);
    expect(hubDispatchSpy).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      data: { id, fields: { name } },
      event: ACTION_DATASTORE_UPDATE_STARTED,
      message: ACTION_DATASTORE_UPDATE_STARTED_MESSAGE,
    });
    expect(hubDispatchSpy).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      data: {
        id,
        fields: { name },
        errorMessage,
      },
      event: ACTION_DATASTORE_UPDATE_FINISHED,
      message: ACTION_DATASTORE_UPDATE_FINISHED_ERRORS_MESSAGE,
    });
  });

  it('when original not found, should call Hub with error message', async () => {
    const action = useDataStoreUpdateAction(updateActionArgs);
    querySpy.mockImplementationOnce(() => Promise.resolve(undefined));

    await action();
    expect(hubDispatchSpy).toHaveBeenCalledTimes(2);
    expect(hubDispatchSpy).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      data: { id, fields: { name } },
      event: ACTION_DATASTORE_UPDATE_STARTED,
      message: ACTION_DATASTORE_UPDATE_STARTED_MESSAGE,
    });
    expect(hubDispatchSpy).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      data: {
        id,
        fields: { name },
        errorMessage: `Error querying datastore item by id: ${id}`,
      },
      event: ACTION_DATASTORE_UPDATE_FINISHED,
      message: ACTION_DATASTORE_UPDATE_FINISHED_ERRORS_MESSAGE,
    });
  });
});
