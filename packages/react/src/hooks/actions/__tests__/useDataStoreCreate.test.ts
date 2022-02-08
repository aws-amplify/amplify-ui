import { DataStore, Hub } from 'aws-amplify';

import {
  ACTION_DATASTORE_CREATE_FINISHED_ERRORS_MESSAGE,
  ACTION_DATASTORE_CREATE_FINISHED_MESSAGE,
  ACTION_DATASTORE_CREATE_FINISHED,
  ACTION_DATASTORE_CREATE_STARTED_MESSAGE,
  ACTION_DATASTORE_CREATE_STARTED,
  UI_CHANNEL,
} from '../constants';
import { Todo } from '../testShared';
import { useDataStoreCreateAction } from '../useDataStoreCreateAction';

jest.mock('aws-amplify');

const saveSpy = jest.spyOn(DataStore, 'save');
const hubDispatchSpy = jest.spyOn(Hub, 'dispatch');

const name = 'milk';
const dataStoreCreateArgs = {
  model: Todo,
  fields: { name: name },
};
describe('useDataStoreCreateAction', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should call DataStore.save', async () => {
    const action = useDataStoreCreateAction(dataStoreCreateArgs);

    await action();
    expect(saveSpy).toHaveBeenCalledTimes(1);
  });

  it('should call Hub with started and finished events', async () => {
    const action = useDataStoreCreateAction(dataStoreCreateArgs);

    await action();
    expect(hubDispatchSpy).toHaveBeenCalledTimes(2);
    expect(hubDispatchSpy).toHaveBeenCalledWith(UI_CHANNEL, {
      data: { fields: { name } },
      event: ACTION_DATASTORE_CREATE_STARTED,
      message: ACTION_DATASTORE_CREATE_STARTED_MESSAGE,
    });
    expect(hubDispatchSpy).toHaveBeenCalledWith(UI_CHANNEL, {
      data: { fields: { name } },
      event: ACTION_DATASTORE_CREATE_FINISHED,
      message: ACTION_DATASTORE_CREATE_FINISHED_MESSAGE,
    });
  });

  it('should call Hub with error message if DataStore.save rejects', async () => {
    const errorMessage = 'Invalid data model';
    saveSpy.mockImplementation(() => Promise.reject(new Error(errorMessage)));

    const action = useDataStoreCreateAction(dataStoreCreateArgs);

    await action();

    expect(hubDispatchSpy).toHaveBeenCalledTimes(2);
    expect(hubDispatchSpy).toHaveBeenCalledWith(UI_CHANNEL, {
      data: { fields: { name } },
      event: ACTION_DATASTORE_CREATE_STARTED,
      message: ACTION_DATASTORE_CREATE_STARTED_MESSAGE,
    });
    expect(hubDispatchSpy).toHaveBeenCalledWith(UI_CHANNEL, {
      data: {
        fields: { name },
        errorMessage,
      },
      event: ACTION_DATASTORE_CREATE_FINISHED,
      message: ACTION_DATASTORE_CREATE_FINISHED_ERRORS_MESSAGE,
    });
  });
});
