import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconGrade } from '@aws-amplify/ui-react';` → `import { MdGrade } from 'react-icons/md';`
 */
export const IconGrade = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconGrade } from '@aws-amplify/ui-react'; → import { MdGrade } from 'react-icons/md';`,
  });
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
          d="M12 7.13L12.97 9.42L13.44 10.53L14.64 10.63L17.11 10.84L15.23 12.47L14.32 13.26L14.59 14.44L15.15 16.85L13.03 15.57L12 14.93L10.97 15.55L8.85 16.83L9.41 14.42L9.68 13.24L8.77 12.45L6.89 10.82L9.36 10.61L10.56 10.51L11.03 9.4L12 7.13V7.13ZM12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
