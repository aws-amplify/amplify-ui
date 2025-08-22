import type {
  AllFileTypes,
  FilePreviewUrlOptions,
  UrlOptionsResolver,
} from '../../../createStorageBrowser/types';
import { DEFAULT_URL_OPTIONS } from './const';

export function resolveUrlOptions(
  options: FilePreviewUrlOptions | UrlOptionsResolver<any> | undefined,
  fileType: AllFileTypes | null
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
