import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconWhereToVote } from '@aws-amplify/ui-react';` → `import { MdWhereToVote } from 'react-icons/md';`
 */
export const IconWhereToVote = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconWhereToVote } from '@aws-amplify/ui-react'; → import { MdWhereToVote } from 'react-icons/md';`,
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
          d="M12 1C7.59 1 4 4.59 4 9C4 14.57 10.96 22.34 11.26 22.67L12 23.49L12.74 22.67C13.04 22.34 20 14.57 20 9C20 4.59 16.41 1 12 1ZM12 20.47C9.82 17.86 6 12.54 6 9C6 5.69 8.69 3 12 3C15.31 3 18 5.69 18 9C18 12.83 13.75 18.36 12 20.47ZM10.47 11.17L8.71 9.4L7.29 10.82L10.47 14L16.48 7.99L15.07 6.57L10.47 11.17Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
