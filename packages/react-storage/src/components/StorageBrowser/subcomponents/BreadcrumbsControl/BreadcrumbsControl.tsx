import * as React from 'react';
import { BreadcrumbsElementProps } from '@aws-amplify/ui-react/internal';
import { Breadcrumb } from './Breadcrumb';
import { Container } from './Container';
import { Item } from './Item';
import { List } from './List';
import { Separator } from './Separator';

const Breadcrumbs = <T extends BreadcrumbsElementProps>({
  ariaLabel,
  className,
  items,
  ...rest
}: T): JSX.Element => {
  return (
    <Container ariaLabel={ariaLabel} className={className} {...rest}>
      <List>
        {items?.map(({ ariaLabel, children, onClick }, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <Item key={`breadcrumb-${index}`}>
              <Breadcrumb
                isCurrent={isCurrent}
                ariaLabel={ariaLabel}
                onClick={onClick}
              >
                {children}
              </Breadcrumb>
              {isCurrent ? null : <Separator />}
            </Item>
          );
        })}
      </List>
    </Container>
  );
};

const BreadcrumbsControl = Object.assign(Breadcrumbs, {
  Breadcrumb,
  Container,
  Item,
  List,
  Separator,
});

export { BreadcrumbsControl };
