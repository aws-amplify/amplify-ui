import React from "react";
import { View, ViewAsHTMLElementTypes } from "@aws-amplify/ui-react";

export const ViewDemo = ({ children }) => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [ariaLabel, setAriaLabel] = React.useState<string>("");
  const [width, setWidth] = React.useState<string>("10em");
  const [color, setColor] = React.useState<string>("blue");
  const [ariaRole, setAriaRole] = React.useState<string>("");
  const [customAttribute, setCustomAttribute] = React.useState<string>(
    "data-demo"
  );
  const [asElementType, setAs] = React.useState<ViewAsHTMLElementTypes>("div");
  const customAttributes = {};
  if (customAttribute) {
    customAttributes[customAttribute] = true;
  }

  return (
    <div>
      <h4>View Props:</h4>
      <div className="flex gap-5 flex-wrap my-8">
        <div className="flex items-center gap-1">
          <input
            id="disabled"
            name="disabled"
            type="checkbox"
            onChange={() => setDisabled(!disabled)}
          />
          <label htmlFor="disabled">isDisabled</label>
        </div>

        <input
          type="text"
          placeholder="Set aria-label text"
          value={ariaLabel}
          onChange={(event: any) => {
            setAriaLabel(event.target.value);
          }}
        />

        <input
          type="text"
          placeholder="Set aria-role text"
          value={ariaRole}
          onChange={(event: any) => {
            setAriaRole(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Set custom attribute"
          value={customAttribute}
          onChange={(event: any) => {
            setCustomAttribute(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Set width"
          value={width}
          onChange={(event: any) => {
            setWidth(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Set color"
          value={color}
          onChange={(event: any) => {
            setColor(event.target.value);
          }}
        />
        <select
          value={asElementType}
          placeholder="As element type"
          onChange={event =>
            setAs(event.target.value as ViewAsHTMLElementTypes)
          }
        >
          <option value="div">div</option>
          <option value="button">button</option>
          <option value="p">p</option>
          <option value="span">span</option>
        </select>
      </div>
      <View
        ariaLabel={ariaLabel}
        role={ariaRole}
        isDisabled={disabled}
        as={asElementType}
        data-demo="true"
        width={width}
        color={color}
        onClick={() => alert("🏔 What a beautiful <View>! 🔭")}
        {...customAttributes}
      >
        I'm a &lt;{asElementType}&gt;! 🤩
      </View>
    </div>
  );
};
