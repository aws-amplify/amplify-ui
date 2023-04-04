# @aws-amplify/ui-react-storage

## 1.0.0

### Major Changes

- [#3589](https://github.com/aws-amplify/amplify-ui/pull/3589) [`3c3fbf4d7`](https://github.com/aws-amplify/amplify-ui/commit/3c3fbf4d73d9381cb3ee6d5590eb97062143f589) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - FileUploader becomes StorageManager!

  Creating a new package `@aws-amplify/ui-react-storage` to keep all future Storage related connected components, the first of which is the StorageManager.
  The StorageManager is a partial re-write of the FileUploader to address some customer issues and make the component more scalable for the future.

  Some notable changes from FileUploader -> StorageManager

  - Component slots: You can override each part of the StorageManager with your custom UI
  - Pre-upload process files: You can use this to programatically change file names before upload or perform optimizations and validations.
  - Easy text updates: The StorageManager component has a `displayText` prop where you can pass in all the text the component uses.

  ```jsx
  import { StorageManager } from '@aws-amplify/ui-react-storage';

  export const DefaultStorageManagerExample = () => {
    return (
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        maxFileCount={1}
      />
    );
  };
  ```

### Patch Changes

- Updated dependencies [[`61f525f53`](https://github.com/aws-amplify/amplify-ui/commit/61f525f531978a894373b41a70bd788d507bb514), [`3c3fbf4d7`](https://github.com/aws-amplify/amplify-ui/commit/3c3fbf4d73d9381cb3ee6d5590eb97062143f589), [`72d5e06eb`](https://github.com/aws-amplify/amplify-ui/commit/72d5e06ebbf024735ec44c04ad6e61b62a7dd20a)]:
  - @aws-amplify/ui-react@4.5.0
