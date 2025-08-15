import { useCallback, useReducer } from 'react';
import type { FileData } from '../../../actions';
import { getProperties, getUrl } from 'aws-amplify/storage';
import { determineFileType } from '../../utils/objectPreview/fileType';
import { useFilePreview } from '../../../filePreview/context';
import { resolveUrlOptions } from '../../utils/objectPreview/urt';
import { resolveMaxFileSize } from '../../utils/objectPreview/fileSize';
import type { UseObjectPreviewReturn } from './types';
import { initialState, objectPreviewReducer } from './objectPreviewReducer';

export function useObjectPreview(): UseObjectPreviewReturn {
  const filePreviewContext = useFilePreview();
  const [state, dispatch] = useReducer(objectPreviewReducer, initialState);

  const { fileTypeResolver, urlOptions, maxFileSize } =
    filePreviewContext ?? {};

  async function prepareFileForPreview(fileData: FileData) {
    if (!fileData?.key) {
      return;
    }

    try {
      dispatch({ type: 'START_PREVIEW_PREPARATION' });

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
      const isLimitExceeded = (finalFileData.size ?? 0) > sizeLimit;

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
          object: finalFileData,
          url: url.toString(),
        },
      });
    } catch (error) {
      dispatch({ type: 'PREVIEW_PREPARATION_ERROR', payload: null! });
    }
  }

  const retryFilePreview = () => {
    prepareFileForPreview(state.selectedObject!);
  };

  const openFilePreview = (file: FileData) => {
    prepareFileForPreview(file);
  };

  const closeFilePreview = useCallback(() => {
    dispatch({ type: 'RESET_STATE' });
  }, []);

  return {
    ...state,
    retryFilePreview,
    openFilePreview,
    closeFilePreview,
  };
}
