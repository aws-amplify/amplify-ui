import { ActionCancel } from './ActionCancel';
import { ActionDestination } from './ActionDestination';
import { ActionExit } from './ActionExit';
import { ActionStart } from './ActionStart';
import { ActionsList } from './ActionsList';
import { AddFiles } from './AddFiles';
import { AddFolder } from './AddFolder';
import { DataRefresh } from './DataRefresh';
import { DataTable } from './DataTable';
import { DropZone } from './DropZone';
import { FolderNameField } from './FolderNameField';
import { LoadingIndicator } from './LoadingIndicator';
import { Message } from './Message';
import { Navigation } from './Navigation';
import { OverwriteToggle } from './OverwriteToggle';
import { Pagination } from './Pagination';
import { SearchField } from './SearchField';
import { SearchSubfoldersToggle } from './SearchSubfoldersToggle';
import { StatusDisplay } from './StatusDisplay';
import { Title } from './Title';

import type { Composables } from './types';

export const DEFAULT_COMPOSABLES: Composables = {
  ActionCancel,
  ActionDestination,
  ActionExit,
  ActionStart,
  ActionsList,
  AddFiles,
  AddFolder,
  DataRefresh,
  DataTable,
  DropZone,
  FolderNameField,
  LoadingIndicator,
  Message,
  Navigation,
  OverwriteToggle,
  Pagination,
  SearchSubfoldersToggle,
  SearchField,
  StatusDisplay,
  Title,
};
