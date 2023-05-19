# @aws-amplify/ui-react-storage

## 1.2.1

### Patch Changes

- Updated dependencies [[`998a8c74f`](https://github.com/aws-amplify/amplify-ui/commit/998a8c74ff42c250d0d028efb20afa2d54528c86), [`82f3968b7`](https://github.com/aws-amplify/amplify-ui/commit/82f3968b7f750f069bda4ad7bfa9c34d7ee6091f)]:
  - @aws-amplify/ui-react-core@2.1.21
  - @aws-amplify/ui-react@4.6.2
  - @aws-amplify/ui@5.6.2

## 1.2.0

### Minor Changes

- [#3798](https://github.com/aws-amplify/amplify-ui/pull/3798) [`89e67899c`](https://github.com/aws-amplify/amplify-ui/commit/89e67899c1b48b6bb6b235fa22b62e3f6c1e1112) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - feat(storage-manager): make processFile async. This allows for reading the file contents and performing async validations or mutations like creating a hash of the file contents.

  ```jsx
  const processFile = async ({ file }) => {
    const fileExtension = file.name.split('.').pop();

    return file
      .arrayBuffer()
      .then((filebuffer) => window.crypto.subtle.digest('SHA-1', filebuffer))
      .then((hashBuffer) => {
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
          .map((a) => a.toString(16).padStart(2, '0'))
          .join('');
        return { file, key: `${hashHex}.${fileExtension}` };
      });
  };

  export const StorageManagerHashExample = () => {
    return (
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="public"
        maxFileCount={1}
        processFile={processFile}
      />
    );
  };
  ```

- [#3788](https://github.com/aws-amplify/amplify-ui/pull/3788) [`37d63424e`](https://github.com/aws-amplify/amplify-ui/commit/37d63424e23e971713f76d201ce829ec6974fc54) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - feat(storage-manager): add metadata and the rest of the Storage.put params

  ```jsx
  const processFile = ({ file, key }) => {
    return {
      file,
      key,
      metadata: {
        id: key,
      },
    };
  };

  export function StorageManagerMetadataExample() {
    return (
      <StorageManager
        acceptedFileTypes={['image/*']}
        accessLevel="private"
        maxFileCount={3}
        showThumbnails={true}
        processFile={processFile}
      />
    );
  }
  ```

### Patch Changes

- Updated dependencies [[`4ca838978`](https://github.com/aws-amplify/amplify-ui/commit/4ca838978d23a086f80859a7cb57f184ff49e2d4), [`1412aa4eb`](https://github.com/aws-amplify/amplify-ui/commit/1412aa4eb4837c44c4e5ecce66188e1e256f952c), [`d6a3676f2`](https://github.com/aws-amplify/amplify-ui/commit/d6a3676f2295ed39fa83b9d31a9540f3437ba129), [`37d63424e`](https://github.com/aws-amplify/amplify-ui/commit/37d63424e23e971713f76d201ce829ec6974fc54), [`9551c521b`](https://github.com/aws-amplify/amplify-ui/commit/9551c521b8bed4844f5d57a8cf842ed8b5bd6bee)]:
  - @aws-amplify/ui@5.6.1
  - @aws-amplify/ui-react@4.6.1
  - @aws-amplify/ui-react-core@2.1.20

## 1.1.0

### Minor Changes

- [#3669](https://github.com/aws-amplify/amplify-ui/pull/3669) [`5d78e3b4b`](https://github.com/aws-amplify/amplify-ui/commit/5d78e3b4b554f355ecd3a80678e0b9df6be0b228) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - feat(storage-manager): add `onUploadStart` event handler and add the file key to `onUploadError`

  ```jsx
  export function StorageManagerExample() {
    const [files, setFiles] = React.useState({});
    return (
        <StorageManager
          acceptedFileTypes={['image/*']}
          accessLevel="private"
          maxFileCount={3}
          onFileRemove={({ key }) => {
            setFiles((prevFiles) => {
              return {
                ...prevFiles,
                [key]: undefined,
              };
            });
          }}
          onUploadError={(error, { key }) => {
            setFiles((prevFiles) => {
              return {
                ...prevFiles,
                [key]: {
                  status: 'error',
                },
              };
            });
          }}
          onUploadSuccess={({ key }) => {
            setFiles((prevFiles) => {
              return {
                ...prevFiles,
                [key]: {
                  status: 'success',
                },
              };
            });
          }}
          onUploadStart={({ key }) => {
            setFiles((prevFiles) => {
              return {
                ...prevFiles,
                [key]: {
                  status: 'uploading',
                },
              };
            });
          }}
        />
        {Object.keys(files).map((key) => {
          return files[key] ? (
            <div>
              {key}: {files[key].status}
            </div>
          ) : null;
        })}
    );
  }
  ```

### Patch Changes

- [#3672](https://github.com/aws-amplify/amplify-ui/pull/3672) [`fed85d4d7`](https://github.com/aws-amplify/amplify-ui/commit/fed85d4d7d54b5f845bc409a9a5f3ca5acd605c6) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - fix(storage): fix defaultFiles

  Previously if you added `defaultFiles` to the StorageManager you would get weird behavior saying it was uploading when it actually wasn't. Also if you passed null or improper file objects you would get an error.

- Updated dependencies [[`bc3fd6d95`](https://github.com/aws-amplify/amplify-ui/commit/bc3fd6d951b1ab1b188722f59ce04118d04d16af), [`c3918d9ab`](https://github.com/aws-amplify/amplify-ui/commit/c3918d9aba1a9bedf8f1c8d45097f85b8ca9d482), [`747516159`](https://github.com/aws-amplify/amplify-ui/commit/747516159d504b551dab09cbe8f214fa7b4505df)]:
  - @aws-amplify/ui@5.6.0
  - @aws-amplify/ui-react@4.6.0
  - @aws-amplify/ui-react-core@2.1.19

## 1.0.1

### Patch Changes

- [#3657](https://github.com/aws-amplify/amplify-ui/pull/3657) [`fefc4cb3d`](https://github.com/aws-amplify/amplify-ui/commit/fefc4cb3df12d344792b33ad100c6252c9fa2819) Thanks [@dbanksdesign](https://github.com/dbanksdesign)! - Adding in missing changeset from previous release.

- Updated dependencies [[`fefc4cb3d`](https://github.com/aws-amplify/amplify-ui/commit/fefc4cb3df12d344792b33ad100c6252c9fa2819)]:
  - @aws-amplify/ui@5.5.10
  - @aws-amplify/ui-react@4.5.1
  - @aws-amplify/ui-react-core@2.1.18

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
