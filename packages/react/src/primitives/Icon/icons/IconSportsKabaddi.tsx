import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconSportsKabaddi } from '@aws-amplify/ui-react';` → `import { MdSportsKabaddi } from 'react-icons/md';`
 */
export const IconSportsKabaddi = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconSportsKabaddi } from '@aws-amplify/ui-react'; → import { MdSportsKabaddi } from 'react-icons/md';`,
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
        <g clip-path="url(#clip0_1020_42228)">
          <path
            d="M16.5 4.37988C17.6046 4.37988 18.5 3.48445 18.5 2.37988C18.5 1.27531 17.6046 0.379883 16.5 0.379883C15.3954 0.379883 14.5 1.27531 14.5 2.37988C14.5 3.48445 15.3954 4.37988 16.5 4.37988Z"
            fill="currentColor"
          />
          <path
            d="M23.9996 11.8799V7.17989L18.9496 5.03989C17.9796 4.62989 16.8596 4.97989 16.2996 5.87989L15.2996 7.47989C14.6296 8.65989 13.3896 9.53989 11.8896 9.79989L11.9496 9.85989C12.6396 10.5499 13.4696 10.9299 14.4096 11.0299C15.2096 10.6099 15.9296 10.0499 16.4996 9.38989L17.0996 12.3899L15.9396 13.4899L14.9996 14.3799V15.1399V21.8799H16.9996V15.8799L19.0996 13.8799L20.8996 21.8799H22.9996L20.8196 10.8799L20.1996 7.77989L21.9996 8.47989V11.8799H23.9996V11.8799Z"
            fill="black"
          />
          <path
            d="M10.29 8.08967C10.51 8.23967 10.76 8.32967 11.01 8.37967C11.14 8.39967 11.26 8.41967 11.39 8.41967C11.52 8.41967 11.65 8.40967 11.77 8.37967C11.9 8.35967 12.02 8.31967 12.14 8.26967C12.38 8.16967 12.61 8.02967 12.8 7.82967C13.29 7.33967 13.47 6.65967 13.35 6.02967C13.28 5.65967 13.1 5.28967 12.8 4.99967C12.61 4.80967 12.38 4.65967 12.14 4.55967C12.02 4.50967 11.9 4.46967 11.77 4.44967C11.64 4.42967 11.52 4.40967 11.39 4.40967C11.27 4.40967 11.16 4.41967 11.04 4.43967C10.9 4.45967 10.76 4.49967 10.63 4.54967C10.4 4.65967 10.17 4.80967 9.97996 4.99967C9.67996 5.28967 9.49996 5.65967 9.42996 6.02967C9.30996 6.65967 9.48996 7.33967 9.97996 7.82967C10.07 7.92967 10.18 8.00967 10.29 8.08967Z"
            fill="black"
          />
          <path
            d="M11.2398 10.56L9.2398 8.55998C9.1398 8.45998 9.0398 8.37998 8.9298 8.29998C8.7098 8.15998 8.4598 8.05998 8.2098 8.01998C8.0798 7.98998 7.9598 7.97998 7.8298 7.97998C7.3198 7.97998 6.8098 8.17998 6.4198 8.56998L3.0798 11.91C2.6698 12.32 2.4598 12.89 2.4998 13.45C2.4998 13.63 2.5398 13.82 2.6098 14L3.6798 16.95L0.0498047 20.58L1.4598 22L5.6998 17.76V15.54L6.9998 16.75V21.88H8.9998V15.88L6.8798 13.76L9.2398 11.4L9.9498 12.11C11.2398 13.37 12.9198 14.15 14.9798 14.15L14.8398 12.08C13.3398 12.06 12.1398 11.46 11.2398 10.56Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_1020_42228">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </View>
  );
};
