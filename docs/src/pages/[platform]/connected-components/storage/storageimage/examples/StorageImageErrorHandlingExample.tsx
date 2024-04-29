import { StorageImage } from '@aws-amplify/ui-react-storage';

export const App = () => {
  return (
    <StorageImage
      alt="fallback cat"
      path="guest/cat.jpg"
      fallbackSrc="/fallback_cat.jpg"
      onGetUrlError={(error) => console.error(error)}
    />
  );
};

export default App;
