import React from 'react';
import { createStorageBrowser } from '../createStorageBrowser';
import {
  CancelableTaskHandlerOutput,
  ListLocationItemsHandlerOutput,
  TaskHandler,
  TaskHandlerInput,
  UploadHandler,
  createFolderHandler,
  listLocationItemsHandler,
} from '../../actions';

type MyCancelableHandler = TaskHandler<
  TaskHandlerInput<'lolz'>,
  CancelableTaskHandlerOutput
>;
const myCancelableHandler = null as unknown as MyCancelableHandler;

describe('createStorageBrowser() created React components type generation', () => {
  const { StorageBrowser } = createStorageBrowser({
    actions: {
      MyAction: {
        displayName: 'Custom Name',
        isCancelable: true,
        handler: myCancelableHandler,
        componentName: 'MyComponentView',
      },
      SingleTaskAction: {
        handler: createFolderHandler,
        displayName: 'Create Folder',
        componentName: 'SingleTaskActionView',
      },
      ListLocationItems: {
        handler: (_input) =>
          null as unknown as Promise<ListLocationItemsHandlerOutput>,
        componentName: 'LocationDetailView',
        displayName: () => '',
      },
      Upload: {
        handler: null as unknown as UploadHandler,
        componentName: 'UploadView',
        displayName: 'Upload',
        isCancelable: true,
      },
      whatever: {
        // `ListHandler` actions should be disallowed unless
        // they match the default componentName, that they are
        // directly related to, e.g. "ListLocationItems" -> listLocationItemsHandler
        handler: listLocationItemsHandler,
        componentName: 'SillyView',
        displayName: 'Silly',
        isCancelable: true,
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    config: {} as any,
  });

  it('can render default action views', () => {
    function _Container() {
      return (
        <>
          <StorageBrowser />
          <StorageBrowser.LocationsView />
          <StorageBrowser.LocationDetailView />
          <StorageBrowser.UploadView />
          <StorageBrowser.CreateFolderView />
          <StorageBrowser.LocationActionView type="CreateFolder" />
          <StorageBrowser.LocationActionView type="Upload" />
        </>
      );
    }

    expect('done').toBe('done');
  });

  it('can render custom action views', () => {
    function _Container() {
      return (
        <>
          <StorageBrowser />
          <StorageBrowser.MyComponentView />
          <StorageBrowser.SillyView />
          <StorageBrowser.LocationActionView type="whatever" />
          <StorageBrowser.LocationActionView type="MyAction" />
        </>
      );
    }

    expect('done').toBe('done');
  });
});
