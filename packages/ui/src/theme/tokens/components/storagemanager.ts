import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';
import { fileuploader, FileUploaderTokens } from './fileUploader';

export interface StorageManagerTokens<OutputType extends OutputVariantKey>
  extends Omit<FileUploaderTokens<OutputType>, 'body' | 'previewer'> {
  filelist?: DesignTokenProperties<'flexDirection' | 'gap'>;
  previewer?: {
    footer?: DesignTokenProperties<'justifyContent', OutputType>;
  };
}

export const storagemanager: Required<StorageManagerTokens<'default'>> = {
  ...fileuploader,
  filelist: {
    flexDirection: { value: 'column' },
    gap: { value: '{space.small}' },
  },
  previewer: {
    ...fileuploader.previewer,
    footer: {
      justifyContent: { value: 'flex-end' },
    },
  },
};
