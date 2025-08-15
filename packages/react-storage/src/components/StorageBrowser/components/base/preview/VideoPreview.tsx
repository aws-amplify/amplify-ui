import React from 'react';

export function VideoPreview({
  url,
  fileKey,
}: {
  url: string | null;
  fileKey: string;
}): React.JSX.Element | null {
  return (
    <video
      controls
      preload="metadata"
      style={{
        width: '100%',
        height: 'auto',
        maxHeight: '500px',
      }}
      onError={() => {
        //
      }}
      aria-label={fileKey}
    >
      <source src={url!} />
    </video>
  );
}
