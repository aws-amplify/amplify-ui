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

import { DownloadViewProvider } from './DownloadViewProvider';
import { useDownloadView } from './useDownloadView';
import type { DownloadViewType } from './types';
import { classNames } from '@aws-amplify/ui';

export const DownloadView: DownloadViewType = ({ className, ...props }) => {
  const state = useDownloadView(props);

  return (
    <ViewElement className={classNames(STORAGE_BROWSER_BLOCK, className)}>
      <DownloadViewProvider {...state}>
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
      </DownloadViewProvider>
    </ViewElement>
  );
};

DownloadView.displayName = 'DownloadView';

DownloadView.Provider = DownloadViewProvider;

DownloadView.Cancel = ActionCancelControl;
DownloadView.Exit = ActionExitControl;
DownloadView.Message = MessageControl;
DownloadView.Start = ActionStartControl;
DownloadView.Statuses = StatusDisplayControl;
DownloadView.TasksTable = DataTableControl;
DownloadView.Title = TitleControl;
