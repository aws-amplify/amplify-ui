import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import { useStableId } from '../../primitives/utils/useStableId';

// `FileSelect` input `type` must always be set to `file`
const INPUT_TYPE = 'file';

export type SelectType = 'FILE' | 'FOLDER';

/**
 * @internal @unstable
 */
export interface FileSelectProps {
  accept?: string;
  id?: string;
  multiple?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: SelectType;
  testId?: string;
}

/**
 * @internal @unstable
 */
export interface FileSelectOptions extends Omit<FileSelectProps, 'type'> {}

export type HandleFileSelect = (
  selectType: SelectType,
  options?: FileSelectOptions
) => void;

/**
 * @internal @unstable
 */
export type UseFileSelect = [
  fileSelect: React.ReactNode,
  handleFileSelect: HandleFileSelect,
];

const TEST_ID = 'amplify-file-select';
export const DEFAULT_PROPS = {
  style: { display: 'none' },
  type: 'file',
  'data-testid': TEST_ID,
};

/**
 * @internal @unstable
 */
export const FileSelect = React.forwardRef<HTMLInputElement, FileSelectProps>(
  function FileSelect(
    {
      multiple = true,
      type = 'FILE',
      testId = 'amplify-file-select',
      ...props
    },
    ref
  ) {
    return (
      <input
        {...DEFAULT_PROPS}
        {...props}
        {...(type === 'FOLDER' ? { webkitdirectory: '' } : undefined)}
        data-testid={testId}
        multiple={multiple}
        ref={ref}
        type={INPUT_TYPE}
      />
    );
  }
);

/**
 * @internal @unstable
 *
 * @usage
 * ```tsx
 *  function MyUploadButton() {
 *    const [files, setFiles] = React.useState<File[]>([]);
 *    const [fileSelect, handleFileSelect] = useFileSelect(setFiles);
 *    return (
 *      <>
 *        {fileSelect}
 *        <Button
 *          onClick={() => {
 *            handleFileSelect('file');
 *          }}
 *        />
 *      </>
 *    );
 *  }
 * ```
 */
export const useFileSelect = (
  onSelect?: (files: File[]) => void
): UseFileSelect => {
  const [inputProps, setInputProps] = React.useState<
    FileSelectProps | undefined
  >(undefined);

  const id = useStableId();
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputProps) {
      ref.current?.click();
    }
  }, [id, inputProps]);

  const handleFileSelect: HandleFileSelect = React.useCallback(
    (type, options) => {
      if (id !== ref.current?.id) return;

      setInputProps({ type, ...options });
    },
    [id]
  );

  const fileSelect = (
    <FileSelect
      {...inputProps}
      id={id}
      onChange={(event) => {
        if (isFunction(inputProps?.onChange)) inputProps?.onChange(event);

        if (isFunction(onSelect) && !!event.target.files?.length) {
          onSelect?.([...event.target.files]);
        }

        // Reset the input value to allow re-selecting the same file
        if (ref.current) {
          ref.current.value = '';
        }

        // clean up
        setInputProps(undefined);
      }}
      ref={ref}
    />
  );

  return [fileSelect, handleFileSelect];
};
