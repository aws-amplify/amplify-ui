import { DataStore, Hub } from 'aws-amplify';

import {
  ACTION_DATASTORE_CREATE_FINISHED,
  ACTION_DATASTORE_CREATE_STARTED,
  EVENT_ACTION_DATASTORE_CREATE,
  UI_CHANNEL,
} from '../constants';
import { Todo } from '../testShared';
import { useDataStoreCreateAction } from '../useDataStoreCreateAction';
import { AMPLIFY_SYMBOL } from '../../../helpers/constants';
import { renderHook } from '@testing-library/react-hooks';

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
    const {
      result: { current: action },
    } = renderHook(() => useDataStoreCreateAction(dataStoreCreateArgs));

    await action();
    expect(saveSpy).toHaveBeenCalledTimes(1);
  });

  it('should call Hub with started and finished events', async () => {
    const {
      result: { current: action },
    } = renderHook(() => useDataStoreCreateAction(dataStoreCreateArgs));

    await action();
    expect(hubDispatchSpy).toHaveBeenCalledTimes(2);
    expect(hubDispatchSpy).toHaveBeenCalledWith(
      UI_CHANNEL,
      {
        data: { fields: { name } },
        event: ACTION_DATASTORE_CREATE_STARTED,
      },
      EVENT_ACTION_DATASTORE_CREATE,
      AMPLIFY_SYMBOL
    );
    expect(hubDispatchSpy).toHaveBeenCalledWith(
      UI_CHANNEL,
      {
        data: { fields: { name } },
        event: ACTION_DATASTORE_CREATE_FINISHED,
      },
      EVENT_ACTION_DATASTORE_CREATE,
      AMPLIFY_SYMBOL
    );
  });

  it('should call Hub with error message if DataStore.save rejects', async () => {
    const errorMessage = 'Invalid data model';
    saveSpy.mockImplementation(() => Promise.reject(new Error(errorMessage)));

    const {
      result: { current: action },
    } = renderHook(() => useDataStoreCreateAction(dataStoreCreateArgs));

    await action();

    expect(hubDispatchSpy).toHaveBeenCalledTimes(2);
    expect(hubDispatchSpy).toHaveBeenCalledWith(
      UI_CHANNEL,
      {
        data: { fields: { name } },
        event: ACTION_DATASTORE_CREATE_STARTED,
      },
      EVENT_ACTION_DATASTORE_CREATE,
      AMPLIFY_SYMBOL
    );
    expect(hubDispatchSpy).toHaveBeenCalledWith(
      UI_CHANNEL,
      {
        data: {
          fields: { name },
          errorMessage,
        },
        event: ACTION_DATASTORE_CREATE_FINISHED,
      },
      EVENT_ACTION_DATASTORE_CREATE,
      AMPLIFY_SYMBOL
    );
  });
});
