import { DataStore, Hub } from 'aws-amplify';

import {
  ACTION_DATASTORE_DELETE_FINISHED,
  ACTION_DATASTORE_DELETE_STARTED,
  EVENT_ACTION_DATASTORE_DELETE,
  UI_CHANNEL,
} from '../constants';
import { Todo } from '../testModels/todo';
import { useDataStoreDeleteAction } from '../useDataStoreDeleteAction';
import { AMPLIFY_SYMBOL } from '../../../helpers/constants';

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
    expect(hubDispatchSpy).toHaveBeenCalledWith(
      UI_CHANNEL,
      {
        data: { id },
        event: ACTION_DATASTORE_DELETE_STARTED,
      },
      EVENT_ACTION_DATASTORE_DELETE,
      AMPLIFY_SYMBOL
    );
    expect(hubDispatchSpy).toHaveBeenCalledWith(
      UI_CHANNEL,
      {
        data: { id },
        event: ACTION_DATASTORE_DELETE_FINISHED,
      },
      EVENT_ACTION_DATASTORE_DELETE,
      AMPLIFY_SYMBOL
    );
  });

  it('should call Hub with error message if DataStore.delete rejects', async () => {
    const errorMessage = 'Invalid data model';
    deleteSpy.mockImplementation(() => Promise.reject(new Error(errorMessage)));

    const action = useDataStoreDeleteAction(dataStoreDeleteArgs);

    await action();

    expect(hubDispatchSpy).toHaveBeenCalledTimes(2);
    expect(hubDispatchSpy).toHaveBeenCalledWith(
      UI_CHANNEL,
      {
        data: { id },
        event: ACTION_DATASTORE_DELETE_STARTED,
      },
      EVENT_ACTION_DATASTORE_DELETE,
      AMPLIFY_SYMBOL
    );
    expect(hubDispatchSpy).toHaveBeenCalledWith(
      UI_CHANNEL,
      {
        data: {
          id,
          errorMessage,
        },
        event: ACTION_DATASTORE_DELETE_FINISHED,
      },
      EVENT_ACTION_DATASTORE_DELETE,
      AMPLIFY_SYMBOL
    );
  });
});
