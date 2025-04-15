/* eslint-disable react/jsx-no-useless-fragment */
import { expectAssignable, expectNotAssignable } from 'jest-tsd';
import createStorageBrowser from '../createStorageBrowser';
import { defaultActionConfigs } from '../../actions';
import React from 'react';

const { StorageBrowser, useAction, useView } = createStorageBrowser({
  actions: {
    default: {
      ...defaultActionConfigs,
    },
    custom: {
      myAction: {
        handler: () => ({
          result: Promise.resolve({ status: 'COMPLETE' }),
        }),
        viewName: 'MyActionView',
        actionListItem: {
          icon: 'info',
          label: 'my action',
        },
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  config: {} as any,
});

type StorageBrowserProps = Parameters<typeof StorageBrowser>[0];

test('StorageBrowser component should support custom view and default view', () => {
  expectAssignable<StorageBrowserProps>({
    views: {
      CopyView: () => <></>,
      MyActionView: () => <></>,
    },
  });
});

test('StorageBrowser component should NOT support random views', () => {
  expectNotAssignable<StorageBrowserProps>({
    view: {
      RandomView: () => <></>,
    },
  });
});

type StorageBrowserProviderProps = Parameters<
  typeof StorageBrowser.Provider
>[0];

test('StorageBrowser provider should support ONLY custom view', () => {
  expectAssignable<StorageBrowserProviderProps>({
    views: {
      MyActionView: () => <></>,
    },
  });
});

test('StorageBrowser provider should NOT support default views', () => {
  expectNotAssignable<StorageBrowserProviderProps>({
    views: {
      CopyView: () => <></>,
    },
  });
});

type UseActionInput = Parameters<typeof useAction>;

test('useAction() should accept default and custom actions', () => {
  expectAssignable<UseActionInput>({} as ['myAction']);
  expectAssignable<UseActionInput>(
    {} as ['myAction', { items: { key: string; id: string }[] }]
  );

  expectAssignable<UseActionInput>({} as ['copy']);
  expectAssignable<UseActionInput>(
    {} as ['copy', { items: { key: string; id: string }[] }]
  );

  expectAssignable<UseActionInput>({} as ['createFolder']);
  expectAssignable<UseActionInput>(
    {} as ['createFolder', { items: { key: string; id: string }[] }]
  );

  expectAssignable<UseActionInput>({} as ['delete']);
  expectAssignable<UseActionInput>(
    {} as ['delete', { items: { key: string; id: string }[] }]
  );

  expectAssignable<UseActionInput>({} as ['upload']);
  expectAssignable<UseActionInput>(
    {} as ['upload', { items: { key: string; id: string }[] }]
  );

  expectAssignable<UseActionInput>({} as ['download']);
  expectAssignable<UseActionInput>(
    {} as ['download', { items: { key: string; id: string }[] }]
  );
});

test('useAction() should NOT accept invalid or random actions', () => {
  expectNotAssignable<UseActionInput>({} as ['listLocations']);
  expectNotAssignable<UseActionInput>({} as ['listLocationItems']);
  expectNotAssignable<UseActionInput>({} as ['randomActions']);
});

type UseViewInput = Parameters<typeof useView>;
test('useView() should accept default views', () => {
  expectAssignable<UseViewInput>({} as ['Copy']);
  expectAssignable<UseViewInput>({} as ['CreateFolder']);
  expectAssignable<UseViewInput>({} as ['Delete']);
  expectAssignable<UseViewInput>({} as ['LocationDetail']);
  expectAssignable<UseViewInput>({} as ['Locations']);
  expectAssignable<UseViewInput>({} as ['Upload']);
});

test('useView() should NOT accept custom views', () => {
  expectNotAssignable<UseViewInput>({} as ['MyActionView']);
});
