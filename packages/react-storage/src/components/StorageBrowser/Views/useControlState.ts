export type ControlState = [state: Record<string, any>, (input: any) => void];

export const useControlState = (_view: string): ControlState =>
  null as unknown as ControlState;
