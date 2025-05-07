import type {
  UploadViewState,
  CreateFolderViewState,
  DeleteViewState,
  CopyViewState,
} from './LocationActionView';
import {
  useCopyView,
  useCreateFolderView,
  useUploadView,
  useDeleteView,
} from './LocationActionView';
import type { LocationDetailViewState } from './LocationDetailView';
import { useLocationDetailView } from './LocationDetailView';
import type { LocationsViewState } from './LocationsView';
import { useLocationsView } from './LocationsView';

interface DefaultUseViewStates {
  Copy: CopyViewState;
  CreateFolder: CreateFolderViewState;
  Delete: DeleteViewState;
  LocationDetail: LocationDetailViewState;
  Locations: LocationsViewState;
  Upload: UploadViewState;
}

type UseViewHooks = {
  [K in keyof DefaultUseViewStates]: () => DefaultUseViewStates[K];
};

export const USE_VIEW_HOOKS: UseViewHooks = {
  Copy: useCopyView,
  CreateFolder: useCreateFolderView,
  Delete: useDeleteView,
  LocationDetail: useLocationDetailView,
  Locations: useLocationsView,
  Upload: useUploadView,
};

export type UseViewType = keyof DefaultUseViewStates;

export type UseView = <K extends UseViewType>(
  type: K
) => DefaultUseViewStates[K];

const isUseViewType = <T extends UseViewType>(value: T | unknown): value is T =>
  !!USE_VIEW_HOOKS?.[value as T];

export const useView: UseView = (type) => {
  if (!isUseViewType(type)) {
    throw new Error(`Value of \`${type}\` cannot be used to index \`useView\``);
  }

  return USE_VIEW_HOOKS[type]();
};
