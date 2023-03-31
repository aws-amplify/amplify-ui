import { ThemeProvider } from '@aws-amplify/ui-react'; // IGNORE
import { StorageManager } from '@aws-amplify/ui-react-storage'; // IGNORE

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
