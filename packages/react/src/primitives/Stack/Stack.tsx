import classNames from "classnames";
import React from "react";
import { ComponentClassNames } from "../shared/constants";
import { StackProps } from "../types";
import { View } from "../View";

export const Stack: React.FC<StackProps> = props => {
  const { className, children, ...rest } = props;

  return (
    <View
      className={classNames(ComponentClassNames.Stack, className)}
      {...rest}
    >
      {children}
    </View>
  );
};

export const HStack = props => <Stack direction="row" {...props}></Stack>;

export const VStack = props => <Stack direction="column" {...props}></Stack>;