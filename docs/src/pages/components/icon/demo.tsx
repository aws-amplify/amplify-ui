import React from 'react';
import { Property } from 'csstype';

import { Icon, IconSize, Flex } from '@aws-amplify/ui-react';
import { Example } from '@/components/Example';

export const IconDemo = () => {
  const [width, setWidth] = React.useState<number>(24);
  const [height, setHeight] = React.useState<number>(24);
  const [size, setSize] = React.useState<IconSize>();
  const [fill, setFill] = React.useState<Property.Color>('currentColor');
  const [ariaLabel, setAriaLabel] = React.useState<string>('search');
  const [pathData, setPathData] = React.useState<string>(
    `M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5
     3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 
     4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z`
  );

  return (
    <div className="amplify-icon-demo">
      <h3>Icon Props:</h3>
      <Flex gap="5" wrap="wrap">
        <div>
          <label htmlFor="icon-demo-viewBox-width">ViewBox width</label>
          <input
            id="icon-demo-viewBox-width"
            type="text"
            placeholder="Set viewBox width"
            value={width}
            onChange={(event: any) => {
              setWidth(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="icon-demo-viewBox-height">ViewBox height</label>
          <input
            id="icon-demo-viewBox-height"
            type="text"
            placeholder="Set viewBox height"
            value={height}
            onChange={(event: any) => {
              setHeight(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="icon-demo-path-data">PathData</label>
          <input
            id="icon-demo-path-data"
            type="text"
            placeholder="Set icon path data"
            value={pathData}
            onChange={(event: any) => {
              setPathData(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="icon-demo-fill">fill</label>
          <input
            id="icon-demo-fill"
            type="text"
            placeholder="Set fill color"
            value={fill}
            onChange={(event: any) => {
              setFill(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="icon-demo-aria-label">ariaLabel</label>
          <input
            id="icon-demo-aria-label"
            type="text"
            placeholder="Set aria-label text"
            value={ariaLabel}
            onChange={(event: any) => {
              setAriaLabel(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="icon-demo-size">Size</label>
          <select
            id="icon-demo-size"
            value={size}
            onChange={(event) => setSize(event.target.value as IconSize)}
          >
            <option value="">default</option>
            <option value="small">small</option>
            <option value="large">large</option>
          </select>
        </div>
      </Flex>
      <Example>
        <Icon
          pathData={pathData}
          viewBox={{ width, height }}
          fill={fill}
          size={size}
          ariaLabel={ariaLabel}
          className="icon-demo-search"
        />
      </Example>
    </div>
  );
};
