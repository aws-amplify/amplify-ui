import React from 'react';
import { STORAGE_BROWSER_BLOCK } from '../constants';

export function VideoPreview({
  url,
  fileKey,
}: {
  url: string | null;
  fileKey: string;
}): React.JSX.Element | null {
  return (
    <video
      className={`${STORAGE_BROWSER_BLOCK}__video-preview`}
      controls
      preload="metadata"
      onError={() => {
        //
      }}
      aria-label={fileKey}
    >
      <source src={url!} />
    </video>
  );
}
