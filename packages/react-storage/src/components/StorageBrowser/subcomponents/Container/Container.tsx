import * as React from 'react';
import { SectionElementProps } from '@aws-amplify/ui-react/internal';
import { useElement } from '../../context/elements';

export const Container = <T extends SectionElementProps>({
  ariaLabel,
  className,
  children,
  ...rest
}: T): JSX.Element => {
  const Section = useElement('Section');
  return (
    <Section {...rest} className={``} tabIndex={-1} aria-label={ariaLabel}>
      {children}
    </Section>
  );
};
