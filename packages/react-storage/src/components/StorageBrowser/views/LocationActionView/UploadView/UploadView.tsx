import React from 'react';

import { STORAGE_BROWSER_BLOCK } from '../../../constants';
import { ViewElement } from '../../../context/elements';
import { ActionCancelControl } from '../../../controls/ActionCancelControl';
import { ActionDestinationControl } from '../../../controls/ActionDestinationControl';
import { ActionExitControl } from '../../../controls/ActionExitControl';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { AddFilesControl } from '../../../controls/AddFilesControl';
import { AddFolderControl } from '../../../controls/AddFolderControl';
import { DataTableControl } from '../../../controls/DataTableControl';
import { DropZoneControl } from '../../../controls/DropZoneControl';
import { OverwriteToggleControl } from '../../../controls/OverwriteToggleControl';
import { MessageControl } from '../../../controls/MessageControl';
import { StatusDisplayControl } from '../../../controls/StatusDisplayControl';
import { TitleControl } from '../../../controls/TitleControl';

import { UploadViewProvider } from './UploadViewProvider';
import { UploadViewType } from './types';
import { useUploadView } from './useUploadView';
import { classNames } from '@aws-amplify/ui';

export const UploadView: UploadViewType = ({ className, ...props }) => {
  // eslint-disable-next-line no-console
  console.log('props', props);

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
