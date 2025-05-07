import React from 'react';
import { classNames } from '@aws-amplify/ui';

import { STORAGE_BROWSER_BLOCK, ViewElement } from '../../../components';
import {
  ActionCancelControl,
  ActionDestinationControl,
  ActionExitControl,
  ActionStartControl,
  AddFilesControl,
  AddFolderControl,
  DataTableControl,
  DropZoneControl,
  OverwriteToggleControl,
  MessageControl,
  StatusDisplayControl,
  TitleControl,
} from '../../../controls';

import { UploadViewProvider } from './UploadViewProvider';
import type { UploadViewType } from './types';
import { useUploadView } from './useUploadView';

export const UploadView: UploadViewType = ({ className, ...props }) => {
  const state = useUploadView(props);

  return (
    <ViewElement className={classNames(STORAGE_BROWSER_BLOCK, className)}>
      <UploadViewProvider {...state}>
        <ActionExitControl />
        <TitleControl />
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__controls`}>
          <OverwriteToggleControl />
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__buttons`}>
            <AddFolderControl />
            <AddFilesControl />
          </ViewElement>
        </ViewElement>
        <DropZoneControl>
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__data-table`}>
            <DataTableControl />
          </ViewElement>
        </DropZoneControl>
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__summary`}>
          <ActionDestinationControl />
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
      </UploadViewProvider>
    </ViewElement>
  );
};

UploadView.displayName = 'UploadView';

UploadView.Provider = UploadViewProvider;

UploadView.AddFiles = AddFilesControl;
UploadView.AddFolder = AddFolderControl;
UploadView.Cancel = ActionCancelControl;
UploadView.Destination = ActionDestinationControl;
UploadView.DropZone = DropZoneControl;
UploadView.Exit = ActionExitControl;
UploadView.Message = MessageControl;
UploadView.OverwriteToggle = OverwriteToggleControl;
UploadView.Start = ActionStartControl;
UploadView.Statuses = StatusDisplayControl;
UploadView.TasksTable = DataTableControl;
UploadView.Title = TitleControl;
