import React from 'react';
import { classNames } from '@aws-amplify/ui';
import { Text, View } from '@aws-amplify/ui-react';

import { ViewElement } from '../../../components/elements';
import { ActionCancelControl } from '../../../controls/ActionCancelControl';
import { ActionConfirmationModalControl } from '../../../controls/ActionConfirmationModalControl';
import { ActionExitControl } from '../../../controls/ActionExitControl';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { DataTableControl } from '../../../controls/DataTableControl';
import { MessageControl } from '../../../controls/MessageControl';
import { StatusDisplayControl } from '../../../controls/StatusDisplayControl';
import { TitleControl } from '../../../controls/TitleControl';

import { STORAGE_BROWSER_BLOCK } from '../../../components';

import { DeleteViewProvider } from './DeleteViewProvider';
import { useDeleteView } from './useDeleteView';
import type { DeleteViewType } from './types';

export const DeleteView: DeleteViewType = ({ className, ...props }) => {
  const state = useDeleteView(props);
  const { showConfirmation, items, onConfirmDelete, onCancelConfirmation } =
    state;

  const folders = items.filter((item) => item.type === 'FOLDER');

  const foldersList = (
    <>
      <Text>Folders list</Text>
      <View
        style={{
          maxHeight: '200px',
          overflowY: 'auto',
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          padding: '8px',
        }}
      >
        {folders.map((folder) => (
          <Text key={folder.id} fontSize="small" marginBottom="xs">
            • {folder.key}
          </Text>
        ))}
      </View>
    </>
  );

  return (
    <ViewElement className={classNames(STORAGE_BROWSER_BLOCK, className)}>
      <DeleteViewProvider {...state}>
        <ActionExitControl />
        <TitleControl />
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__data-table`}>
          <DataTableControl />
        </ViewElement>
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__summary`}>
          <StatusDisplayControl />
        </ViewElement>
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__footer`}>
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__message`}>
            <MessageControl />
          </ViewElement>
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__buttons`}>
            <ActionCancelControl />
            <ActionStartControl />
          </ViewElement>
        </ViewElement>
      </DeleteViewProvider>

      <ActionConfirmationModalControl
        isOpen={showConfirmation}
        title="Confirm Deletion"
        message={`The items that will be deleted contain ${folders.length} folder${folders.length !== 1 ? 's' : ''}`}
        content={foldersList}
        onConfirm={onConfirmDelete}
        onCancel={onCancelConfirmation}
        confirmLabel="Delete"
        cancelLabel="Cancel"
      />
    </ViewElement>
  );
};

DeleteView.displayName = 'DeleteView';

DeleteView.Provider = DeleteViewProvider;

DeleteView.Cancel = ActionCancelControl;
DeleteView.ConfirmationModal = ActionConfirmationModalControl;
DeleteView.Exit = ActionExitControl;
DeleteView.Message = MessageControl;
DeleteView.Start = ActionStartControl;
DeleteView.Statuses = StatusDisplayControl;
DeleteView.TasksTable = DataTableControl;
DeleteView.Title = TitleControl;
