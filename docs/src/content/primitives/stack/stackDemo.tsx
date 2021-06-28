import React from "react";

import { JustifyContent, AlignItems } from './stackDemos';

const selectDemo = (demoType) => {
	switch(demoType) {
		case 'justifyContent':
			return <JustifyContent/>;
		case 'alignItems':
			return <AlignItems/>;
	}
};

export const StackDemo = ({ demoType }) => {
	return (
		<div>{selectDemo(demoType)}</div>
	);
};

