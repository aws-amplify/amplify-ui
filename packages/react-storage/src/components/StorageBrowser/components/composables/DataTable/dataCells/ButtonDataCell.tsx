/* eslint-disable no-console */
import React from 'react';

import { STORAGE_BROWSER_BLOCK } from '../../../base';
import type {
  ButtonElementVariant,
  StorageBrowserIconType,
} from '../../../elements';
import { ButtonElement } from '../../../elements';

export interface ButtonDataCellProps {
  content: {
    icon?: StorageBrowserIconType;
    label?: string;
    onClick?: () => void;
    ariaLabel?: string;
    isDisabled?: boolean;
  };
}

const getFileIcon = (
  fileType: string
): { icon: string; color: string; bgColor: string } => {
  const iconMap: Record<
    string,
    { icon: string; color: string; bgColor: string }
  > = {
    image: { icon: '🖼️', color: '#10b981', bgColor: '#d1fae5' },
    video: { icon: '🎬', color: '#8b5cf6', bgColor: '#ede9fe' },
    audio: { icon: '🎵', color: '#f59e0b', bgColor: '#fef3c7' },
    pdf: { icon: '📄', color: '#dc2626', bgColor: '#fee2e2' },
    excel: { icon: '📊', color: '#059669', bgColor: '#d1fae5' },
    word: { icon: '📝', color: '#2563eb', bgColor: '#dbeafe' },
    powerpoint: { icon: '📽️', color: '#dc2626', bgColor: '#fee2e2' },
    archive: { icon: '🗜️', color: '#7c3aed', bgColor: '#ede9fe' },
    code: { icon: '💻', color: '#374151', bgColor: '#f3f4f6' },
    text: { icon: '📃', color: '#6b7280', bgColor: '#f9fafb' },
    unknown: { icon: '📄', color: '#9ca3af', bgColor: '#f3f4f6' },
    folder: { icon: '📁', color: '#f59e0b', bgColor: '#fef3c7' },
  };

  return iconMap[fileType] || iconMap.unknown;
};

const FILE_TYPE_CATEGORIES: Record<string, string> = {
  // Images
  jpg: 'image',
  jpeg: 'image',
  png: 'image',
  gif: 'image',
  bmp: 'image',
  svg: 'image',
  webp: 'image',
  ico: 'image',
  tiff: 'image',

  // Videos
  mp4: 'video',
  avi: 'video',
  mov: 'video',
  wmv: 'video',
  flv: 'video',
  webm: 'video',
  mkv: 'video',
  m4v: 'video',
  '3gp': 'video',

  // Audio
  mp3: 'audio',
  wav: 'audio',
  flac: 'audio',
  aac: 'audio',
  ogg: 'audio',
  wma: 'audio',
  m4a: 'audio',

  // Documents
  pdf: 'pdf',

  // Excel
  xls: 'excel',
  xlsx: 'excel',
  csv: 'excel',

  // Word
  doc: 'word',
  docx: 'word',
  rtf: 'word',

  // PowerPoint
  ppt: 'powerpoint',
  pptx: 'powerpoint',

  // Archives
  zip: 'archive',
  rar: 'archive',
  '7z': 'archive',
  tar: 'archive',
  gz: 'archive',
  bz2: 'archive',

  // Code files
  js: 'code',
  ts: 'code',
  jsx: 'code',
  tsx: 'code',
  html: 'code',
  css: 'code',
  scss: 'code',
  sass: 'code',
  less: 'code',
  json: 'code',
  xml: 'code',
  py: 'code',
  java: 'code',
  cpp: 'code',
  c: 'code',
  php: 'code',
  rb: 'code',
  go: 'code',
  rs: 'code',
  swift: 'code',
  kt: 'code',

  // Text files
  txt: 'text',
  md: 'text',
  log: 'text',
  ini: 'text',
  cfg: 'text',
  folder: 'folder',
};

const getFileExtension = (filename: string): string => {
  const lastDot = filename?.lastIndexOf?.('.');

  if (!filename || lastDot === -1) return 'folder';

  return filename.slice(lastDot + 1).toLowerCase();
};

const getFileTypeCategory = (filename: string): string => {
  const extension = getFileExtension(filename);
  return FILE_TYPE_CATEGORIES[extension] || 'unknown';
};

export const ButtonDataCell = ({
  content,
}: ButtonDataCellProps): React.JSX.Element => {
  const { ariaLabel, isDisabled, icon, label, onClick } = content;

  console.log('[preview] render ButtonDataCell', content);

  // Special handling for icon-only cancel buttons
  let buttonVariant: ButtonElementVariant = 'table-data';
  const isIconOnlyButton = !!icon && !label;
  if (isIconOnlyButton && icon === 'cancel') {
    buttonVariant = 'cancel';
  }

  const onClickButton = (e: any) => {
    console.log('[preview] ButtonDataCell calling on click', content);
    //@ts-expect-error
    onClick?.(e);
  };

  return (
    <ButtonElement
      className={[
        `${STORAGE_BROWSER_BLOCK}__table-button-data-cell`,
        isIconOnlyButton
          ? `${STORAGE_BROWSER_BLOCK}__table-button-data-cell--icon-only`
          : '',
      ].join(' ')}
      disabled={isDisabled}
      onClick={onClickButton}
      aria-label={ariaLabel}
      variant={buttonVariant}
    >
      {icon && <span>{getFileIcon(getFileTypeCategory(label!)).icon}</span>}
      {label}
    </ButtonElement>
  );
};
