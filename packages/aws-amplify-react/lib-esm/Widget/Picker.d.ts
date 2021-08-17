import * as React from 'react';
export interface IPickerProps {
  accept?: string;
  onPick?: (data: any) => void;
  title?: string;
  theme?: any;
}
export declare class Picker extends React.Component<IPickerProps, {}> {
  handleInput(e: any): void;
  render(): JSX.Element;
}
/**
 * @deprecated use named import
 */
export default Picker;
