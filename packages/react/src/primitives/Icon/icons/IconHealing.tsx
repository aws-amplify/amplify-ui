import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHealing } from '@aws-amplify/ui-react';` → `import { MdHealing } from 'react-icons/md';`
 */
export const IconHealing = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconHealing');
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
          d="M17.73 12.0201L21.71 8.04006C22.1 7.65006 22.1 7.02006 21.71 6.63006L17.37 2.29006C16.98 1.90006 16.35 1.90006 15.96 2.29006L11.98 6.27006L8.00002 2.29006C7.80002 2.10006 7.55002 2.00006 7.29002 2.00006C7.04002 2.00006 6.78002 2.10006 6.59002 2.29006L2.25002 6.63006C1.86002 7.02006 1.86002 7.65006 2.25002 8.04006L6.23002 12.0201L2.25002 16.0001C1.86002 16.3901 1.86002 17.0201 2.25002 17.4101L6.59002 21.7501C6.98002 22.1401 7.61002 22.1401 8.00002 21.7501L11.98 17.7701L15.96 21.7501C16.16 21.9501 16.41 22.0401 16.67 22.0401C16.93 22.0401 17.18 21.9401 17.38 21.7501L21.72 17.4101C22.11 17.0201 22.11 16.3901 21.72 16.0001L17.73 12.0201V12.0201ZM12 9.00006C12.55 9.00006 13 9.45006 13 10.0001C13 10.5501 12.55 11.0001 12 11.0001C11.45 11.0001 11 10.5501 11 10.0001C11 9.45006 11.45 9.00006 12 9.00006ZM7.29002 10.9601L3.66002 7.34006L7.29002 3.71006L10.91 7.33006L7.29002 10.9601ZM10 13.0001C9.45002 13.0001 9.00002 12.5501 9.00002 12.0001C9.00002 11.4501 9.45002 11.0001 10 11.0001C10.55 11.0001 11 11.4501 11 12.0001C11 12.5501 10.55 13.0001 10 13.0001ZM12 15.0001C11.45 15.0001 11 14.5501 11 14.0001C11 13.4501 11.45 13.0001 12 13.0001C12.55 13.0001 13 13.4501 13 14.0001C13 14.5501 12.55 15.0001 12 15.0001ZM14 11.0001C14.55 11.0001 15 11.4501 15 12.0001C15 12.5501 14.55 13.0001 14 13.0001C13.45 13.0001 13 12.5501 13 12.0001C13 11.4501 13.45 11.0001 14 11.0001ZM16.66 20.3401L13.03 16.7201L16.66 13.0901L20.28 16.7101L16.66 20.3401Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
