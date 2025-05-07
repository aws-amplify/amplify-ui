import React from 'react';

import type { ActionViewsContextType } from './types';
import { UploadView } from '../LocationActionView/UploadView';
import { CreateFolderView } from '../LocationActionView/CreateFolderView';
import { CopyView } from '../LocationActionView/CopyView';
import { DeleteView } from '../LocationActionView/DeleteView';

import type { DefaultActionViewsByActionName } from '../types';

export const DEFAULT_ACTION_VIEWS: DefaultActionViewsByActionName = {
  createFolder: CreateFolderView,
  copy: CopyView,
  delete: DeleteView,
  upload: UploadView,
};

export const ActionViewsContext = React.createContext<ActionViewsContextType>({
  action: DEFAULT_ACTION_VIEWS,
});

export function useActionViews(): ActionViewsContextType {
  return React.useContext(ActionViewsContext);
}
