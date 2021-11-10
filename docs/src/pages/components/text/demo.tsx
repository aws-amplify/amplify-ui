import React from 'react';
import { Text } from '@aws-amplify/ui-react';
import { Example } from '@/components/Example';

export const TextDemo = ({ children }) => {
  const [text, setText] = React.useState<string>('Hello World!!!');
  const [isTruncated, setIsTruncated] = React.useState<boolean>(false);
  const [color, setColor] = React.useState<string>('black');
  const [lineHeight, setLineHeight] = React.useState<string>('1rem');
  const [fontWeight, setFontWeight] = React.useState<any>('normal');
  const [fontSize, setFontSize] = React.useState<string>('1rem');
  const [fontStyle, setFontStyle] = React.useState<string>('normal');
  const [textDecoration, setTextDecoration] = React.useState<string>('none');
  return (
    <div>
      <div className="flex mb-4">
        <div className="w-1/2 text-right pr-2 text-lg mt-1">
          <label htmlFor="display_text">Displayed Text:</label>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            id="display_text"
            name="display_text"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 text-right pr-2 text-lg mt-1">
          <label htmlFor="color">Color:</label>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            id="color"
            name="color"
            value={color}
            onChange={(event) => setColor(event.target.value)}
          />
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 text-right pr-2 text-lg mt-1">
          <label htmlFor="line_height">Line Height:</label>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            id="line_height"
            name="line_height"
            value={lineHeight}
            onChange={(event) => setLineHeight(event.target.value)}
          />
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 text-right pr-2 text-lg mt-1">
          <label htmlFor="font_weight">Font Weight:</label>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            id="font_weight"
            name="font_weight"
            value={fontWeight}
            onChange={(event) => setFontWeight(event.target.value)}
          />
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 text-right pr-2 text-lg mt-1">
          <label htmlFor="font_size">Font Size:</label>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            id="font_size"
            name="font_size"
            value={fontSize}
            onChange={(event) => setFontSize(event.target.value)}
          />
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 text-right pr-2 text-lg mt-1">
          <label htmlFor="font_style">Font Style:</label>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            id="font_style"
            name="font_style"
            value={fontStyle}
            onChange={(event) => setFontStyle(event.target.value)}
          />
        </div>
      </div>
      <div className="flex mb-4">
        <div className="w-1/2 text-right pr-2 text-lg mt-1">
          <label htmlFor="text_decoration">Text Decoration:</label>
        </div>
        <div className="w-1/2">
          <input
            type="text"
            id="text_decoration"
            name="text_decoration"
            value={textDecoration}
            onChange={(event) => setTextDecoration(event.target.value)}
          />
        </div>
      </div>

      <div className="flex mb-4">
        <div className="w-1/2 text-right pr-2 text-lg mt-1">
          <label htmlFor="is_truncated">Is Truncated</label>
        </div>
        <div className="w-1/2">
          <input
            type="checkbox"
            id="is_truncated"
            name="is_truncated"
            onChange={(event) => setIsTruncated(!isTruncated)}
          />
        </div>
      </div>
      <Example>
        <Text
          isTruncated={isTruncated}
          color={color}
          lineHeight={lineHeight}
          fontWeight={fontWeight}
          fontStyle={fontStyle}
          fontSize={fontSize}
          textDecoration={textDecoration}
        >
          {text}
        </Text>
      </Example>
    </div>
  );
};

export const TextTruncatedSample = () => {
  return (
    <Text isTruncated={true}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </Text>
  );
};

export const TextStylingSample = () => {
  return (
    <Text fontWeight="bold" color="red" textDecoration="underline" as="span">
      This is my styled text
    </Text>
  );
};
