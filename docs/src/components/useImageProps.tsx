import { ImageOptions, ImageProps } from "@aws-amplify/ui-react";
import { useState } from "react";
import { ImagePropControlsProps } from "./ImagePropControls";

export const useImageProps: (
  initialValues: ImageOptions
) => ImagePropControlsProps = initialValues => {
  const [alt, setAlt] = useState<ImageOptions["alt"]>(initialValues.alt);
  const [sizes, setSizes] = useState<ImageOptions["sizes"]>(
    initialValues.sizes
  );
  const [src, setSrc] = useState<ImageOptions["src"]>(initialValues.src);
  const [srcSet, setSrcSet] = useState<ImageOptions["srcSet"]>(
    initialValues.srcSet
  );
  const [htmlHeight, setHtmlHeight] = useState<ImageOptions["htmlHeight"]>(
    initialValues.htmlHeight
  );
  const [htmlWidth, setHtmlWidth] = useState<ImageOptions["htmlWidth"]>(
    initialValues.htmlWidth
  );
  const [objectFit, setObjectFit] = useState<ImageOptions["objectFit"]>(
    initialValues.objectFit
  );
  const [objectPosition, setObjectPosition] = useState<
    ImageOptions["objectPosition"]
  >(initialValues.objectPosition);

  return {
    alt,
    sizes,
    src,
    srcSet,
    htmlHeight,
    htmlWidth,
    objectFit,
    objectPosition,
    setAlt,
    setSizes,
    setSrc,
    setSrcSet,
    setHtmlHeight,
    setHtmlWidth,
    setObjectFit,
    setObjectPosition,
  };
};
