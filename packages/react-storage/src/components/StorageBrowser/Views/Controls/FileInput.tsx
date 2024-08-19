import React from 'react';
import { useControl } from '../../context/controls';
import { ActionType } from '../../context/controls/ActionSelect';
import { LocationItem } from '../../context/actions';

interface FileInputProps {
  actionName: string;
  actionType: Exclude<ActionType, 'CREATE_FOLDER'>;
}

export interface FileInput {
  (props: FileInputProps): React.JSX.Element;
}

const UPLOAD_FILES_INPUT_ATTRIBUTES = {
  multiple: true,
};

const UPLOAD_FOLDER_INPUT_ATTRIBUTES = {
  webkitdirectory: '',
};

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ actionName, actionType }, ref) => {
    const [{ history }] = useControl({ type: 'NAVIGATE' });
    const fileUploadRef = React.useRef<HTMLInputElement>(null);

    const [{ selected }, handleUpdateState] = useControl({
      type: 'ACTION_SELECT',
    });

    const destination = history[history.length - 1];

    const handleInputChange = () => {
      if (fileUploadRef.current?.files) {
        const files: FileList = fileUploadRef.current?.files;

        const { items: prevSelectedItems } = selected;
        const items = prevSelectedItems ?? [];

        const locationItemsMap = new Map<string, LocationItem>();

        items.forEach((item) => {
          const { key } = item;
          locationItemsMap.set(key, item);
        });

        for (const data of files) {
          const { name, lastModified, size, webkitRelativePath } = data;

          const key =
            actionType === 'UPLOAD_FOLDER' ? webkitRelativePath : name;

          locationItemsMap.set(key, {
            key,
            data,
            lastModified: new Date(lastModified),
            size,
            type: 'FILE',
          });
        }

        handleUpdateState({
          actionType: actionType,
          type: 'SELECT_ACTION_TYPE',
          destination,
          items: Array.from(locationItemsMap.values()),
          name: actionName,
        });
      }
    };

    React.useImperativeHandle(ref, () => {
      return fileUploadRef.current!;
    });

    return (
      <input
        data-testid="FileInput"
        ref={fileUploadRef}
        onChange={() => handleInputChange()}
        style={{ display: 'none' }}
        type="file"
        {...(actionType === 'UPLOAD_FILES'
          ? UPLOAD_FILES_INPUT_ATTRIBUTES
          : UPLOAD_FOLDER_INPUT_ATTRIBUTES)}
      />
    );
  }
);

FileInput.displayName = 'FileInput';
