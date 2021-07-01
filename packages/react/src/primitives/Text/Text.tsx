import React from "react";
import { ComponentClassNames } from "../shared/constants";
import { getStyleCssVarsFromProps, getNonStyleProps } from "../shared/utils";
import { TextProps } from "../types/Text";
import { View } from "@aws-amplify/ui-react";

export const Text: React.FC<TextProps> = props => {
  const {
    ariaLabel,
    className = "",
    children,
    id,
    isTruncated,
    variant,
    ...rest
  } = props;
  return (
    <View
      as="p"
      aria-label={ariaLabel}
      className={`${ComponentClassNames.Text} ${className}`}
      data-variant={variant}
      data-truncate={isTruncated}
      id={id}
      style={getStyleCssVarsFromProps(props)}
      {...getNonStyleProps(rest)}
    >
      {children}
    </View>
  );
};
