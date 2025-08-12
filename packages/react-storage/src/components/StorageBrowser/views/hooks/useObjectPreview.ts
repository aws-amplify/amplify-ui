import React from 'react';
import { useState } from 'react';
import type { FileData } from '../../actions';
import { getProperties, getUrl } from 'aws-amplify/storage';
import { determineFileType } from '../utils/objectPreview/fileType';
import { useFilePreview } from '../../filePreview/context';
import { resolveUrlOptions } from '../utils/objectPreview/urt';
import type { FileType } from '../utils/objectPreview/const';

export interface ObjectPreviewData {
  isLoading: boolean;
  hasError: boolean;
  selectedObject: FileData | null;
  url: string | null;
}

interface UseObjectPreviewReturn extends ObjectPreviewData {
  setSelectedFile: (p: any) => void;
}

export function useObjectPreview(): UseObjectPreviewReturn {
  const { fileTypeResolver, urlOptions } = useFilePreview() ?? {};
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedObject, setSelectedObject] = useState<FileData | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  async function prepareFileForPreview() {
    try {
      if (!selectedObject?.key) return;

      const result = await getProperties({
        path: selectedObject?.key,
      });

      const allFileProperties = {
        ...selectedObject,
        ...result,
      };

      const fileType = determineFileType({
        contentType: allFileProperties.contentType,
        filename: allFileProperties.key,
        fileTypeResolver,
      });

      setSelectedObject({
        ...allFileProperties,
        fileType,
      });

      const { url } = await getUrl({
        path: selectedObject?.key,
        options: resolveUrlOptions(urlOptions, fileType as FileType),
      });

      setUrl(url.toString());

      setIsLoading(false);
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    prepareFileForPreview();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedObject?.key]);

  const setSelectedFile = (object: FileData) => {
    setSelectedObject(object);
  };

  return { isLoading, hasError, selectedObject, setSelectedFile, url };
}
