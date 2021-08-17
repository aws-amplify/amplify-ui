import * as React from 'react';
export interface ITextPickerProps {
  onLoad?: (dataUrl: any) => void;
  onPick?: (data: any) => void;
  preview?: 'hidden';
  previewText?: string;
  theme?: any;
  title?: string;
}
export interface ITextPickerState {
  previewText: string;
}
export declare class TextPicker extends React.Component<
  ITextPickerProps,
  ITextPickerState
> {
  constructor(props: any);
  handlePick(data: any): void;
  render(): JSX.Element;
}
/**
 * @deprecated use named import
 */
export default TextPicker;
