import { useCallback, useReducer } from 'react';
import type { FileData } from '../../../actions';
import { getProperties, getUrl } from 'aws-amplify/storage';
import { determineFileType } from '../../utils/files/fileType';
import { useFilePreviewContext } from '../../../filePreview/context';
import { resolveUrlOptions } from '../../utils/files/urt';
import { resolveMaxFileSize } from '../../utils/files/fileSize';
import type { UseFilePreviewReturn } from './types';
import { initialState, filePreviewReducer } from './filePreviewReducer';

export function useFilePreview(): UseFilePreviewReturn {
  const filePreviewContext = useFilePreviewContext();
  const [state, dispatch] = useReducer(filePreviewReducer, initialState);

  const { fileTypeResolver, urlOptions, maxFileSize } =
    filePreviewContext ?? {};

  const prepareFileForPreview = useCallback(
    async (fileData: FileData) => {
      if (!fileData?.key) {
        return;
      }

      try {
        dispatch({ type: 'START_PREVIEW_PREPARATION', payload: { fileData } });

        const properties = await getProperties({
          path: fileData.key,
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
          options: resolveUrlOptions(urlOptions, fileType),
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
    [fileTypeResolver, urlOptions, maxFileSize]
  );

  const onRetryFilePreview = useCallback(() => {
    prepareFileForPreview(state.previewedFile!);
  }, [prepareFileForPreview, state.previewedFile]);

  const onOpenFilePreview = useCallback(
    (file: FileData) => {
      prepareFileForPreview(file);
    },
    [prepareFileForPreview]
  );

  const onCloseFilePreview = useCallback(() => {
    dispatch({ type: 'RESET_STATE' });
  }, []);

  return {
    ...state,
    onRetryFilePreview,
    onOpenFilePreview,
    onCloseFilePreview,
  };
}
