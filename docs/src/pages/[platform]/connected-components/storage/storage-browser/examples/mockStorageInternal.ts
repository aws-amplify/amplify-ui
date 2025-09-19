// Mock implementation of storage-internal getUrl function for documentation examples
export const getUrl = async ({ path }: { path: string }) => {
  const filename = path.split('/').pop() || '';

  let url: string;

  switch (filename) {
    case 'image-1.jpg':
      url =
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2000&h=1333&q=80';
      break;
    case 'sample.mp4':
      url =
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
      break;
    case 'image-3.jpg':
      url =
        'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=2000&h=1333&q=80';
      break;
    default:
      url =
        'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&q=80';
  }

  const result = { url };
  return result;
};

export const copy = () => Promise.resolve();
export const getDataAccess = () => Promise.resolve();
export const list = () => Promise.resolve();
export const listCallerAccessGrants = () => Promise.resolve();
export const listPaths = () => Promise.resolve();
export const remove = () => Promise.resolve();
export const uploadData = () => Promise.resolve();
export const StorageValidationErrorCode = {};
export const assertValidationError = () => {};
export const validationErrorMap = {};
