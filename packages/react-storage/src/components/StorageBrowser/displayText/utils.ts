import { DEFAULT_COPY_VIEW_DISPLAY_TEXT } from './libraries/en/copyView';
import { DEFAULT_DELETE_VIEW_DISPLAY_TEXT } from './libraries/en/deleteView';
import { DEFAULT_DOWNLOAD_MULTIPLE_VIEW_DISPLAY_TEXT } from './libraries/en/downloadMultipleView';
import type {
  CopyViewDisplayText,
  DeleteViewDisplayText,
  DownloadMultipleViewDisplayText,
} from './types';

export const isCopyViewDisplayTextKey = (
  value: string
): value is keyof CopyViewDisplayText =>
  !!DEFAULT_COPY_VIEW_DISPLAY_TEXT[value as keyof CopyViewDisplayText];

export const isDeleteViewDisplayTextKey = (
  value: string
): value is keyof DeleteViewDisplayText =>
  !!DEFAULT_DELETE_VIEW_DISPLAY_TEXT[value as keyof DeleteViewDisplayText];

export const isDownloadMultipleViewDisplayTextKey = (
  value: string
): value is keyof DownloadMultipleViewDisplayText =>
  !!DEFAULT_DOWNLOAD_MULTIPLE_VIEW_DISPLAY_TEXT[
    value as keyof DownloadMultipleViewDisplayText
  ];
