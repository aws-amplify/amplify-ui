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

import { DownloadMultipleViewProvider } from './DownloadMultipleViewProvider';
import { useDownloadMultipleView } from './useDownloadMultipleView';
import { DownloadMultipleViewType } from './types';
import { classNames } from '@aws-amplify/ui';

export const DownloadMultipleView: DownloadMultipleViewType = ({
  className,
  ...props
}) => {
  const state = useDownloadMultipleView(props);

  return (
    <ViewElement className={classNames(STORAGE_BROWSER_BLOCK, className)}>
      <DownloadMultipleViewProvider {...state}>
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
      </DownloadMultipleViewProvider>
    </ViewElement>
  );
};

DownloadMultipleView.displayName = 'DownloadMultipleView';

DownloadMultipleView.Provider = DownloadMultipleViewProvider;

DownloadMultipleView.Cancel = ActionCancelControl;
DownloadMultipleView.Exit = ActionExitControl;
DownloadMultipleView.Message = MessageControl;
DownloadMultipleView.Start = ActionStartControl;
DownloadMultipleView.Statuses = StatusDisplayControl;
DownloadMultipleView.TasksTable = DataTableControl;
DownloadMultipleView.Title = TitleControl;
