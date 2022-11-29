import { FileUploader, ThemeProvider, View } from '@aws-amplify/ui-react';

const theme = {
  name: 'my-theme',
  tokens: {
    colors: {},
    borderWidths: {
      small: { value: '2px' },
      medium: { value: '4px' },
      large: { value: '8px' },
    },
    radii: {
      xs: { value: '1rem' },
      small: { value: '2rem' },
      medium: { value: '2rem' },
      large: { value: '2rem' },
      xl: { value: '3rem' },
    },
  },
};

export const FileUploaderThemeExample = () => {
  return (
    <ThemeProvider theme={theme}>
      <FileUploader
        variation="drop"
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        hasMultipleFiles={true}
        maxSize={100000000}
        maxFiles={3}
        provider="fast" // IGNORE
      />
    </ThemeProvider>
  );
};
