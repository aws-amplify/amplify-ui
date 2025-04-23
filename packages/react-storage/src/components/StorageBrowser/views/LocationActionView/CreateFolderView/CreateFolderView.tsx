import React from 'react';

import { STORAGE_BROWSER_BLOCK } from '../../../components';
import { ViewElement } from '../../../components/elements';
import { ActionStartControl } from '../../../controls/ActionStartControl';
import { ActionExitControl } from '../../../controls/ActionExitControl';
import { FolderNameFieldControl } from '../../../controls/FolderNameFieldControl';
import { MessageControl } from '../../../controls/MessageControl';
import { TitleControl } from '../../../controls/TitleControl';

import { CreateFolderViewProvider } from './CreateFolderViewProvider';
import type { CreateFolderViewType } from './types';
import { useCreateFolderView } from './useCreateFolderView';
import { classNames } from '@aws-amplify/ui';

export const CreateFolderView: CreateFolderViewType = ({
  className,
  ...props
}) => {
  const state = useCreateFolderView(props);

  return (
    <ViewElement className={classNames(STORAGE_BROWSER_BLOCK, className)}>
      <CreateFolderViewProvider {...state}>
        <ActionExitControl />
        <TitleControl />
        <FolderNameFieldControl />
        <ViewElement className={`${STORAGE_BROWSER_BLOCK}__footer`}>
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__message`}>
            <MessageControl />
          </ViewElement>
          <ViewElement className={`${STORAGE_BROWSER_BLOCK}__buttons`}>
            <ActionStartControl />
          </ViewElement>
        </ViewElement>
      </CreateFolderViewProvider>
    </ViewElement>
  );
};

CreateFolderView.displayName = 'CreateFolderView';

CreateFolderView.Provider = CreateFolderViewProvider;

CreateFolderView.Exit = ActionExitControl;
CreateFolderView.NameField = FolderNameFieldControl;
CreateFolderView.Message = MessageControl;
CreateFolderView.Start = ActionStartControl;
CreateFolderView.Title = TitleControl;
