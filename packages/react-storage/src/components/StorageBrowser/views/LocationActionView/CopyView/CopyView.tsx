import React from 'react';

import { STORAGE_BROWSER_BLOCK } from '../../../constants';

import { ViewElement } from '../../../context/elements';

import { ActionCancelControl } from '../../../controls/ActionCancelControl';
import { ActionExitControl } from '../../../controls/ActionExitControl';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { DataTableControl } from '../../../controls/DataTableControl';
import { LoadingIndicatorControl } from '../../../controls/LoadingIndicatorControl';
import { MessageControl } from '../../../controls/MessageControl';
import { SearchFieldControl } from '../../../controls/SearchFieldControl';
import { StatusDisplayControl } from '../../../controls/StatusDisplayControl';
import { TitleControl } from '../../../controls/TitleControl';

import { CopyViewProvider } from './CopyViewProvider';
import { FoldersMessageControl } from './FoldersMessageControl';
import { FoldersPaginationControl } from './FoldersPaginationControl';
import { FoldersTableControl } from './FoldersTableControl';
import { ActionDestinationControl } from '../../../controls/ActionDestinationControl';

import { CopyViewType } from './types';
import { useCopyView } from './useCopyView';
import { classNames } from '@aws-amplify/ui';

export const CopyView: CopyViewType = ({ className, ...props }) => {
  const state = useCopyView(props);
  const { isProcessing, isProcessingComplete } = state;

  return (
    <ViewElement className={classNames(STORAGE_BROWSER_BLOCK, className)}>
      <CopyViewProvider {...state}>
        <ActionExitControl />
        <TitleControl />
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__data-table`}>
          <DataTableControl />
        </ViewElement>
        {isProcessing || isProcessingComplete ? null : (
          <>
            <ViewElement className={`${STORAGE_BROWSER_BLOCK}__controls`}>
              <ViewElement className={`${STORAGE_BROWSER_BLOCK}__search`}>
                <SearchFieldControl />
              </ViewElement>
              <FoldersPaginationControl />
            </ViewElement>
            <ViewElement className={`${STORAGE_BROWSER_BLOCK}__data-table`}>
              <LoadingIndicatorControl />
              <FoldersTableControl />
              <FoldersMessageControl />
            </ViewElement>
          </>
        )}
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__summary`}>
          <ActionDestinationControl />
          <StatusDisplayControl />
        </ViewElement>
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__footer`}>
          <MessageControl />
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__buttons`}>
            <ActionCancelControl />
            <ActionStartControl />
          </ViewElement>
        </ViewElement>
      </CopyViewProvider>
    </ViewElement>
  );
};

CopyView.displayName = 'CopyView';

CopyView.Provider = CopyViewProvider;

CopyView.Cancel = ActionCancelControl;
CopyView.Destination = ActionDestinationControl;
CopyView.Exit = ActionExitControl;
CopyView.FoldersLoadingIndicator = LoadingIndicatorControl;
CopyView.FoldersMessage = FoldersMessageControl;
CopyView.FoldersPagination = FoldersPaginationControl;
CopyView.FoldersSearch = SearchFieldControl;
CopyView.FoldersTable = FoldersTableControl;
CopyView.Message = MessageControl;
CopyView.Start = ActionStartControl;
CopyView.Statuses = StatusDisplayControl;
CopyView.TasksTable = DataTableControl;
CopyView.Title = TitleControl;
