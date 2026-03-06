import {
  downloadData,
  remove,
  list,
  getProperties,
  copy,
  getUrl,
  isCancelError,
  type UploadDataInput,
  type UploadDataOutput,
} from '@aws-amplify/storage';

type UploadData = (props: UploadDataInput) => UploadDataOutput;

const uploadData: UploadData = (props) => {
  const delay = 100;
  const { key, options } = props;
  const { onProgress = () => {}, accessLevel } = options;

  let progress = 0;
  let tick;
  let interval;

  // Hard-coding private uploads to fail to test failing uploads
  const state = accessLevel === 'private' ? 'ERROR' : 'SUCCESS';

  // a function that returns a function and will call
  // the callback function when it completes. This allows
  // the Promise version of this to resolve when it finishes.
  const tickCreator = (cb?: () => void, increment?: number) => () => {
    if (progress < 100) {
      progress += increment || 1;
      if (typeof onProgress === 'function') {
        onProgress({ transferredBytes: progress, totalBytes: 100 });
      }
    } else {
      clearInterval(interval);
      if (typeof cb === 'function') cb();
    }
  };

  const result = new Promise<{ key: string }>((resolve, reject) => {
    clearInterval(interval);
    tick = tickCreator(() => {
      if (state === 'ERROR') {
        reject(new Error('testing'));
      } else {
        resolve({ key });
      }
    }, 5);
    interval = setInterval(tick, delay);
  });

  return {
    pause() {
      clearInterval(interval);
    },
    resume() {
      interval = setInterval(tick, delay);
    },
    cancel() {
      clearInterval(interval);
    },
    // hard-coding this for now because how the hell does it work in JS if this function just returns
    // an object?!?!
    state,
    result,
  };
};

export {
  isCancelError,
  uploadData,
  downloadData,
  copy,
  remove,
  list,
  getUrl,
  getProperties,
};
