import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';
import { fileuploader, FileUploaderTokens } from './fileUploader';

export interface StorageManagerTokens<OutputType extends OutputVariantKey>
  extends Omit<FileUploaderTokens<OutputType>, 'body' | 'footer'> {
  filelist?: DesignTokenProperties<'flexDirection' | 'gap'>;
}

export const storagemanager: Required<StorageManagerTokens<'default'>> = {
  ...fileuploader,
  filelist: {
    flexDirection: 'column',
    gap: '{space.small}',
  },
};
