import type { DefaultStorageBrowserDisplayText } from '../../types';

import { DEFAULT_CREATE_FOLDER_VIEW_DISPLAY_TEXT } from './createFolderView';
import { DEFAULT_COPY_VIEW_DISPLAY_TEXT } from './copyView';
import { DEFAULT_DELETE_VIEW_DISPLAY_TEXT } from './deleteView';
import { DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT } from './locationDetailView';
import { DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT } from './locationsView';
import { DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT } from './uploadView';

export const DEFAULT_STORAGE_BROWSER_DISPLAY_TEXT: DefaultStorageBrowserDisplayText =
  {
    CopyView: DEFAULT_COPY_VIEW_DISPLAY_TEXT,
    CreateFolderView: DEFAULT_CREATE_FOLDER_VIEW_DISPLAY_TEXT,
    DeleteView: DEFAULT_DELETE_VIEW_DISPLAY_TEXT,
    LocationDetailView: DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT,
    LocationsView: DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT,
    UploadView: DEFAULT_UPLOAD_VIEW_DISPLAY_TEXT,
  };
