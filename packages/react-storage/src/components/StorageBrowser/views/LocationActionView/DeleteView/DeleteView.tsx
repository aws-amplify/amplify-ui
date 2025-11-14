import React from 'react';
import { Button, Text, View, Heading } from '@aws-amplify/ui-react';

import { ViewElement } from '../../../components/elements';
import { ActionCancelControl } from '../../../controls/ActionCancelControl';
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
import { classNames } from '@aws-amplify/ui';

export const DeleteView: DeleteViewType = ({ className, ...props }) => {
  const state = useDeleteView(props);
  const { showConfirmation, items, onConfirmDelete, onCancelConfirmation } =
    state;

  const folders = items.filter((item) => item.type === 'FOLDER');
  const files = items.filter((item) => item.type === 'FILE');

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

      {showConfirmation && (
        <View
          position="fixed"
          top="0"
          left="0"
          right="0"
          bottom="0"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          style={{
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            backgroundColor="background.primary"
            padding="large"
            borderRadius="medium"
            boxShadow="large"
            maxWidth="500px"
            width="90%"
          >
            <Heading level={4} marginBottom="medium">
              Confirm Deletion
            </Heading>
            <Text marginBottom="medium">
              The items that will be deleted contain {folders.length} folder
              {folders.length !== 1 ? 's' : ''}
            </Text>
            <Text>Folders list</Text>
            <View
              marginBottom="medium"
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
            <View
              style={{
                display: 'flex',
                gap: '8px',
                justifyContent: 'flex-end',
              }}
            >
              <Button onClick={onCancelConfirmation} variation="link">
                Cancel
              </Button>
              <Button
                onClick={onConfirmDelete}
                variation="primary"
                colorTheme="error"
              >
                Delete
              </Button>
            </View>
          </View>
        </View>
      )}
    </ViewElement>
  );
};

DeleteView.displayName = 'DeleteView';

DeleteView.Provider = DeleteViewProvider;

DeleteView.Cancel = ActionCancelControl;
DeleteView.Exit = ActionExitControl;
DeleteView.Message = MessageControl;
DeleteView.Start = ActionStartControl;
DeleteView.Statuses = StatusDisplayControl;
DeleteView.TasksTable = DataTableControl;
DeleteView.Title = TitleControl;
