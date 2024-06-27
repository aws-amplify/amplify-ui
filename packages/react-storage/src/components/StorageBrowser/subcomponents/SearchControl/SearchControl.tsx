import * as React from 'react';
import { SearchControlProps } from '../../types';
import { SubmitButton } from './SubmitButton';
import { Results } from './Results';
import { Field } from './Field';
// import { Item } from './Item';

const SearchControlPrimitive = <T extends SearchControlProps>({
  onSubmit,
  children,
  ...rest
}: T): JSX.Element => {
  return (
    <form {...rest} onSubmit={onSubmit} className={``}>
      {children}
    </form>
  );
};

const SearchControl = Object.assign(SearchControlPrimitive, {
  SubmitButton,
  Results,
  Field,
  // PreviousButton,
});

export { SearchControl };
