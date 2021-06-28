import React, { CSSProperties } from "react";
import { ComponentClassNames } from '../shared/constants';
import { StackProps } from '../shared/types';

export const Stack: React.FC<StackProps> = ({
	children,
	className = "",
	display = "flex",
	direction: flexDirection = "row",
	gap = 'normal',
	justifyContent = "flex-start",
	alignItems = "stretch",
	alignContent = "flex-start",
	wrap: flexWrap = "nowrap",
	...rest
}) => {
	const style: CSSProperties = {
		display,
		flexDirection,
		gap,
		justifyContent,
		alignItems,
		alignContent,
		flexWrap,
	};

  return (
    <div className={`${ComponentClassNames.AmplifyStack} ${className ?? ""}`} style={style} {...rest}>
      {children} 
    </div>
  );
};