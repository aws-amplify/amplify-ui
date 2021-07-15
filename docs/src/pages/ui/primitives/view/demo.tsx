import React from 'react';
import { View, ViewAsHTMLElementTypes } from '@aws-amplify/ui-react';

const FieldSet: React.FC<{
  id: string;
  direction?: string;
  order?: string;
  alignItems?: string;
}> = ({
  children,
  id,
  direction = 'flex-col',
  order = 'order-first',
  alignItems = '',
}) => (
  <fieldset className={`flex gap-1 ${direction} ${alignItems}`}>
    <label className={`pr-2 ${order}`} htmlFor={id}>
      {id}
    </label>
    {children}
  </fieldset>
);

export const ViewDemo = ({ children }) => {
  const [disabled, setDisabled] = React.useState<boolean>(false);
  const [ariaLabel, setAriaLabel] = React.useState<string>('');
  const [width, setWidth] = React.useState<string>('20em');
  const [height, setHeight] = React.useState<string>('4rem');
  const [maxHeight, setMaxHeight] = React.useState<string>('');
  const [minHeight, setMinHeight] = React.useState<string>('');
  const [maxWidth, setMaxWidth] = React.useState<string>('');
  const [minWidth, setMinWidth] = React.useState<string>('');
  const [color, setColor] = React.useState<string>('blue');
  const [role, setAriaRole] = React.useState<string>('');
  const [backgroundColor, setBackgroundColor] = React.useState<string>('white');
  const [boxShadow, setBoxShadow] = React.useState<string>(
    '3px 3px 5px 6px #ccc'
  );
  const [padding, setPadding] = React.useState<string>('1rem');
  const [border, setBorder] = React.useState<string>('1px solid black');
  const [borderRadius, setBorderRadius] = React.useState<string>('4px');
  const [opacity, setOpacity] = React.useState<string>('100%');
  const [customAttribute, setCustomAttribute] =
    React.useState<string>('data-demo');
  const [asElementType, setAs] = React.useState<ViewAsHTMLElementTypes>('div');
  const customAttributes = {};
  if (customAttribute) {
    customAttributes[customAttribute] = true;
  }

  return (
    <div>
      <h4>View Props:</h4>
      <div className="grid grid-cols-3 gap-5 flex-wrap my-8">
        <FieldSet id="as">
          <select
            id="as"
            value={asElementType}
            placeholder="As element type"
            onChange={(event) =>
              setAs(event.target.value as ViewAsHTMLElementTypes)
            }
          >
            <option value="div">div</option>
            <option value="button">button</option>
            <option value="p">p</option>
            <option value="span">span</option>
          </select>
        </FieldSet>

        <FieldSet id="ariaLabel">
          <input
            type="text"
            placeholder="Set aria-label text"
            value={ariaLabel}
            onChange={(event: any) => {
              setAriaLabel(event.target.value);
            }}
          />
        </FieldSet>

        <FieldSet id="backgroundColor">
          <input
            type="text"
            placeholder="Set backgroundColor"
            value={backgroundColor}
            onChange={(event: any) => {
              setBackgroundColor(event.target.value);
            }}
          />
        </FieldSet>

        <FieldSet id="border">
          <input
            type="text"
            placeholder="Set border"
            value={border}
            onChange={(event: any) => {
              setBorder(event.target.value);
            }}
          />
        </FieldSet>

        <FieldSet id="borderRadius">
          <input
            type="text"
            placeholder="Set borderRadius"
            value={borderRadius}
            onChange={(event: any) => {
              setBorderRadius(event.target.value);
            }}
          />
        </FieldSet>

        <FieldSet id="boxShadow">
          <input
            type="text"
            placeholder="Set boxShadow"
            value={boxShadow}
            onChange={(event: any) => {
              setBoxShadow(event.target.value);
            }}
          />
        </FieldSet>

        <FieldSet id="color">
          <input
            type="text"
            placeholder="Set color"
            id="color"
            name="color"
            value={color}
            onChange={(event: any) => {
              setColor(event.target.value);
            }}
          />
        </FieldSet>

        <FieldSet id="customAttribute">
          <input
            type="text"
            placeholder="Set custom attribute"
            value={customAttribute}
            onChange={(event: any) => {
              setCustomAttribute(event.target.value);
            }}
          />
        </FieldSet>

        <FieldSet id="height">
          <input
            type="text"
            placeholder="Set height"
            value={height}
            onChange={(event: any) => {
              setHeight(event.target.value);
            }}
          />
        </FieldSet>

        <FieldSet
          id="isDisabled"
          order="order-last"
          direction="flex-row"
          alignItems="items-center"
        >
          <input
            id="isDisabled"
            name="disabled"
            type="checkbox"
            onChange={() => setDisabled(!disabled)}
          />
        </FieldSet>

        <FieldSet id="maxHeight">
          <input
            type="text"
            placeholder="Set maxHeight"
            value={maxHeight}
            onChange={(event: any) => {
              setMaxHeight(event.target.value);
            }}
          />
        </FieldSet>

        <FieldSet id="maxWidth">
          <input
            type="text"
            placeholder="Set maxWidth"
            value={maxWidth}
            onChange={(event: any) => {
              setMaxWidth(event.target.value);
            }}
          />
        </FieldSet>

        <FieldSet id="minHeight">
          <input
            type="text"
            placeholder="Set minHeight"
            value={minHeight}
            onChange={(event: any) => {
              setMinHeight(event.target.value);
            }}
          />
        </FieldSet>

        <FieldSet id="minWidth">
          <input
            type="text"
            placeholder="Set minWidth"
            value={minWidth}
            onChange={(event: any) => {
              setMinWidth(event.target.value);
            }}
          />
        </FieldSet>

        <FieldSet id="role">
          <input
            type="text"
            placeholder="Set role"
            value={role}
            onChange={(event: any) => {
              setAriaRole(event.target.value);
            }}
          />
        </FieldSet>

        <FieldSet id="opacity">
          <input
            type="text"
            placeholder="Set opacity"
            value={opacity}
            onChange={(event: any) => {
              setOpacity(event.target.value);
            }}
          />
        </FieldSet>

        <FieldSet id="padding">
          <input
            type="text"
            placeholder="Set padding"
            value={padding}
            onChange={(event: any) => {
              setPadding(event.target.value);
            }}
          />
        </FieldSet>

        <FieldSet id="width">
          <input
            type="text"
            placeholder="Set width"
            value={width}
            onChange={(event: any) => {
              setWidth(event.target.value);
            }}
          />
        </FieldSet>
      </div>
      <View
        ariaLabel={ariaLabel}
        as={asElementType}
        backgroundColor={backgroundColor}
        borderRadius={borderRadius}
        border={border}
        boxShadow={boxShadow}
        color={color}
        height={height}
        isDisabled={disabled}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
        minHeight={minHeight}
        minWidth={minWidth}
        onClick={() => alert('🏔 What a beautiful <View>! 🔭')}
        opacity={opacity}
        padding={padding}
        role={role}
        width={width}
        {...customAttributes}
      >
        I'm a &lt;{asElementType}&gt;! 🤩
      </View>
    </div>
  );
};
