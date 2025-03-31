export type ActionTypeAction =
  | { type: 'SET_ACTION_TYPE'; actionType: string }
  | { type: 'RESET_ACTION_TYPE' };

export type HandleActionTypeAction = (event: ActionTypeAction) => void;

export type ActionTypeStateContext = [
  string | undefined,
  HandleActionTypeAction,
];

export interface ActionTypeProviderProps {
  /**
   *  Sets initial `actionType`. Provide to initialize the `StorageBrowser` with an initial
   * `actionType`
   */
  actionType?: string;
  children?: React.ReactNode;
}
