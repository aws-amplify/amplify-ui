import React from 'react';

import {
  ButtonElement,
  ListItemElement,
  NavElement,
  OrderedListElement,
  SpanElement,
} from '../context/elements';

import { CLASS_BASE } from '../views/constants';
import { isFunction } from '@aws-amplify/ui';

export interface BreadcrumbProps {
  isCurrent?: boolean;
  name?: string;
  onNavigate?: () => void;
}

interface BreadcrumbNavigationProps {
  breadcrumbs: BreadcrumbProps[];
}

const Separator = () => {
  return (
    <SpanElement aria-hidden className={`${CLASS_BASE}__breadcrumb-separator`}>
      /
    </SpanElement>
  );
};

const Breadcrumb = ({ isCurrent, name, onNavigate }: BreadcrumbProps) => {
  const isNavigable = isFunction(onNavigate);
  return (
    <ListItemElement
      aria-current={isCurrent ? 'page' : undefined}
      className={`${CLASS_BASE}__breadcrumb-list-item`}
    >
      <>
        {!isCurrent && isNavigable ? (
          <ButtonElement
            className={`${CLASS_BASE}__breadcrumb-button`}
            onClick={onNavigate}
            variant="navigate"
          >
            {name}
          </ButtonElement>
        ) : (
          <SpanElement
            className={`${CLASS_BASE}__breadcrumb-text`}
            variant="navigate-text"
          >
            {name}
          </SpanElement>
        )}
        {!isCurrent ? <Separator /> : null}
      </>
    </ListItemElement>
  );
};

export const BreadcrumbNavigation = ({
  breadcrumbs,
}: BreadcrumbNavigationProps): React.JSX.Element => {
  return (
    <NavElement
      aria-label={'Breadcrumb'}
      className={`${CLASS_BASE}__breadcrumb`}
    >
      <OrderedListElement className={`${CLASS_BASE}__breadcrumb-list`}>
        {breadcrumbs.map(({ isCurrent, name, onNavigate }, index) => {
          return (
            <Breadcrumb
              key={`${index}-breadcrumb-${name}`}
              isCurrent={isCurrent}
              name={name}
              onNavigate={onNavigate}
            />
          );
        })}
      </OrderedListElement>
    </NavElement>
  );
};
