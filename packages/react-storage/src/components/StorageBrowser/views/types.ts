import type React from 'react';
import type { LocationData } from '../actions';

import type {
  LocationActionViewProps,
  UploadViewProps,
  CreateFolderViewProps,
  CopyViewProps,
  DeleteViewProps,
} from './LocationActionView';
import type { LocationDetailViewProps } from './LocationDetailView';
import type { LocationsViewProps } from './LocationsView';

export interface ActionViewProps {
  className?: string;
}

export interface ListViewState<T = any> {
  onNavigate: (location: LocationData, path?: string) => void;
  onPaginate: (page: number) => void;
  page: number;
  pageItems: T[];
}

export interface ListViewProps
  extends ActionViewProps,
    Partial<ListViewState> {}

export type StorageBrowserViews<T = string, K = {}> = Partial<
  PrimaryViews<T> & DefaultActionViews & K
>;

export interface PrimaryViews<T = string> {
  LocationActionView: (
    props: LocationActionViewProps<T>
  ) => React.JSX.Element | null;
  LocationDetailView: (
    props: LocationDetailViewProps
  ) => React.JSX.Element | null;
  LocationsView: (props: LocationsViewProps) => React.JSX.Element | null;
}

export interface DefaultActionViews {
  CreateFolderView: (props: CreateFolderViewProps) => React.JSX.Element | null;
  CopyView: (props: CopyViewProps) => React.JSX.Element | null;
  DeleteView: (props: DeleteViewProps) => React.JSX.Element | null;
  UploadView: (props: UploadViewProps) => React.JSX.Element | null;
}

export interface DefaultActionViewsByActionName {
  createFolder: (props: CreateFolderViewProps) => React.JSX.Element | null;
  copy: (props: CopyViewProps) => React.JSX.Element | null;
  delete: (props: DeleteViewProps) => React.JSX.Element | null;
  upload: (props: UploadViewProps) => React.JSX.Element | null;
}
