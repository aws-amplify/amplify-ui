import { useCallback, useReducer } from 'react';
import type { FileData } from '../../../actions';

import { determineFileType } from '../../utils/files/fileType';
import { useFilePreviewContext } from '../../../filePreview/context';
import { useGetActionInput } from '../../../configuration/context';
import { resolveUrlOptions } from '../../utils/files/url';
import { resolveMaxFileSize } from '../../utils/files/fileSize';
import type { UseFilePreviewReturn } from './types';
import { initialState, filePreviewReducer } from './filePreviewReducer';
import { safeGetProperties } from '../../utils/files/safeGetProperties';
import { constructBucket } from '../../../actions/handlers';
import { getUrl } from '../../../storage-internal';

export function useFilePreview(): UseFilePreviewReturn {
  const filePreviewContext = useFilePreviewContext();
  const getConfig = useGetActionInput();
  const [state, dispatch] = useReducer(filePreviewReducer, initialState);

  const { fileTypeResolver, urlOptions, maxFileSize } =
    filePreviewContext ?? {};

  const config = getConfig();

  const prepareFileForPreview = useCallback(
    async (fileData?: FileData | null) => {
      if (!fileData || !fileData?.key) {
        return;
      }

      const { accountId, customEndpoint, credentials } = config;

      const sharedOptions = {
        bucket: constructBucket(config),
        expectedBucketOwner: accountId,
      };

      try {
        dispatch({ type: 'START_PREVIEW_PREPARATION', payload: { fileData } });

        const properties = await safeGetProperties({
          path: fileData.key,
          options: sharedOptions,
        });

        const enrichedFileData: FileData = {
          ...fileData,
          ...properties,
        };

        const fileType = determineFileType({
          fileData: enrichedFileData,
          fileTypeResolver,
        });

        const finalFileData = {
          ...enrichedFileData,
          fileType,
        };

        const sizeLimit = resolveMaxFileSize(maxFileSize, fileType);
        const isLimitExceeded = (fileData.size ?? 0) > sizeLimit;

        if (isLimitExceeded) {
          dispatch({ type: 'LIMIT_EXCEEDED' });
          return;
        }

        const { url } = await getUrl({
          path: fileData.key,
          options: {
            customEndpoint,
            locationCredentialsProvider: credentials,
            contentDisposition: 'attachment',
            ...sharedOptions,
            ...resolveUrlOptions(urlOptions, fileType),
          },
        });

        dispatch({
          type: 'PREVIEW_PREPARATION_SUCCESS',
          payload: {
            fileData: finalFileData,
            url: url.toString(),
          },
        });
      } catch (error) {
        dispatch({ type: 'PREVIEW_PREPARATION_ERROR', payload: null! });
      }
    },
    [fileTypeResolver, urlOptions, maxFileSize, config]
  );

  const onRetryFilePreview = useCallback(() => {
    prepareFileForPreview(state.previewedFile);
  }, [prepareFileForPreview, state.previewedFile]);

  const onOpenFilePreview = useCallback(
    (file: FileData) => {
      if (file.key === state.previewedFile?.key) {
        return;
      }
      prepareFileForPreview(file);
    },
    [prepareFileForPreview, state.previewedFile?.key]
  );

  const onCloseFilePreview = useCallback(() => {
    if (!state.previewedFile?.key) {
      return;
    }
    dispatch({ type: 'RESET_STATE' });
  }, [state.previewedFile?.key]);

  return {
    ...state,
    onRetryFilePreview,
    onOpenFilePreview,
    onCloseFilePreview,
  };
}
