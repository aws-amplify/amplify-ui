import classNames from "classnames";
import React from "react";
import { ComponentClassNames } from "../shared/constants";
import { StackProps } from "../types";
import { View } from "../View";

export const Stack: React.FC<StackProps> = ({ className, children, ...rest }) => (
  <View
    className={classNames(ComponentClassNames.Stack, className)}
    {...rest}
  >
    {children}
  </View>
);

export const HorizontalStack = props => <Stack direction="row" {...props}></Stack>;

export const VerticalStack = props => <Stack direction="column" {...props}></Stack>;
