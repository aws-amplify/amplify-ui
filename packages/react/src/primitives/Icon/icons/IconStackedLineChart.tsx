import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { deprecationWarning } from '../deprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconStackedLineChart } from '@aws-amplify/ui-react';` → `import { MdStackedLineChart } from 'react-icons/md';`
 */
export const IconStackedLineChart = (props) => {
  const { className, ...rest } = props;
  deprecationWarning('IconStackedLineChart');
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
          d="M2 19.9898L9.5 12.4798L13.5 16.4798L20.59 8.50977L22 9.91977L13.5 19.4798L9.5 15.4798L3.5 21.4898L2 19.9898ZM3.5 15.4898L9.5 9.47976L13.5 13.4798L22 3.91977L20.59 2.50977L13.5 10.4798L9.5 6.47977L2 13.9898L3.5 15.4898Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
