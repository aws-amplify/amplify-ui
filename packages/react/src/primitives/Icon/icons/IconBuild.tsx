import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconBuild } from '@aws-amplify/ui-react';` → `import { MdBuild } from 'react-icons/md';`
 */
export const IconBuild = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconBuild');
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
          d="M22.61 18.99L13.53 9.90997C14.46 7.56997 13.98 4.80997 12.09 2.90997C9.78999 0.609971 6.20999 0.399971 3.65999 2.25997L7.49999 6.10997L6.07999 7.51997L2.24999 3.68997C0.389992 6.22997 0.599992 9.81997 2.89999 12.11C4.75999 13.97 7.46999 14.46 9.78999 13.59L18.9 22.7C19.29 23.09 19.92 23.09 20.31 22.7L22.61 20.4C23.01 20.02 23.01 19.39 22.61 18.99ZM19.61 20.59L10.15 11.13C9.53999 11.58 8.85999 11.85 8.14999 11.95C6.78999 12.15 5.35999 11.74 4.31999 10.7C3.36999 9.75997 2.92999 8.49997 2.99999 7.25997L6.08999 10.35L10.33 6.10997L7.23999 3.01997C8.47999 2.94997 9.72999 3.38997 10.68 4.32997C11.76 5.40997 12.17 6.89997 11.92 8.28997C11.8 8.99997 11.5 9.65997 11.04 10.25L20.49 19.7L19.61 20.59Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
