import * as React from 'react';
import { InputElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const Input = <T extends InputElementProps>({
  id,
  type = 'text',
  className,
  value,
  ...rest
}: T): JSX.Element => {
  const Input = useElement('Input');
  const [checked, setChecked] = React.useState(false);

  return (
    <Input
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setChecked(e.target.checked)
      }
      value={value}
      checked={checked}
      className={className}
      type={type}
      id={id}
      {...rest}
    />
  );
};
