import { LocationData } from '../actions';

export interface ActionViewProps {
  className?: string;
}

export interface ListViewState<T = any> {
  onNavigate: (location: LocationData) => void;
  onPaginate: (page: number) => void;
  page: number;
  pageItems: T[];
}

export interface ListViewProps
  extends ActionViewProps,
    Partial<ListViewState> {}
