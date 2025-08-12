import type {
  FilePreviewUrlOptions,
  UrlOptionsResolver,
} from '../../../createStorageBrowser/types';
import { DEFAULT_URL_OPTIONS, type FileType } from './const';

export function resolveUrlOptions(
  options: FilePreviewUrlOptions | UrlOptionsResolver | undefined,
  fileType: FileType
): FilePreviewUrlOptions {
  if (!options) {
    return DEFAULT_URL_OPTIONS;
  }

  if (typeof options === 'function') {
    return options(fileType) ?? DEFAULT_URL_OPTIONS;
  }

  return {
    ...DEFAULT_URL_OPTIONS,
    ...options,
  };
}
