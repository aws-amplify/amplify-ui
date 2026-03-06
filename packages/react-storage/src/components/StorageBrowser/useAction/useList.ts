import type { UseListLocationsState } from './useListLocations';
import { useListLocations } from './useListLocations';
import type { UseListLocationItemsState } from './useListLocationItems';
import { useListLocationItems } from './useListLocationItems';
import type { UseListFolderItemsState } from './useListFolderItems';
import { useListFolderItems } from './useListFolderItems';

interface DefaultUseListStates {
  folderItems: UseListFolderItemsState;
  locationItems: UseListLocationItemsState;
  locations: UseListLocationsState;
}

type UseListHooks = {
  [K in keyof DefaultUseListStates]: () => DefaultUseListStates[K];
};

const LIST_ACTION_HOOKS: UseListHooks = {
  folderItems: useListFolderItems,
  locationItems: useListLocationItems,
  locations: useListLocations,
};

type UseListType = keyof DefaultUseListStates;

export type UseList = <K extends UseListType>(
  type: K
) => DefaultUseListStates[K];

const isListActionViewType = (value: unknown): value is UseListType =>
  Object.keys(LIST_ACTION_HOOKS).includes(value as UseListType);

export const useList: UseList = (type) => {
  if (!isListActionViewType(type)) {
    throw new Error(`Value of \`${type}\` cannot be used to index \`useList\``);
  }

  return LIST_ACTION_HOOKS[type]();
};
