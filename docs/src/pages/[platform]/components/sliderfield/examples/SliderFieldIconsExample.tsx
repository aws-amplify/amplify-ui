import { SliderField, Icon } from '@aws-amplify/ui-react';

export const SliderFieldIconsExample = () => {
  return (
    <SliderField
      label="Volume slider"
      outerStartComponent={
        <Icon
          ariaLabel="volume-down-icon"
          pathData="M16 7.97V16.02C17.48 15.29 18.5 13.77 18.5 12C18.5 10.23 17.48 8.71 16 7.97ZM5 9V15H9L14 20V4L9 9H5ZM12 8.83V15.17L9.83 13H7V11H9.83L12 8.83Z"
        />
      }
      outerEndComponent={
        <Icon
          ariaLabel="volume-up-icon"
          pathData="M3 8.99998V15H7L12 20V3.99998L7 8.99998H3ZM10 8.82998V15.17L7.83 13H5V11H7.83L10 8.82998ZM16.5 12C16.5 10.23 15.48 8.70998 14 7.96998V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.22998V5.28998C16.89 6.14998 19 8.82998 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.71998 18.01 4.13998 14 3.22998V3.22998Z"
        />
      }
      defaultValue={50}
      size="large"
    />
  );
};
