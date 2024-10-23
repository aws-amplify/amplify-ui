export type ActionTypeAction =
  | { type: 'SET_ACTION_TYPE'; actionType: string }
  | { type: 'RESET' };

export type HandleActionTypeAction = (event: ActionTypeAction) => void;

export type ActionTypeStateContext = [
  string | undefined,
  HandleActionTypeAction,
];

export interface ActionTypeProviderProps {
  actionType?: string;
  children?: React.ReactNode;
}
