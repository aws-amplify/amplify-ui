import * as React from 'react';
import { ImageOptions } from '@aws-amplify/ui-react';
import { FieldLabeler } from './FieldLabeler';

export interface ImagePropControlsProps extends ImageOptions {
  setAlt: (value: React.SetStateAction<ImageOptions['alt']>) => void;
  setSizes: (value: React.SetStateAction<ImageOptions['sizes']>) => void;
  setSrc: (value: React.SetStateAction<ImageOptions['src']>) => void;
  setSrcSet: (value: React.SetStateAction<ImageOptions['srcSet']>) => void;
  setObjectFit: (
    value: React.SetStateAction<ImageOptions['objectFit']>
  ) => void;
  setObjectPosition: (
    value: React.SetStateAction<ImageOptions['objectPosition']>
  ) => void;
}

interface ImagePropControlsInterface {
  (props: ImagePropControlsProps): JSX.Element;
}

export const ImagePropControls: ImagePropControlsInterface = ({
  alt,
  sizes,
  src,
  srcSet,
  objectFit,
  objectPosition,
  setAlt,
  setSizes,
  setSrcSet,
  setObjectFit,
  setObjectPosition,
}) => {
  return (
    <fieldset className="p-4 border-2 border-current border-solid">
      <legend className="font-bold p-1">Image props:</legend>
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 flex-wrap my-2">
        <FieldLabeler id="alt">
          <input
            type="text"
            placeholder="Set alt"
            value={alt}
            onChange={(event: any) => {
              setAlt(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="sizes">
          <input
            type="text"
            placeholder="Set sizes"
            value={sizes}
            onChange={(event: any) => {
              setSizes(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="src">
          <input
            className="opacity-50"
            type="text"
            placeholder="Set src"
            value={src}
            disabled={true}
          />
        </FieldLabeler>

        <FieldLabeler id="srcSet">
          <input
            type="text"
            placeholder="Set srcSet"
            value={srcSet}
            onChange={(event: any) => {
              setSrcSet(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="objectFit">
          <input
            type="text"
            placeholder="Set objectFit"
            value={objectFit}
            onChange={(event: any) => {
              setObjectFit(event.target.value);
            }}
          />
        </FieldLabeler>

        <FieldLabeler id="objectPosition">
          <input
            type="text"
            placeholder="Set objectPosition"
            value={objectPosition}
            onChange={(event: any) => {
              setObjectPosition(event.target.value);
            }}
          />
        </FieldLabeler>
      </div>
    </fieldset>
  );
};
