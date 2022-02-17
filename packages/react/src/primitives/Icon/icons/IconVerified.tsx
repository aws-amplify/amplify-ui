import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconVerified } from '@aws-amplify/ui-react';` → `import { MdVerified } from 'react-icons/md';`
 */
export const IconVerified = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconVerified');
  return (
    <View
      as="span"
      width="1em"
      height="1em"
      className={classNames(ComponentClassNames.Icon, className)}
      {...rest}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23 11.99L20.56 9.2L20.9 5.51L17.29 4.69L15.4 1.5L12 2.96L8.6 1.5L6.71 4.69L3.1 5.5L3.44 9.2L1 11.99L3.44 14.78L3.1 18.48L6.71 19.3L8.6 22.5L12 21.03L15.4 22.49L17.29 19.3L20.9 18.48L20.56 14.79L23 11.99ZM19.05 13.47L18.49 14.12L18.57 14.97L18.75 16.92L16.85 17.35L16.01 17.54L15.57 18.28L14.58 19.96L12.8 19.19L12 18.85L11.21 19.19L9.43 19.96L8.44 18.29L8 17.55L7.16 17.36L5.26 16.93L5.44 14.97L5.52 14.12L4.96 13.47L3.67 12L4.96 10.52L5.52 9.87L5.43 9.01L5.25 7.07L7.15 6.64L7.99 6.45L8.43 5.71L9.42 4.03L11.2 4.8L12 5.14L12.79 4.8L14.57 4.03L15.56 5.71L16 6.45L16.84 6.64L18.74 7.07L18.56 9.02L18.48 9.87L19.04 10.52L20.33 11.99L19.05 13.47Z"
          fill="currentColor"
        />
        <path
          d="M10.09 13.7501L7.77001 11.4201L6.29001 12.9101L10.09 16.7201L17.43 9.36012L15.95 7.87012L10.09 13.7501Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
