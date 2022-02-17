import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNoLuggage } from '@aws-amplify/ui-react';` → `import { MdNoLuggage } from 'react-icons/md';`
 */
export const IconNoLuggage = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconNoLuggage');
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
          d="M16.0001 13.17L14.5001 11.67V9H16.0001V13.17ZM19.7801 22.61L17.9301 20.76C17.6501 20.91 17.3401 21 17.0001 21C17.0001 21.55 16.5501 22 16.0001 22C15.4501 22 15.0001 21.55 15.0001 21H9.00014C9.00014 21.55 8.55014 22 8.00014 22C7.45014 22 7.00014 21.55 7.00014 21C5.90014 21 5.00014 20.1 5.00014 19V8C5.00014 7.95 5.02014 7.9 5.02014 7.85L1.39014 4.22L2.80014 2.81L21.1801 21.19L19.7801 22.61ZM16.1701 19L12.7501 15.58V18H11.2501V14.08L9.50014 12.33V18H8.00014V10.83L7.00014 9.83V19H16.1701ZM12.7501 9H11.8301L12.7501 9.92V9ZM19.0001 8V16.17L17.0001 14.17V8H10.8301L9.84014 7.01L9.00014 6.17V6V3C9.00014 2.45 9.45014 2 10.0001 2H14.0001C14.5501 2 15.0001 2.45 15.0001 3V6H17.0001C18.1001 6 19.0001 6.9 19.0001 8ZM10.5001 6H13.5001V3.5H10.5001V6Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
