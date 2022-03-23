import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconEditRoad } from '@aws-amplify/ui-react';` → `import { MdEditRoad } from 'react-icons/md';`
 */
export const IconEditRoad = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconEditRoad } from '@aws-amplify/ui-react'; → import { MdEditRoad } from 'react-icons/md';`,
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
        <path d="M18 4H16V11.9L18 9.9V4Z" fill="currentColor" />
        <path d="M6 4H4V20H6V4Z" fill="black" />
        <path d="M12 4H10V8H12V4Z" fill="black" />
        <path d="M12 10H10V14H12V10Z" fill="black" />
        <path d="M12 16H10V20H12V16Z" fill="black" />
        <path
          d="M22.56 12.5901L21.41 11.4401C20.82 10.8501 19.87 10.8501 19.29 11.4401L14 16.7301V20.0001H17.27L22.56 14.7101C23.15 14.1201 23.15 13.1701 22.56 12.5901ZM16.58 18.4501H15.55V17.4201L19 13.9701L20.03 15.0001L16.58 18.4501Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
