import React from 'react';

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
