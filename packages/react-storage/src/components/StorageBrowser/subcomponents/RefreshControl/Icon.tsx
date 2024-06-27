import * as React from 'react';
import { IconProps } from '../../types';
// import { usePrimitive } from '@aws-amplify/ui-react';

export const Icon = <T extends IconProps>({
  ariaHidden = true,
  className,
  ...rest
}: T): JSX.Element => {
  // const Button = usePrimitive('Button');

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={className}
      aria-hidden={ariaHidden}
    >
      <path
        d="M12 21.0004C16.9706 21.0004 21 16.9709 21 12.0004H24C24 18.6278 18.6274 24.0004 12 24.0004C5.37258 24.0004 0 18.6278 0 12.0004C0 5.37295 5.37258 0.000371044 11.9873 0.000424673C15.4955 -0.0292413 18.7704 1.497 21 4.06355V0.000371044H24V9.00037H15V6.00037H18.7082C17.0452 4.10448 14.6122 2.97832 12 3.00037C7.02944 3.00037 3 7.02981 3 12.0004C3 16.9709 7.02944 21.0004 12 21.0004Z"
        fill="#000716"
      />
    </svg>
  );
};
