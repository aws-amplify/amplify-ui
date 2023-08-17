import * as React from 'react';
import { ElementType, PrimitiveProps, BaseViewProps } from '../types';

interface DropProps {
  files: File[];
  rejectedFiles: File[];
}

export type OnDrop = (props: DropProps) => void;

export interface BaseDropZoneProps extends BaseViewProps {
  children?: React.ReactNode;
  onDrop: (props: DropProps) => void;
  inputRef?: React.RefObject<HTMLInputElement>;

  testId?: string;
  /**
   * List of accepted File types, values of `['*']` or undefined allow any files
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
   */
  acceptedFileTypes?: string[];
  /**
   * Maximum total files to upload in each batch
   */
  maxFileCount: number;
  /**
   * Maximum file size in bytes
   */
  maxFileSize?: number;
}

export type DropZoneProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseDropZoneProps,
  Element
>;
