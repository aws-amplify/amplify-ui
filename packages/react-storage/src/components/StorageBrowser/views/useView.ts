import {
  useCopyView,
  useCreateFolderView,
  useUploadView,
  useDeleteView,
} from './LocationActionView';
import { useLocationsView } from './LocationsView';
import { useLocationDetailView } from './LocationDetailView';

export const DEFAULT_VIEW_HOOKS = {
  Copy: useCopyView,
  CreateFolder: useCreateFolderView,
  Delete: useDeleteView,
  LocationDetail: useLocationDetailView,
  Locations: useLocationsView,
  Upload: useUploadView,
};

type DefaultViewHooks = typeof DEFAULT_VIEW_HOOKS;
export type UseViewType = keyof DefaultViewHooks;

export type ViewKey<T> = T extends Record<
  string,
  { componentName?: `${infer U}View` }
>
  ? U
  : T extends Record<infer K, any>
  ? K
  : never;

const isUseViewType = (value: unknown): value is UseViewType =>
  !!DEFAULT_VIEW_HOOKS?.[value as UseViewType];

export type UseView = <
  K extends UseViewType,
  S extends ReturnType<DefaultViewHooks[K]>,
>(
  type: K
) => S;

// @ts-expect-error
export const useView: UseView = (type) => {
  if (!isUseViewType(type)) {
    throw new Error(`Value of \`${type}\` cannot be used to index \`useView\``);
  }

  return DEFAULT_VIEW_HOOKS[type]();
};
