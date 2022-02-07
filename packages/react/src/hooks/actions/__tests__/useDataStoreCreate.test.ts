import { DataStore, Hub } from 'aws-amplify';

import {
  ACTIONS_CHANNEL,
  ACTION_DATASTORE_CREATE_FINISHED,
  ACTION_DATASTORE_CREATE_FINISHED_MESSAGE,
  ACTION_DATASTORE_CREATE_STARTED,
  ACTION_DATASTORE_CREATE_STARTED_MESSAGE,
} from '../constants';
import { Todo } from './shared';
import { useDataStoreCreateAction } from '../useDataStoreCreateAction';

jest.mock('aws-amplify');

const createSpy = jest.spyOn(DataStore, 'save');
const hubDispatchSpy = jest.spyOn(Hub, 'dispatch');

const toDoName = 'milk';

describe('useAuthSignOutAction', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should call DataStore.save', async () => {
    const action = useDataStoreCreateAction({
      model: Todo,
      fields: { name: toDoName },
    });

    await action();
    expect(createSpy).toHaveBeenCalledTimes(1);
  });

  it('should call Hub with started and finished events', async () => {
    const action = useDataStoreCreateAction({
      model: Todo,
      fields: { name: toDoName },
    });

    await action();
    expect(hubDispatchSpy).toHaveBeenCalledTimes(2);
    expect(hubDispatchSpy).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      data: { fields: { name: 'milk' } },
      event: ACTION_DATASTORE_CREATE_STARTED,
      message: ACTION_DATASTORE_CREATE_STARTED_MESSAGE,
    });
    expect(hubDispatchSpy).toHaveBeenCalledWith(ACTIONS_CHANNEL, {
      data: { fields: { name: 'milk' } },
      event: ACTION_DATASTORE_CREATE_FINISHED,
      message: ACTION_DATASTORE_CREATE_FINISHED_MESSAGE,
    });
  });
});
