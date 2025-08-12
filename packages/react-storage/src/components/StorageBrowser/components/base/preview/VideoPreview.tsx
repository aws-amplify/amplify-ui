import React from 'react';

export function VideoPreview({
  url,
  objectKey,
}: {
  url: string | null;
  objectKey: string;
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
      aria-label={objectKey}
    >
      <source src={url!} />
    </video>
  );
}
