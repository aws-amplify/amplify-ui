import React from 'react';

import {
  STORAGE_BROWSER_BLOCK,
  STORAGE_BROWSER_BLOCK_TO_BE_UPDATED,
} from '../../../constants';

import { ViewElement } from '../../../context/elements';

import { ActionCancelControl } from '../../../controls/ActionCancelControl';
import { ActionExitControl } from '../../../controls/ActionExitControl';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { DataTableControl } from '../../../controls/DataTableControl';
import { LoadingIndicatorControl } from '../../../controls/LoadingIndicatorControl';
import { MessageControl } from '../../../controls/MessageControl';
import { SearchControl } from '../../../controls/SearchControl';
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
        <ViewElement
          className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__table-wrapper`}
        >
          <DataTableControl />
        </ViewElement>
        {isProcessing || isProcessingComplete ? null : (
          <>
            <ViewElement
              className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__copy-destination-header`}
            >
              <ViewElement
                className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__search`}
              >
                <SearchControl />
              </ViewElement>
              <FoldersPaginationControl />
            </ViewElement>
            <ViewElement
              className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__table-wrapper`}
            >
              <LoadingIndicatorControl />
              <FoldersTableControl />
              <FoldersMessageControl />
            </ViewElement>
          </>
        )}
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}-footer`}>
          <ActionDestinationControl />
          {!(isProcessing || isProcessingComplete) ? null : (
            <StatusDisplayControl />
          )}
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__message`}>
            <MessageControl />
          </ViewElement>
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
CopyView.FoldersSearch = SearchControl;
CopyView.FoldersTable = FoldersTableControl;
CopyView.Message = MessageControl;
CopyView.Start = ActionStartControl;
CopyView.Statuses = StatusDisplayControl;
CopyView.TasksTable = DataTableControl;
CopyView.Title = TitleControl;
