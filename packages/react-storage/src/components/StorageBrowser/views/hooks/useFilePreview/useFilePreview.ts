import { useCallback, useEffect, useMemo, useState } from 'react';
import type { FileData } from '../../../actions';

import { determineFileType } from '../../utils/files/fileType';
import { useFilePreviewContext } from '../../../filePreview/context';
import { useGetActionInput } from '../../../configuration/context';
import { resolveUrlOptions } from '../../utils/files/url';
import { resolveMaxFileSize } from '../../utils/files/fileSize';
import { safeGetProperties } from '../../utils/files/safeGetProperties';
import { constructBucket } from '../../../actions/handlers';
import { getUrl } from '../../../storage-internal';
import { useStore } from '../../../store';
import type { FilePreviewContent, UseFilePreviewState } from './types';

export function useFilePreview({
  activeFile,
}: {
  activeFile?: FileData;
}): UseFilePreviewState {
  const filePreviewContext = useFilePreviewContext();
  const [enabled, setEnabled] = useState(true);
  const getConfig = useGetActionInput();
  const [{ location }] = useStore();
  const [filePreviewContent, setFilePreviewContent] =
    useState<FilePreviewContent>({ isLoading: true });
  const { fileTypeResolver, urlOptions, maxFileSize } =
    (filePreviewContext ?? {}) || {};

  const getFilePreview = useCallback<() => Promise<void>>(async () => {
    if (!activeFile || !activeFile?.key || !location.current) {
      setEnabled(false);
      return;
    }
    const config = getConfig(location.current);
    const { accountId, customEndpoint, credentials } = config;
    const sharedOptions = {
      bucket: constructBucket(config),
      expectedBucketOwner: accountId,
    };
    try {
      setEnabled(true);
      setFilePreviewContent({
        isLoading: true,
      });
      const properties = await safeGetProperties({
        path: activeFile.key,
        options: sharedOptions,
      });

      const enrichedFile = {
        ...activeFile,
        ...properties,
      };

      const fileType = determineFileType({
        fileData: enrichedFile,
        fileTypeResolver,
      });

      const finalFile = {
        ...enrichedFile,
        fileType,
      };

      const sizeLimit = resolveMaxFileSize(maxFileSize, fileType);
      const isLimitExceeded = (finalFile.size ?? 0) > sizeLimit;

      if (isLimitExceeded) {
        setFilePreviewContent({
          ok: false,
          isLoading: false,
          error: 'LIMIT_EXCEEDED',
        });
        return;
      }

      const { url } = await getUrl({
        path: finalFile.key,
        options: {
          customEndpoint,
          locationCredentialsProvider: credentials,
          contentDisposition: 'attachment',
          ...sharedOptions,
          ...resolveUrlOptions(urlOptions, fileType),
        },
      });
      setFilePreviewContent({
        ok: true,
        isLoading: false,
        fileData: finalFile,
        url: url.toString(),
      });
    } catch (error) {
      setFilePreviewContent({
        isLoading: false,
        ok: false,
        error: 'GENERIC_ERROR',
      });
    }
  }, [
    location,
    getConfig,
    fileTypeResolver,
    maxFileSize,
    urlOptions,
    activeFile,
  ]);

  useEffect(() => {
    getFilePreview();
  }, [getFilePreview, activeFile]);

  return useMemo(() => {
    if (filePreviewContext === false || !enabled) {
      return {
        optout: filePreviewContext === false,
        enabled: false,
        handleRetry: () => undefined,
      };
    }
    return {
      optout: false,
      enabled: true,
      handleRetry: () => getFilePreview(),
      ...filePreviewContent,
    };
  }, [getFilePreview, filePreviewContext, filePreviewContent, enabled]);
}
