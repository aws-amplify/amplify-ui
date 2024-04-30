import { StorageImage } from '@aws-amplify/ui-react-storage';

export function App() {
  return (
    <StorageImage
      alt="fallback cat"
      path="guest/cat-in-basket.jpg"
      fallbackSrc="/fallback_cat.jpg"
      onGetUrlError={(error) => console.error(error)}
    />
  );
}
