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
          borderColor: '{colors.brand.primary.60}',
        },
      },
    },
  },
};

export const StorageManagerThemeExample = () => {
  return (
    // @ts-ignore // IGNORE
    <ThemeProvider theme={theme}>
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        maxFileCount={5}
        provider="fast" // IGNORE
      />
    </ThemeProvider>
  );
};
