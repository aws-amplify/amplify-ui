import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconAgriculture } from '@aws-amplify/ui-react';` → `import { MdAgriculture } from 'react-icons/md';`
 */
export const IconAgriculture = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconAgriculture');
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
          d="M4 9H9C9 7.9 8.1 7 7 7H4C3.45 7 3 7.45 3 8C3 8.55 3.45 9 4 9Z"
          fill="currentColor"
        />
        <path
          d="M22 14.0601V8.00007C22 6.90007 21.1 6.00007 20 6.00007H13.71L12.65 4.94007L14.06 3.53007L13.35 2.82007L9.82 6.35007L10.53 7.06007L11.94 5.65007L13 6.71007V9.00007C13 10.1001 12.1 11.0001 11 11.0001H8.96C8.74 10.8401 8.51 10.7001 8.27 10.5701L7.87 11.4601L7.41 11.2501L7.81 10.3501C7.26 10.1301 6.64 10.0001 6 10.0001C5.47 10.0001 4.96 10.1101 4.48 10.2601L4.82 11.1701L4.35 11.3501L4 10.4201C2.94 10.8801 2.09 11.7001 1.57 12.7301L2.46 13.1301L2.25 13.5901L1.35 13.1901C1.13 13.7401 1 14.3601 1 15.0001C1 15.5301 1.11 16.0401 1.26 16.5201L2.17 16.1801L2.35 16.6501L1.42 17.0001C1.88 18.0601 2.7 18.9101 3.73 19.4301L4.13 18.5401L4.59 18.7501L4.19 19.6501C4.74 19.8701 5.36 20.0001 6 20.0001C6.53 20.0001 7.04 19.8901 7.52 19.7401L7.18 18.8301L7.65 18.6501L8 19.5801C9.06 19.1201 9.91 18.3001 10.43 17.2701L9.54 16.8701L9.75 16.4101L10.65 16.8101C10.75 16.5501 10.83 16.2701 10.89 15.9901H16.05C16.03 16.1601 16 16.3301 16 16.5001C16 18.4301 17.57 20.0001 19.5 20.0001C21.43 20.0001 23 18.4301 23 16.5001C23 15.5501 22.62 14.6901 22 14.0601ZM6 18.0001C4.34 18.0001 3 16.6601 3 15.0001C3 13.3401 4.34 12.0001 6 12.0001C7.66 12.0001 9 13.3401 9 15.0001C9 16.6601 7.66 18.0001 6 18.0001ZM10.87 14.0001C10.83 13.8201 10.79 13.6501 10.74 13.4801L9.83 13.8201L9.65 13.3501L10.58 13.0001H11C13.21 13.0001 15 11.2101 15 9.00007V8.00007H20V13.0501C19.84 13.0301 19.67 13.0001 19.5 13.0001C18.55 13.0001 17.69 13.3801 17.06 14.0001H10.87ZM19.5 18.0001C18.67 18.0001 18 17.3301 18 16.5001C18 15.6701 18.67 15.0001 19.5 15.0001C20.33 15.0001 21 15.6701 21 16.5001C21 17.3301 20.33 18.0001 19.5 18.0001Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
