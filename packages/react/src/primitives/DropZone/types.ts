import * as React from 'react';
import { ElementType, PrimitiveProps, BaseViewProps } from '../types';
import { UseDropZoneParams } from '@aws-amplify/ui-react-core';

export interface BaseDropZoneProps extends BaseViewProps, UseDropZoneParams {}

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

export interface BaseDropZoneContainerProps extends BaseViewProps, DragEvents {}

export type DropZoneContainerProps<Element extends ElementType = 'div'> =
  PrimitiveProps<BaseDropZoneContainerProps, Element>;
