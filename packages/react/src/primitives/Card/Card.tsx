import classNames from "classnames";
import React from "react";
import { ComponentClassNames } from "../shared/constants";
import { CardProps } from "../types/Card";
import { View } from "@aws-amplify/ui-react";

export const Card: React.FC<CardProps> = ({ className, children, ...rest }) => {
  return (
    <View className={classNames(ComponentClassNames.Card, className)} {...rest}>
      {children}
    </View>
  );
};
