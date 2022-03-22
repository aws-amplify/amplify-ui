import classNames from 'classnames';

import { ComponentClassNames } from '../../shared';
import { View } from '../../View';
import { useDeprecationWarning } from '../../../hooks/useDeprecationWarning';

/**
 * @deprecated These icons are being removed in the next major release. You can use the [react-icons](https://react-icons.github.io/react-icons) package or other React icon libraries in its place. `import { IconHearingDisabled } from '@aws-amplify/ui-react';` → `import { MdHearingDisabled } from 'react-icons/md';`
 */
export const IconHearingDisabled = (props) => {
  const { className, ...rest } = props;
  useDeprecationWarning({
    shouldWarn: true,
    message: `Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { IconHearingDisabled } from '@aws-amplify/ui-react'; → import { MdHearingDisabled } from 'react-icons/md';`,
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
          d="M6.03001 3.20021C7.15001 2.44021 8.51001 2.00021 10 2.00021C13.93 2.00021 17 5.07021 17 9.00021C17 10.2602 16.62 11.6502 15.93 12.9002C15.91 12.9402 15.88 12.9802 15.85 13.0302L14.37 11.5502C14.77 10.6902 15 9.80021 15 9.00021C15 6.20021 12.8 4.00021 10 4.00021C9.08001 4.00021 8.24001 4.26021 7.50001 4.67021L6.03001 3.20021ZM17.21 14.3802L18.64 15.8102C20.11 13.9302 21 11.5702 21 9.00021C21 5.96021 19.77 3.21021 17.78 1.22021L16.36 2.64021C17.99 4.26021 19 6.51021 19 9.00021C19 11.0202 18.33 12.8802 17.21 14.3802ZM10 6.50021C9.79001 6.50021 9.60001 6.53021 9.41001 6.58021L12.42 9.59021C12.47 9.40021 12.5 9.21021 12.5 9.00021C12.5 7.62021 11.38 6.50021 10 6.50021ZM21.19 21.1902L2.81001 2.81021L1.39001 4.22021L3.52001 6.35021C3.19001 7.16021 3.00001 8.05021 3.00001 9.00021H5.00001C5.00001 8.64021 5.05001 8.29021 5.12001 7.95021L11.73 14.5602C10.85 15.2402 9.95001 15.9702 9.46001 17.4602C8.96001 18.9602 8.46001 19.4702 7.75001 19.8402C7.56001 19.9402 7.29001 20.0002 7.00001 20.0002C5.90001 20.0002 5.00001 19.1002 5.00001 18.0002H3.00001C3.00001 20.2102 4.79001 22.0002 7.00001 22.0002C7.57001 22.0002 8.13002 21.8802 8.64002 21.6502C10 20.9402 10.77 19.9202 11.37 18.1002C11.69 17.1202 12.27 16.6702 13.08 16.0502C13.11 16.0302 13.13 16.0102 13.16 15.9902L19.78 22.6102L21.19 21.1902Z"
          fill="currentColor"
        />
      </svg>
    </View>
  );
};
