import type {
  DefaultHandlers,
  ListLocations,
  LocationData,
} from '@aws-amplify/ui-react-storage/browser';
import type { LocationItems, MockHandlersInput } from './types';

const UNDEFINED_CALLBACKS = {
  cancel: undefined,
  pause: undefined,
  resume: undefined,
};

/**
 * Incomplete items
 * - copy
 * - pagination
 * - MPU
 */
export class MockHandlers {
  #locations: LocationData[];
  #locationItems: Record<string, LocationItems>;
  #files: Map<string, File> = new Map();

  constructor(input?: MockHandlersInput) {
    const { initialValues } = input ?? {};
    this.#locations = initialValues?.locations ?? [];
    this.#locationItems = initialValues?.locationItems ?? {};
  }

  copy: DefaultHandlers['copy'] = () => {
    throw new Error('not implemented');
  };

  listLocations: ListLocations = () =>
    Promise.resolve({ items: this.#locations, nextToken: undefined });

  createFolder: DefaultHandlers['createFolder'] = ({ data: { key } }) => {
    const prefixes = key.split('/');

    const folderName = `${prefixes[prefixes.length - 2]}/`;
    const prefix = key.slice(0, -folderName.length);

    const item = { id: crypto.randomUUID(), key, type: 'FOLDER' as const };

    if (this.#locationItems[prefix]?.some((item) => item.key === key)) {
      return {
        ...UNDEFINED_CALLBACKS,
        result: Promise.resolve({ status: 'OVERWRITE_PREVENTED' }),
      };
    }

    if (this.#locationItems[prefix]) {
      this.#locationItems[prefix].push(item);
    } else {
      this.#locationItems[prefix] = [item];
    }

    // register prefix key
    this.#locationItems[key] = [];

    return {
      ...UNDEFINED_CALLBACKS,
      result: Promise.resolve({ status: 'COMPLETE' }),
    };
  };

  download: DefaultHandlers['download'] = ({ data: { key } }) => {
    const file = this.#files.get(key);

    if (!file) {
      return { result: Promise.resolve({ status: 'FAILED' }) };
    }

    const a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(file);
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    return { result: Promise.resolve({ status: 'COMPLETE' }) };
  };

  listLocationItems: DefaultHandlers['listLocationItems'] = ({
    options,
    prefix,
  }) => {
    const { delimiter, exclude } = options ?? {};

    const _items = delimiter
      ? this.#locationItems[prefix] ?? []
      : Object.entries(this.#locationItems).reduce(
          (output: LocationItems, [dataKey, values]) =>
            !dataKey.startsWith(prefix) ? output : output.concat(values),
          []
        );

    const items = !exclude
      ? _items
      : _items.filter(({ type }) => type !== exclude);

    return Promise.resolve({ nextToken: undefined, items });
  };

  delete: DefaultHandlers['delete'] = ({ data: { key, fileKey } }) => {
    const prefix = key.slice(0, -fileKey.length);

    this.#locationItems[prefix] = this.#locationItems[prefix].filter(
      (item) => item.key !== key
    );

    this.#files.delete(key);

    return { result: Promise.resolve({ status: 'COMPLETE' }) };
  };

  upload: DefaultHandlers['upload'] = (input) => {
    const {
      data: { file, key, preventOverwrite },
    } = input;
    const { name, webkitRelativePath } = file;
    const hasWebkitRelativePath = !!webkitRelativePath.length;

    const prefix = key.slice(0, -name.length);

    if (hasWebkitRelativePath && !this.#locationItems[prefix]) {
      // register folder prefix
      this.#locationItems[prefix] = [];

      // create new folder within parent prefix
      const parentPrefix = key.slice(0, -webkitRelativePath.length);
      this.#locationItems[parentPrefix].push({
        id: crypto.randomUUID(),
        key: prefix,
        type: 'FOLDER' as const,
      });
    }

    if (
      preventOverwrite &&
      this.#locationItems[prefix].some((item) => item.key === key)
    ) {
      return {
        ...UNDEFINED_CALLBACKS,
        result: Promise.resolve({
          error: new Error('cannot overwrite existing file'),
          status: 'OVERWRITE_PREVENTED',
        }),
      };
    }

    this.#locationItems[prefix].push({
      type: 'FILE',
      id: crypto.randomUUID(),
      key,
      lastModified: new Date(),
      size: file.size,
    });

    this.#files.set(key, file);

    return {
      ...UNDEFINED_CALLBACKS,
      result: Promise.resolve({ status: 'COMPLETE' }),
    };
  };
}
