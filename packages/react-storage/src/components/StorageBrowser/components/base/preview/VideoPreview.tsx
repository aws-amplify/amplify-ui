import React from 'react';

export function VideoPreview({
  url,
  key,
}: {
  url: string | null;
  key: string;
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
      aria-label={key}
    >
      <source src={url!} />
    </video>
  );
}
