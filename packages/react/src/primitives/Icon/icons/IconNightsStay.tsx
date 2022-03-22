import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNightsStay } from '@aws-amplify/ui-react';` → `import { MdNightsStay } from 'react-icons/md';`
 */
export const IconNightsStay = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNightsStay } from '@aws-amplify/ui-react'; → import { MdNightsStay } from 'react-icons/md';`,
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
          d="M19.78 17.5098C17.31 17.5098 13.21 16.1798 11.1 12.0798C8.76998 7.56977 10.6 3.59977 11.63 2.00977C6.26998 2.19977 1.97998 6.58977 1.97998 11.9998C1.97998 12.1398 1.99998 12.2798 1.99998 12.4198C2.60998 12.1598 3.27998 11.9998 3.97998 11.9998C3.97998 8.90977 5.70998 6.22977 8.27998 4.89977C7.77998 7.08977 7.73998 9.93977 9.31998 12.9998C10.89 16.0398 13.5 17.9498 16.12 18.8598C14.89 19.5998 13.47 20.0098 11.99 20.0098C11.49 20.0098 10.99 19.9598 10.51 19.8698C10.14 20.5698 9.56998 21.1398 8.86998 21.5098C9.84998 21.8298 10.9 22.0098 11.98 22.0098C15.48 22.0098 18.56 20.2098 20.35 17.4898C20.18 17.4998 19.98 17.5098 19.78 17.5098Z"
          fill="currentColor"
        />
        <path
          d="M7 16H6.82C6.4 14.84 5.3 14 4 14C2.34 14 1 15.34 1 17C1 18.66 2.34 20 4 20C4.62 20 6.49 20 7 20C8.1 20 9 19.1 9 18C9 16.9 8.1 16 7 16Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
