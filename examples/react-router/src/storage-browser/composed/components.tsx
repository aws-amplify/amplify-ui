import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import {
  ThemeProvider as MaterialThemeProvider,
  createTheme,
} from '@mui/material/styles';

import {
  ActionCancelProps,
  // ActionDestinationProps,
  ActionExitProps,
  ActionStartProps,
  // ActionsListProps,
  // AddFilesProps,
  // AddFolderProps,
  // DataRefreshProps,
  // DataTableProps,
  // DropZoneProps,
  // FolderNameFieldProps,
  // LoadingIndicatorProps,
  // MessageProps,
  // NavigationProps,
  // OverwriteToggleProps,
  // PaginationProps,
  // SearchFieldProps,
  // SearchSubfoldersToggleProps,
  // StatusDisplayProps,
  // TitleProps,
} from './types';

const theme = createTheme({ colorSchemes: { dark: true } });

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <MaterialThemeProvider theme={theme}>
      {/* scopes CSS reset to descendants */}
      <CssBaseline>{children}</CssBaseline>
    </MaterialThemeProvider>
  );
}

export function ActionCancel(props: ActionCancelProps) {
  const { isDisabled, label, onCancel } = props;
  return (
    <Button
      color="secondary"
      onClick={onCancel}
      disabled={isDisabled}
      variant="outlined"
    >
      {label}
    </Button>
  );
}

export function ActionExit(props: ActionExitProps) {
  const { isDisabled, label, onExit } = props;
  return (
    <Button
      color="info"
      onClick={onExit}
      disabled={isDisabled}
      variant="outlined"
    >
      {label}
    </Button>
  );
}

export function ActionStart(props: ActionStartProps) {
  const { isDisabled, label, onStart } = props;
  return (
    <Button onClick={onStart} disabled={isDisabled} variant="contained">
      {label}
    </Button>
  );
}
