import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSportsFootball } from '@aws-amplify/ui-react';` → `import { MdSportsFootball } from 'react-icons/md';`
 */
export const IconSportsFootball = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSportsFootball } from '@aws-amplify/ui-react'; → import { MdSportsFootball } from 'react-icons/md';`,
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
          d="M20.3098 3.69C19.9898 3.36 18.3698 3 16.2598 3C13.2298 3 9.16983 3.75 6.45983 6.46C1.86983 11.05 2.89983 19.52 3.68983 20.31C4.00983 20.64 5.62983 21 7.73983 21C10.7698 21 14.8298 20.25 17.5398 17.54C22.1298 12.95 21.0998 4.48 20.3098 3.69ZM7.73983 19C6.59983 19 5.71983 18.88 5.20983 18.77C5.02983 17.98 4.90983 16.56 5.03983 14.94L9.04983 18.95C8.52983 18.99 8.07983 19 7.73983 19ZM16.1298 16.13C14.7998 17.46 13.0698 18.18 11.4698 18.57L5.42983 12.53C5.84983 10.85 6.58983 9.16 7.87983 7.88C9.19983 6.56 10.9298 5.84 12.5198 5.45L18.5698 11.5C18.1498 13.17 17.3998 14.85 16.1298 16.13ZM18.9598 9.09L14.9298 5.06C15.4498 5.01 15.9098 5 16.2598 5C17.3998 5 18.2798 5.12 18.7898 5.23C18.9698 6.02 19.0898 7.45 18.9598 9.09Z"
          fill="currentColor"
        />
        <path
          d="M14.0997 8.49987L8.49951 14.1001L9.89957 15.5002L15.4998 9.89992L14.0997 8.49987Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
