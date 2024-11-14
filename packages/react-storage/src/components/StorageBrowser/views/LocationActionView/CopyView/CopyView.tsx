import React from 'react';

import { AMPLIFY_CLASS_BASE, CLASS_BASE } from '../../constants';

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
import { FoldersPaginatationControl } from './FoldersPaginatationControl';
import { FoldersTableControl } from './FoldersTableControl';
import { CopyViewProps } from './types';
import { useCopyView } from './useCopyView';

export function CopyView({
  className,
  ...props
}: CopyViewProps): React.JSX.Element {
  const state = useCopyView(props);
  const { isProcessing, isProcessingComplete } = state;

  return (
    <div className={resolveClassName(AMPLIFY_CLASS_BASE, className)}>
      <CopyViewProvider {...state}>
        <ActionExitControl />
        <TitleControl />
        <ViewElement className={`${CLASS_BASE}__table-wrapper`}>
          <DataTableControl />
        </ViewElement>
        {isProcessing || isProcessingComplete ? null : (
          <>
            <ViewElement className={`${CLASS_BASE}__action-destination`}>
              <SearchControl />
              <FoldersPaginatationControl />
            </ViewElement>
            <ViewElement className={`${CLASS_BASE}__table-wrapper`}>
              <LoadingIndicatorControl />
              <FoldersTableControl />
              <FoldersMessageControl />
            </ViewElement>
          </>
        )}
        <ViewElement className={`${AMPLIFY_CLASS_BASE}-footer`}>
          <DestinationControl />
          {!(isProcessing || isProcessingComplete) ? null : (
            <StatusDisplayControl />
          )}
          <MessageControl />
          <ViewElement className={`${AMPLIFY_CLASS_BASE}__buttons`}>
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
CopyView.FoldersPagination = FoldersPaginatationControl;
CopyView.FoldersSearch = SearchControl;
CopyView.Message = MessageControl;
CopyView.Start = ActionStartControl;
CopyView.Statuses = StatusDisplayControl;
CopyView.Tasks = DataTableControl;
CopyView.Title = TitleControl;
