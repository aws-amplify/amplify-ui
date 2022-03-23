import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLayersClear } from '@aws-amplify/ui-react';` → `import { MdLayersClear } from 'react-icons/md';`
 */
export const IconLayersClear = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconLayersClear } from '@aws-amplify/ui-react'; → import { MdLayersClear } from 'react-icons/md';`,
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
          d="M12 4.52986L17.74 8.99986L15.85 10.4699L17.28 11.8899L21 8.99986L12 1.99986L9.41 4.01986L10.83 5.43986L12 4.52986ZM21 14.0699L19.37 12.7999L18.7 13.3199L20.13 14.7499L21 14.0699ZM3.41 0.859863L2 2.26986L6.22 6.48986L3 8.99986L12 15.9999L14.1 14.3699L15.52 15.7899L11.99 18.5399L4.62 12.8099L3 14.0699L12 21.0699L16.95 17.2199L20.73 20.9999L22.14 19.5899L3.41 0.859863ZM12 13.4699L6.26 8.99986L7.65 7.91986L12.67 12.9399L12 13.4699V13.4699Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
