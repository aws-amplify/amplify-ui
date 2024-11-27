import {
  useCopyView,
  useCreateFolderView,
  useUploadView,
  useDeleteView,
} from './LocationActionView';
import { useLocationsView } from './LocationsView';
import { useLocationDetailView } from './LocationDetailView';

const USE_VIEW_HOOKS = {
  Copy: useCopyView,
  CreateFolder: useCreateFolderView,
  Delete: useDeleteView,
  LocationDetail: useLocationDetailView,
  Locations: useLocationsView,
  Upload: useUploadView,
};

type DefaultUseViews = typeof USE_VIEW_HOOKS;
export type UseViewType = keyof DefaultUseViews;

export type ViewKey<T> = T extends Record<
  string,
  { componentName?: `${infer U}View` }
>
  ? U
  : T extends Record<infer K, any>
  ? K
  : never;

export type UseView = <
  K extends keyof DefaultUseViews,
  S extends DefaultUseViews[K],
>(
  type: K
) => ReturnType<S>;

const isUseViewType = (value: unknown): value is UseViewType =>
  !!USE_VIEW_HOOKS?.[value as UseViewType];

// @ts-expect-error
export const useView: UseView = (type) => {
  if (!isUseViewType(type)) {
    throw new Error(`Value of \`${type}\` cannot be used to index \`useView\``);
  }

  return USE_VIEW_HOOKS[type]();
};
