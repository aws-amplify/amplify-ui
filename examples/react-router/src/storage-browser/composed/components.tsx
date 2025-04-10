import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import {
  ThemeProvider as MaterialThemeProvider,
  createTheme,
} from '@mui/material/styles';

import {
  ActionCancelProps,
  ActionDestinationProps,
  ActionExitProps,
  ActionStartProps,
  // ActionsListProps,
  AddFilesProps,
  AddFolderProps,
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
  TitleProps,
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

export function ActionDestination({ items, label }: ActionDestinationProps) {
  return (
    <Breadcrumbs aria-label={label}>
      {items.map(({ isCurrent, name }) => (
        <Link
          color={isCurrent ? 'text.primary' : undefined}
          underline="none"
          key={name}
        >
          {name}&nbsp;/&nbsp;
        </Link>
      ))}
    </Breadcrumbs>
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

export function AddFiles({ label, onAddFiles }: AddFilesProps) {
  console.log('onAddFiles', onAddFiles);

  return <Button onClick={onAddFiles}>{label}</Button>;
}

export function AddFolder({ label, onAddFolder }: AddFolderProps) {
  return <Button onClick={onAddFolder}>{label}</Button>;
}

export function Title({ title }: TitleProps) {
  return <Typography variant="h5">{title}</Typography>;
}
