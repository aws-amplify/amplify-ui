import React from 'react';
import { useState } from 'react';
import type { FileData } from '../../actions';
import { getProperties, getUrl } from 'aws-amplify/storage';
import { determineFileType } from '../utils/objectPreview/fileType';
import { useFilePreview } from '../../filePreview/context';
import { resolveUrlOptions } from '../utils/objectPreview/urt';
import { resolveMaxFileSize } from '../utils/objectPreview/fileSize';

export interface ObjectPreviewData {
  isLoading?: boolean;
  hasError?: boolean;
  selectedObject?: FileData | null;
  url?: string | null;
  hasLimitExceeded?: boolean;
}

interface UseObjectPreviewReturn extends ObjectPreviewData {
  setSelectedFile: (p: any) => void;
  retry: () => void;
}

export function useObjectPreview(): UseObjectPreviewReturn {
  const { fileTypeResolver, urlOptions, maxFileSize } = useFilePreview() ?? {};
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasLimitExceeded, setHasLimitExceeded] = useState(false);
  const [selectedObject, setSelectedObject] = useState<FileData | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

  async function prepareFileForPreview() {
    try {
      if (!selectedObject?.key) return;

      setHasError(false);
      setHasLimitExceeded(false);
      setIsLoading(true);

      const result = await getProperties({
        path: selectedObject?.key,
      });

      const allFileProperties = {
        ...selectedObject,
        ...result,
      };

      const fileType = determineFileType({
        fileData: allFileProperties,
        fileTypeResolver,
      });

      setSelectedObject({
        ...allFileProperties,
        fileType,
      });

      const doesLimitExceeded =
        selectedObject.size > resolveMaxFileSize(maxFileSize, fileType);

      if (doesLimitExceeded) {
        setHasLimitExceeded(true);
        setIsLoading(false);
        return;
      }

      const { url } = await getUrl({
        path: selectedObject?.key,
        options: resolveUrlOptions(urlOptions, fileType),
      });

      setUrl(url.toString());

      setIsLoading(false);
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    prepareFileForPreview();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedObject?.key, retryTrigger]);

  const retry = () => {
    setRetryTrigger((prev) => prev + 1);
  };

  const setSelectedFile = (object: FileData) => {
    setSelectedObject(object);
  };

  return {
    isLoading,
    hasError,
    selectedObject,
    setSelectedFile,
    url,
    hasLimitExceeded,
    retry,
  };
}
