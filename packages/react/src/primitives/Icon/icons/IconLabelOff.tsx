import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconLabelOff } from '@aws-amplify/ui-react';` → `import { MdLabelOff } from 'react-icons/md';`
 */
export const IconLabelOff = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconLabelOff');
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
          d="M16 7.00012L19.55 12.0001L17.92 14.2901L19.35 15.7201L22 12.0001L17.63 5.84012C17.27 5.33012 16.67 5.00012 16 5.00012L8.63 5.01012L10.63 7.00012H16ZM2 4.03012L3.58 5.61012C3.22 5.96012 3 6.46012 3 7.00012V17.0001C3 18.1001 3.9 18.9901 5 18.9901L16 19.0001C16.28 19.0001 16.55 18.9301 16.79 18.8201L18.97 21.0001L20.38 19.5901L3.41 2.62012L2 4.03012ZM14.97 17.0001H5V7.03012L14.97 17.0001Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
