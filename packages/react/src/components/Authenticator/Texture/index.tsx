import * as React from 'react';

export function Texture(props) {
  return (
    <svg {...props}>
      <filter id="prefix__a">
        <feTurbulence
          type="fractalNoise"
          baseFrequency={0.8}
          numOctaves={4}
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#prefix__a)" />
    </svg>
  );
}
