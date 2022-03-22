import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAirlineSeatReclineNormal } from '@aws-amplify/ui-react';` → `import { MdAirlineSeatReclineNormal } from 'react-icons/md';`
 */
export const IconAirlineSeatReclineNormal = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconAirlineSeatReclineNormal } from '@aws-amplify/ui-react'; → import { MdAirlineSeatReclineNormal } from 'react-icons/md';`,
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
          d="M7.59 5.41012C6.81 4.63012 6.81 3.36012 7.59 2.58012C8.37 1.80012 9.64 1.80012 10.42 2.58012C11.2 3.36012 11.2 4.63012 10.42 5.41012C9.63 6.20012 8.37 6.20012 7.59 5.41012ZM6 16.0001V7.00012H4V16.0001C4 18.7601 6.24 21.0001 9 21.0001H15V19.0001H9C7.34 19.0001 6 17.6601 6 16.0001ZM20 20.0701L14.93 15.0001H11.5V11.3201C12.9 12.4701 15.1 13.4801 17 13.4801V11.3201C15.34 11.3401 13.39 10.4501 12.33 9.28012L10.93 7.73012C10.74 7.52012 10.5 7.35012 10.24 7.23012C9.95 7.09012 9.62 7.00012 9.28 7.00012H9.25C8.01 7.00012 7 8.01012 7 9.25012V15.0001C7 16.6601 8.34 18.0001 10 18.0001H15.07L18.57 21.5001L20 20.0701Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
