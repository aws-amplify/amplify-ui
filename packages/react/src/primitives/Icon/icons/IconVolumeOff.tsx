import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconVolumeOff } from '@aws-amplify/ui-react';` → `import { MdVolumeOff } from 'react-icons/md';`
 */
export const IconVolumeOff = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconVolumeOff');
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
          d="M4.34005 2.93018L2.93005 4.34018L7.29005 8.70018L7.00005 9.00018H3.00005V15.0002H7.00005L12.0001 20.0002V13.4102L16.1801 17.5902C15.5301 18.0802 14.8001 18.4702 14.0001 18.7002V20.7602C15.3401 20.4602 16.5701 19.8402 17.6101 19.0102L19.6601 21.0602L21.0701 19.6502L4.34005 2.93018ZM10.0001 15.1702L7.83005 13.0002H5.00005V11.0002H7.83005L8.71005 10.1202L10.0001 11.4102V15.1702ZM19.0001 12.0002C19.0001 12.8202 18.8501 13.6102 18.5901 14.3402L20.1201 15.8702C20.6801 14.7002 21.0001 13.3902 21.0001 12.0002C21.0001 7.72018 18.0101 4.14018 14.0001 3.23018V5.29018C16.8901 6.15018 19.0001 8.83018 19.0001 12.0002ZM12.0001 4.00018L10.1201 5.88018L12.0001 7.76018V4.00018ZM16.5001 12.0002C16.5001 10.2302 15.4801 8.71018 14.0001 7.97018V9.76018L16.4801 12.2402C16.4901 12.1602 16.5001 12.0802 16.5001 12.0002Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
