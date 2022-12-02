import {
  StorageProvider,
  UploadTask,
  StorageOptions,
} from '@aws-amplify/storage';

interface StorageProviderConfig extends StorageOptions {
  delay?: number;
  networkError?: boolean;
}

const defaultConfig = {
  delay: 100,
  networkError: false,
};

/**
 * https://docs.amplify.aws/lib/storage/custom-plugin/q/platform/js/
 * Mocking out the Storage class so we can render the FileUploader component
 * without an Amplify backend.
 */
export default class MyStorageProvider implements StorageProvider {
  // category and provider name
  static category = 'Storage';
  providerName = 'MOCK';
  PROVIDER_NAME = 'MOCK';

  private _config: StorageProviderConfig;

  constructor(name?: string, config?: StorageProviderConfig) {
    if (name) {
      this.providerName = name;
      this.PROVIDER_NAME = name;
    }
    this._config = config ? { ...defaultConfig, ...config } : defaultConfig;
    return this;
  }

  // configure your provider
  configure(config: StorageProviderConfig) {
    this._config = { ...this._config, ...config };
    return this._config;
  }

  // get object/pre-signed url from storage
  // we don't use this yet
  public async get(key: string, options?): Promise<string | object> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(key);
      }, 300);
    });
  }

  // upload storage object
  put(key: string, object, options?): Promise<Object> | UploadTask {
    const opt = Object.assign({}, options);
    const { delay, networkError } = this._config;
    const { progressCallback, resumable, errorCallback, completeCallback } =
      opt;
    let progress = 0;
    let tick;
    let interval;

    // a function that returns a function and will call
    // the callback function when it completes. This allows
    // the Promise version of this to resolve when it finishes.
    const tickCreator = (cb?: () => void, increment?: number) => () => {
      if (progress < 100) {
        progress += increment || 1;
        if (typeof progressCallback === 'function') {
          progressCallback({ loaded: progress, total: 100 });
        }
        if (networkError && progress >= 50) {
          clearInterval(interval);
          if (typeof errorCallback === 'function') {
            errorCallback(new Error('Upload failed'));
          }
        }
      } else {
        clearInterval(interval);
        if (typeof cb === 'function') cb();
        if (typeof completeCallback === 'function') {
          // returning the key and the object even though object isn't
          // part of the usual return args. This is just so we can
          // show the file on the client if it is a file
          completeCallback({ key, object });
        }
      }
    };

    if (resumable) {
      // Resumable uploads files in chunks rather than streaming
      // this will make the progress go in 4 chunks of 25%
      tick = tickCreator(null, 25);
      interval = setInterval(tick, delay);
      const uploadTask: UploadTask = {
        pause() {
          clearInterval(interval);
        },
        resume() {
          interval = setInterval(tick, delay);
        },
        percent: progress,
        isInProgress: true,
      };
      return uploadTask;
    } else {
      tick = tickCreator();
      interval = setInterval(tick, delay);
    }

    // We only support resumable uploads so we will never return a promise yet
    return new Promise((resolve, reject) => {
      clearInterval(interval);
      tick = tickCreator(() => resolve({ key }));
      interval = setInterval(tick, delay);
    });
  }

  // remove object
  // unused right now
  remove(key: string, options?): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(key);
      }, 100);
    });
  }

  // list objects for the path
  // unused right now
  list(path, options?): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(path);
      }, 100);
    });
  }

  // return 'Storage';
  getCategory(): string {
    return 'Storage';
  }

  // return the name of you provider
  getProviderName(): string {
    return this.providerName;
  }
}
