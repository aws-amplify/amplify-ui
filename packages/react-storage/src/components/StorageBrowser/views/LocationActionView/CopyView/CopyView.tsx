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

import { resolveClassName } from '../../utils';

import { CopyViewProvider } from './CopyViewProvider';
import { DestinationControl } from './DestinationControl';
import { FoldersMessageControl } from './FoldersMessageControl';
import { FoldersPaginationControl } from './FoldersPaginationControl';
import { FoldersTableControl } from './FoldersTableControl';
import { CopyViewProps } from './types';
import { useCopyView } from './useCopyView';

export function CopyView({
  className,
  ...props
}: CopyViewProps): React.JSX.Element {
  const state = useCopyView(props);
  const {
    isProcessing,
    isProcessingComplete,
    folders: { onInitialize },
  } = state;

  React.useEffect(() => {
    onInitialize();
  }, [onInitialize]);

  return (
    <div className={resolveClassName(STORAGE_BROWSER_BLOCK, className)}>
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
              className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__action-destination`}
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
          <DestinationControl />
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
    </div>
  );
}

CopyView.displayName = 'CopyView';

CopyView.Provider = CopyViewProvider;

CopyView.Cancel = ActionCancelControl;
CopyView.Destination = DestinationControl;
CopyView.Exit = ActionExitControl;
CopyView.Folders = FoldersTableControl;
CopyView.FoldersLoading = LoadingIndicatorControl;
CopyView.FoldersMessage = FoldersMessageControl;
CopyView.FoldersPagination = FoldersPaginationControl;
CopyView.FoldersSearch = SearchControl;
CopyView.Message = MessageControl;
CopyView.Start = ActionStartControl;
CopyView.Statuses = StatusDisplayControl;
CopyView.Tasks = DataTableControl;
CopyView.Title = TitleControl;
