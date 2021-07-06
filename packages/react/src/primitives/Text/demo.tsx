import React from "react";
import { Text } from "@aws-amplify/ui-react";

export const TextDemo = ({ children }) => {
  const [text, setText] = React.useState<string>("Hello World!!!");
  const [isTruncated, setIsTruncated] = React.useState<boolean>(false);
  const [color, setColor] = React.useState<string>("black");
  const [lineHeight, setLineHeight] = React.useState<string>("1rem");
  const [fontWeight, setFontWeight] = React.useState<any>("normal");
  const [fontStyle, setFontStyle] = React.useState<string>("normal");
  const [textDecoration, setTextDecoration] = React.useState<string>("none");
  return (
    <div>
      <div className="flex mb-4">
        <div className="w-1/2 text-right pr-2 text-lg mt-1">
          <label>Displayed Text:</label>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            value={text}
            onChange={event => setText(event.target.value)}
          />
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 text-right pr-2 text-lg mt-1">
          <label>Color:</label>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            value={color}
            onChange={event => setColor(event.target.value)}
          />
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 text-right pr-2 text-lg mt-1">
          <label>Line Height:</label>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            value={lineHeight}
            onChange={event => setLineHeight(event.target.value)}
          />
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 text-right pr-2 text-lg mt-1">
          <label>Font Wieght:</label>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            value={fontWeight}
            onChange={event => setFontWeight(event.target.value)}
          />
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 text-right pr-2 text-lg mt-1">
          <label>Font Style:</label>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            value={fontStyle}
            onChange={event => setFontStyle(event.target.value)}
          />
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 text-right pr-2 text-lg mt-1">
          <label>Text Decoration:</label>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            value={textDecoration}
            onChange={event => setTextDecoration(event.target.value)}
          />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-1/2 text-right pr-2 text-lg mt-1">
          <label>Is Truncated</label>
        </div>
        <div className="w-1/2">
          <input
            type="checkbox"
            onChange={event => setIsTruncated(!isTruncated)}
          />
        </div>
      </div>
      <Text
        isTruncated={isTruncated}
        color={color}
        lineHeight={lineHeight}
        fontWeight={fontWeight}
        fontStyle={fontStyle}
        textDecoration={textDecoration}
      >
        {text}
      </Text>
    </div>
  );
};
