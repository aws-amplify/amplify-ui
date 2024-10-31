import { ActionConfigs } from '../actions';

import {
  useCopyView,
  useCreateFolderView,
  useUploadView,
  useDeleteView,
  ActionViewState,
  useActionView,
} from './LocationActionView';
import { useLocationsView } from './LocationsView';
import { useLocationDetailView } from './LocationDetailView';

const DEFAULT_USE_VIEWS = {
  CopyView: useCopyView,
  CreateFolderView: useCreateFolderView,
  DeleteView: useDeleteView,
  LocationDetailView: useLocationDetailView,
  LocationsView: useLocationsView,
  UploadView: useUploadView,
} as const;

type DefaultUseViews = typeof DEFAULT_USE_VIEWS;

export type ViewKey<T extends ActionConfigs> = T extends Record<
  string,
  { componentName: `${infer U}View` }
>
  ? U
  : never;

type UseViewState<T extends string> = `${T}View` extends keyof DefaultUseViews
  ? ReturnType<DefaultUseViews[`${T}View`]>
  : ActionViewState;

type UseView<T extends ActionConfigs = ActionConfigs> = <K extends ViewKey<T>>(
  type: K
) => UseViewState<K>;

type CreateUseView = <T extends ActionConfigs>(configs: T) => UseView<T>;

const isDefaultUseViewName = (
  viewName?: string
): viewName is keyof DefaultUseViews =>
  Object.keys(DEFAULT_USE_VIEWS).some((key) => key === viewName);

export const createUseView: CreateUseView = (configs) => {
  const hooks: Record<string, UseView> = Object.values(configs).reduce(
    (out, { componentName }) => ({
      ...out,
      [componentName.slice(0, -4)]: isDefaultUseViewName(componentName)
        ? DEFAULT_USE_VIEWS[componentName]
        : useActionView,
    }),
    {}
  );

  return function useView(type) {
    // todo: add assertion here

    return hooks[type](type);
  };
};
