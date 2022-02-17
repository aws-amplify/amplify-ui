import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconCampaign } from '@aws-amplify/ui-react';` → `import { MdCampaign } from 'react-icons/md';`
 */
export const IconCampaign = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconCampaign');
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
          d="M18 11C18 11.67 18 12.33 18 13C19.2 13 20.76 13 22 13C22 12.33 22 11.67 22 11C20.76 11 19.2 11 18 11Z"
          fill="currentColor"
        />
        <path
          d="M16 17.61C16.96 18.32 18.21 19.26 19.2 20C19.6 19.47 20 18.93 20.4 18.4C19.41 17.66 18.16 16.72 17.2 16C16.8 16.54 16.4 17.08 16 17.61Z"
          fill="black"
        />
        <path
          d="M20.4 5.6C20 5.07 19.6 4.53 19.2 4C18.21 4.74 16.96 5.68 16 6.4C16.4 6.93 16.8 7.47 17.2 8C18.16 7.28 19.41 6.35 20.4 5.6Z"
          fill="black"
        />
        <path
          d="M4 9C2.9 9 2 9.9 2 11V13C2 14.1 2.9 15 4 15H5V19H7V15H8L13 18V6L8 9H4ZM9.03 10.71L11 9.53V14.47L9.03 13.29L8.55 13H8H4V11H8H8.55L9.03 10.71Z"
          fill="black"
        />
        <path
          d="M15.5 11.9999C15.5 10.6699 14.92 9.4699 14 8.6499V15.3399C14.92 14.5299 15.5 13.3299 15.5 11.9999Z"
          fill="black"
        />
      </svg>
    </View>
  );
};
