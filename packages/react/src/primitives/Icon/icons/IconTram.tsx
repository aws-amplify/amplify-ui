import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconTram } from '@aws-amplify/ui-react';` → `import { MdTram } from 'react-icons/md';`
 */
export const IconTram = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconTram');
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
          d="M13 5L13.75 3.5H17V2H7V3.5H11.75L11 5C7.87 5.09 5 5.73 5 8.5V17C5 18.5 6.11 19.73 7.55 19.95L6 21.5V22H8L10 20H14L16 22H18V21.5L16.45 19.95H16.44H16.45C17.89 19.73 19 18.5 19 17V8.5C19 5.73 16.13 5.09 13 5ZM11.03 7H12.97C15.72 7.08 16.59 7.58 16.87 8H7.13C7.41 7.58 8.28 7.08 11.03 7ZM10.85 17.95H7.74C7.3 17.84 7 17.45 7 17V16H10.89C10.65 16.27 10.5 16.61 10.5 17C10.5 17.36 10.63 17.69 10.85 17.95ZM17 17C17 17.45 16.7 17.84 16.26 17.95H13.15C13.37 17.69 13.5 17.36 13.5 17C13.5 16.61 13.35 16.27 13.11 16H17V17ZM17 14H7V10H17V14Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
