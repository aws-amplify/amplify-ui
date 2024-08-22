import React from 'react';

/**
 * @internal @unstable
 */
export interface FileSelectProps {
  accept?: string;
  multiple?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  type?: 'file' | 'folder';
}

/**
 * @internal @unstable
 */
export interface FileSelectOptions
  extends Omit<FileSelectProps, 'onChange' | 'type'> {}

type HandleSelect = (
  type: 'file' | 'folder',
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
  function FileSelect({ multiple = true, type = 'file', ...props }, ref) {
    return (
      <input
        {...DEFAULT_PROPS}
        {...(type === 'folder' ? { webkitdirectory: '' } : undefined)}
        {...props}
        multiple={multiple}
        ref={ref}
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
  const handleSelect = React.useRef<HandleSelect>((type, options) => {
    setInputProps({ type, ...options });
  }).current;

  React.useEffect(() => {
    if (inputProps) {
      ref.current?.click();
    }

    return () => {
      setInputProps(undefined);
    };
  }, [inputProps]);

  const fileSelect = (
    <FileSelect
      {...inputProps}
      onChange={({ target }) => {
        onSelect?.([...(target.files ?? [])]);
      }}
      ref={ref}
    />
  );

  return [fileSelect, handleSelect];
};
