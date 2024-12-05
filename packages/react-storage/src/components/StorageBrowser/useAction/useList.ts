import { useListLocations } from './useListLocations';
import { useListLocationItems } from './useListLocationItems';
import { useListFolderItems } from './useListFolderItems';

const LIST_ACTION_HOOKS = {
  folderItems: useListFolderItems,
  locationItems: useListLocationItems,
  locations: useListLocations,
};

type ListActionHooks = typeof LIST_ACTION_HOOKS;

type ListActionType = keyof ListActionHooks;

export type UseList = <
  K extends keyof ListActionHooks,
  S extends ListActionHooks[K],
>(
  type: K
) => ReturnType<S>;

const isListActionViewType = (value: unknown): value is ListActionType =>
  Object.keys(LIST_ACTION_HOOKS).includes(value as ListActionType);

// @ts-expect-error
export const useList: UseList = (type) => {
  if (!isListActionViewType(type)) {
    throw new Error(`Value of \`${type}\` cannot be used to index \`useList\``);
  }
  return LIST_ACTION_HOOKS[type]();
};
