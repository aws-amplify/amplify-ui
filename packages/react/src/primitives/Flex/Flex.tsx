import classNames from "classnames";
import React from "react";
import { ComponentClassNames } from "../shared/constants";
import { FlexProps } from "../types";
import { View } from "../View";

export const Flex: React.FC<FlexProps> = ({ className, children, ...rest }) => (
  <View className={classNames(ComponentClassNames.Flex, className)} {...rest}>
    {children}
  </View>
);
