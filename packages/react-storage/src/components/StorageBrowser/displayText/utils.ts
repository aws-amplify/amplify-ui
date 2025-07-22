import { DEFAULT_COPY_VIEW_DISPLAY_TEXT } from './libraries/en/copyView';
import { DEFAULT_DELETE_VIEW_DISPLAY_TEXT } from './libraries/en/deleteView';
import { DEFAULT_DOWNLOAD_VIEW_DISPLAY_TEXT } from './libraries/en/downloadView';

import type {
  CopyViewDisplayText,
  DeleteViewDisplayText,
  DownloadViewDisplayText,
} from './types';

export const isCopyViewDisplayTextKey = (
  value: string
): value is keyof CopyViewDisplayText =>
  !!DEFAULT_COPY_VIEW_DISPLAY_TEXT[value as keyof CopyViewDisplayText];

export const isDeleteViewDisplayTextKey = (
  value: string
): value is keyof DeleteViewDisplayText =>
  !!DEFAULT_DELETE_VIEW_DISPLAY_TEXT[value as keyof DeleteViewDisplayText];

export const isDownloadViewDisplayTextKey = (
  value: string
): value is keyof DownloadViewDisplayText =>
  !!DEFAULT_DOWNLOAD_VIEW_DISPLAY_TEXT[value as keyof DownloadViewDisplayText];
