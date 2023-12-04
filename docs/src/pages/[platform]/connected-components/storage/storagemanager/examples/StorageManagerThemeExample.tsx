import { ThemeProvider } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';

const theme = {
  name: 'my-theme',
  tokens: {
    borderWidths: {
      small: '2px',
    },
    components: {
      storagemanager: {
        dropzone: {
          borderColor: '{colors.primary.60}',
        },
      },
    },
  },
};

export const StorageManagerThemeExample = () => {
  return (
    <ThemeProvider theme={theme}>
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="guest"
        maxFileCount={5}
      />
    </ThemeProvider>
  );
};
