import { ThemeProvider } from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';

const theme = {
  name: 'my-theme',
  tokens: {
    borderWidths: {
      small: '2px',
    },
    components: {
      fileuploader: {
        dropzone: {
          borderColor: '{colors.primary.60}',
        },
      },
    },
  },
};

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StorageManager
        acceptedFileTypes={['image/*']}
        path="public/"
        maxFileCount={5}
      />
    </ThemeProvider>
  );
};
