import React from 'react';

// `FileSelect` input `type` must always be set to `file`
const INPUT_TYPE = 'file';

export type SelectionType = 'FILE' | 'FOLDER';

/**
 * @internal @unstable
 */
export interface FileSelectProps {
  accept?: string;
  multiple?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  selectionType?: SelectionType;
  testId?: string;
}

/**
 * @internal @unstable
 */
export interface FileSelectOptions
  extends Omit<FileSelectProps, 'onChange' | 'type'> {}

type HandleSelect = (
  selectionTyoe: SelectionType,
  options?: FileSelectOptions
) => void;

/**
 * @internal @unstable
 */
export type UseFileSelect = [
  fileSelect: React.ReactNode,
  handleSelect: HandleSelect,
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
      selectionType = 'FILE',
      testId = 'amplify-file-select',
      ...props
    },
    ref
  ) {
    return (
      <input
        {...DEFAULT_PROPS}
        {...props}
        {...(selectionType === 'FOLDER' ? { webkitdirectory: '' } : undefined)}
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
 *    const [fileSelect, handleSelect] = useFileSelect(setFiles);
 *    return (
 *      <>
 *        {fileSelect}
 *        <Button
 *          onClick={() => {
 *            handleSelect('file');
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

  const ref = React.useRef<HTMLInputElement>(null);
  const handleSelect: HandleSelect = React.useCallback(
    (selectionType, options) => {
      setInputProps({ selectionType, ...options });
    },
    []
  );

  React.useEffect(() => {
    if (inputProps) {
      ref.current?.click();
    }
  }, [inputProps]);

  const fileSelect = (
    <FileSelect
      {...inputProps}
      onChange={({ target }) => {
        onSelect?.([...(target.files ?? [])]);
        setInputProps(undefined);
      }}
      ref={ref}
    />
  );

  return [fileSelect, handleSelect];
};
