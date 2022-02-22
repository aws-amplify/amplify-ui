import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconMilitaryTech } from '@aws-amplify/ui-react';` → `import { MdMilitaryTech } from 'react-icons/md';`
 */
export const IconMilitaryTech = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconMilitaryTech } from '@aws-amplify/ui-react'; → import { MdMilitaryTech } from 'react-icons/md';`,
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
          d="M17 10.43V2H7V10.43C7 10.78 7.18 11.11 7.49 11.29L11.67 13.8L10.68 16.14L7.27 16.43L9.86 18.67L9.07 22L12 20.23L14.93 22L14.15 18.67L16.74 16.43L13.33 16.14L12.34 13.8L16.52 11.29C16.82 11.11 17 10.79 17 10.43ZM11 11.07L9 9.87V4H11V11.07ZM15 9.87L13 11.07V4H15V9.87Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
