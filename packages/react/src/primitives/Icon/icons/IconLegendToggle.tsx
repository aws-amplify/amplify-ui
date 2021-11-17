import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';

export const IconLegendToggle = (props) => {
  const { className, ...rest } = props;
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
          d="M20 15H4V13H20V15ZM20 17H4V19H20V17ZM15 11L20 7.45V5L15 8.55L10 5L4 8.66V11L9.92 7.39L15 11Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
