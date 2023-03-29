import { StorageManager, Theme, ThemeProvider } from '@aws-amplify/ui-react'; // IGNORE

const theme = {
  name: 'my-theme',
  tokens: {
    components: {
      fileuploader: {
        dropzone: {
          borderColor: 'red',
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
        accessLevel="public"
        provider="fast" // IGNORE
      />
    </ThemeProvider>
  );
};
