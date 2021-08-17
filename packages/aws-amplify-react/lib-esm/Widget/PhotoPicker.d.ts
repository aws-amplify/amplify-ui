import * as React from 'react';
export interface IPhotoPickerProps {
  headerHint?: string;
  headerText?: string;
  onLoad?: (dataUrl: any) => void;
  onPick?: (data: any) => void;
  preview?: boolean | 'hidden';
  previewSrc?: string;
  title?: string;
  theme?: any;
}
export interface IPhotoPickerState {
  previewSrc?: string;
}
export declare class PhotoPicker extends React.Component<
  IPhotoPickerProps,
  IPhotoPickerState
> {
  constructor(props: any);
  handlePick(data: any): void;
  render(): JSX.Element;
}
/**
 * @deprecated use named import
 */
export default PhotoPicker;
