import React, { useState } from "react";

import { Stack } from "@aws-amplify/ui-react";

type JustifyStack = "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";

export const JustifyContent = () => {
	const [justifyContent, setJustifyContent] = useState<JustifyStack>("flex-start");

	return (
		<div>
			<Stack justifyContent={justifyContent} gap="20px">
				{[...Array(7)].map((_, i) => <div style={{width: '50px', height: '50px', backgroundColor: 'purple', borderRadius: '10px', color: 'white'}} key={i}>{i + 1}</div>)}
			</Stack>
			<div onChange={(e: any) => setJustifyContent(e.target.value)}>
        <input type="radio" value="flex-start" name="justifyContent" defaultChecked/> flex-start
        <input type="radio" value="flex-end" name="justifyContent" /> flex-end
        <input type="radio" value="center" name="justifyContent" /> center
				<input type="radio" value="space-between" name="justifyContent" /> space-between
				<input type="radio" value="space-around" name="justifyContent" /> space-around
				<input type="radio" value="space-evenly" name="justifyContent" /> space-evenly
      </div>
		</div>
	);
};

type AlignItems = "stretch" | "flex-start" | "flex-end" | "center" | "baseline";

export const AlignItems = () => {
	const [alignItems, setAlignItems] = useState<AlignItems>("stretch");

	return (
		<div>
			<Stack alignItems={alignItems} gap="20px">
				<div style={{backgroundColor: 'red', height: '100px'}}>Hello</div>
				<div style={{backgroundColor: 'yellow', paddingTop: '20px'}}>How are you doing</div>
				<div style={{backgroundColor: 'blue', height: '60px'}}>today?</div>
			</Stack>
			<div onChange={(e: any) => setAlignItems(e.target.value)}>
				<input type="radio" value="stretch" name="alignItems" defaultChecked /> stretch
				<input type="radio" value="flex-start" name="alignItems" /> flex-start
				<input type="radio" value="flex-end" name="alignItems" /> flex-end
				<input type="radio" value="center" name="alignItems" /> center
				<input type="radio" value="baseline" name="alignItems" /> baseline
			</div>
		</div>
	);
};

