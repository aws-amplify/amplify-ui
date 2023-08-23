import { DropZone, ThemeProvider, createTheme } from '@aws-amplify/ui-react';

const theme = createTheme({
  name: 'dropzone-theme',
  tokens: {
    components: {
      dropzone: {
        backgroundColor: '{colors.brand.primary.10}',
        borderColor: '{colors.brand.primary.80}',
      },
    },
  },
});

export default function DropZoneThemeExample() {
  return (
    <ThemeProvider theme={theme}>
      <DropZone
        maxFileCount={3}
        onDropComplete={({ files }) => {
          console.log(files);
        }}
      >
        Drag images here
      </DropZone>
    </ThemeProvider>
  );
}
