import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCheckroom } from '@aws-amplify/ui-react';` → `import { MdCheckroom } from 'react-icons/md';`
 */
export const IconCheckroom = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconCheckroom');
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
          d="M21.5998 18.2002L12.9998 11.7502V10.8402C14.6498 10.3502 15.7998 8.67016 15.4298 6.79016C15.1698 5.48016 14.1298 4.39016 12.8198 4.09016C10.5398 3.57016 8.49977 5.30016 8.49977 7.50016H10.4998C10.4998 6.67016 11.1698 6.00016 11.9998 6.00016C12.8298 6.00016 13.4998 6.67016 13.4998 7.50016C13.4998 8.34016 12.8098 9.02016 11.9698 9.00016C11.4298 8.99016 10.9998 9.45016 10.9998 9.99016V11.7502L2.39977 18.2002C1.62977 18.7802 2.03977 20.0002 2.99977 20.0002H11.9998H20.9998C21.9598 20.0002 22.3698 18.7802 21.5998 18.2002ZM5.99977 18.0002L11.9998 13.5002L17.9998 18.0002H5.99977Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
