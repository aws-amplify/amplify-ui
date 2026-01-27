import type { DeleteHandlerData, LocationData } from '../../../actions';
import type { ActionConfirmationModalProps } from '../../../components/composables/ActionConfirmationModal';
import type {
  ActionViewType,
  ActionViewProps,
  ActionViewState,
} from '../types';

export interface DeleteViewState extends ActionViewState<DeleteHandlerData> {
  onConfirmDelete: () => void;
  onCancelConfirmation: () => void;
  confirmationModal: Omit<
    ActionConfirmationModalProps,
    'onConfirm' | 'onCancel'
  >;
}

export interface DeleteViewProps extends ActionViewProps {}

export interface DeleteViewProviderProps extends DeleteViewState {
  children?: React.ReactNode;
}

export interface DeleteViewType
  extends ActionViewType<DeleteHandlerData, DeleteViewProps> {
  Provider: (props: DeleteViewProviderProps) => React.JSX.Element;
  Cancel: () => React.JSX.Element | null;
  ConfirmationModal: (props: any) => React.JSX.Element;
  Exit: () => React.JSX.Element | null;
  Message: () => React.JSX.Element | null;
  Start: () => React.JSX.Element | null;
  Statuses: () => React.JSX.Element | null;
  TasksTable: () => React.JSX.Element | null;
  Title: () => React.JSX.Element | null;
}

export interface UseDeleteViewOptions {
  onExit?: (location?: LocationData) => void;
}
