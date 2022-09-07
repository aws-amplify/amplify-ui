export interface FileUploaderInputProps {
  multiple?: boolean;
  accept?: Array<string>;
  fileName?: Array<string> | string;
}

export interface FileUploaderProps extends FileUploaderInputProps {
  maxSize?: number;
  maxMultipleSize?: number;
  maxFiles?: number;
  level?: 'public' | 'protected' | 'private';
  path?: string;
  variation?: 'drop' | 'button';
  showPreview?: boolean;
  onSuccess?: () => void;
  onError?: () => void;
  onChange?: () => void;
}

export type FileNameProps = (
  fileName: string | Array<string>,
  file: File,
  index: number
) => string;
