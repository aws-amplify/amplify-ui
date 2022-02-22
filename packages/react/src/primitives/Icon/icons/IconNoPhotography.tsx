import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconNoPhotography } from '@aws-amplify/ui-react';` → `import { MdNoPhotography } from 'react-icons/md';`
 */
export const IconNoPhotography = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconNoPhotography } from '@aws-amplify/ui-react'; → import { MdNoPhotography } from 'react-icons/md';`,
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
          d="M8.90018 6.0701L7.48018 4.6601L9.00018 3.0001H15.0002L16.8302 5.0001H20.0002C21.1002 5.0001 22.0002 5.9001 22.0002 7.0001V19.0001C22.0002 19.0501 21.9902 19.1001 21.9802 19.1601L20.0002 17.1701V7.0001H15.9502L14.1202 5.0001H9.88018L8.90018 6.0701ZM20.4902 23.3101L18.1702 21.0001H4.00018C2.90018 21.0001 2.00018 20.1001 2.00018 19.0001V7.0001C2.00018 6.4101 2.27018 5.8801 2.68018 5.5101L0.680176 3.5101L2.10018 2.1001L21.9002 21.9001L20.4902 23.3101ZM9.19018 12.0201C9.08018 12.3301 9.00018 12.6501 9.00018 13.0001C9.00018 14.6601 10.3402 16.0001 12.0002 16.0001C12.3502 16.0001 12.6702 15.9201 12.9802 15.8101L9.19018 12.0201ZM16.1702 19.0001L14.4902 17.3201C13.7602 17.7501 12.9102 18.0001 12.0002 18.0001C9.24018 18.0001 7.00018 15.7601 7.00018 13.0001C7.00018 12.0901 7.25018 11.2401 7.68018 10.5101L4.17018 7.0001H4.00018V19.0001H16.1702ZM14.8102 11.9801L16.8802 14.0501C16.9602 13.7101 17.0002 13.3601 17.0002 13.0001C17.0002 10.2401 14.7602 8.0001 12.0002 8.0001C11.6402 8.0001 11.2902 8.0401 10.9402 8.1201L13.0102 10.1901C13.8502 10.4901 14.5102 11.1501 14.8102 11.9801Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
