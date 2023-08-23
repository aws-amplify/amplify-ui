import * as React from 'react';
import { ElementType, PrimitiveProps, BaseViewProps } from '../types';

interface DropProps {
  files: File[];
  rejectedFiles: File[];
}

export interface UseDropZoneProps {
  onDropComplete?: (props: DropProps) => void;
  /**
   * List of accepted File types, values of `['*']` or undefined allow any files
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept
   */
  acceptedFileTypes?: string[];
}

export interface BaseDropZoneProps extends BaseViewProps, UseDropZoneProps {}

export type DropZoneProps<Element extends ElementType = 'div'> = PrimitiveProps<
  BaseDropZoneProps,
  Element
>;

interface DragEvents {
  onDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
}

export interface DragStates {
  isDragActive: boolean;
  isDragAccept: boolean;
  isDragReject: boolean;
}

export interface UseDropZoneReturn extends DragEvents, DragStates {}

export interface BaseDropZoneContainerProps extends BaseViewProps, DragEvents {}

export type DropZoneContainerProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseDropZoneContainerProps, Element>;
