import { DEFAULT_COPY_VIEW_DISPLAY_TEXT } from './libraries/en/copyView';
import { DEFAULT_DELETE_VIEW_DISPLAY_TEXT } from './libraries/en/deleteView';
import type { CopyViewDisplayText, DeleteViewDisplayText } from './types';

export const isCopyViewDisplayTextKey = (
  value: string
): value is keyof CopyViewDisplayText =>
  !!DEFAULT_COPY_VIEW_DISPLAY_TEXT[value as keyof CopyViewDisplayText];

export const isDeleteViewDisplayTextKey = (
  value: string
): value is keyof DeleteViewDisplayText =>
  !!DEFAULT_DELETE_VIEW_DISPLAY_TEXT[value as keyof DeleteViewDisplayText];
