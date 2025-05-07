import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import {
  ButtonElement,
  ListItemElement,
  NavElement,
  OrderedListElement,
  SpanElement,
} from '../elements';

import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from './constants';
import { Separator } from './Separator';

export interface BreadcrumbProps {
  isCurrent?: boolean;
  name?: string;
  onNavigate?: () => void;
}

interface BreadcrumbNavigationProps {
  breadcrumbs: BreadcrumbProps[];
  role?: React.AriaRole;
}

export const Breadcrumb = ({
  isCurrent,
  name,
  onNavigate,
}: BreadcrumbProps): React.JSX.Element => {
  const isNavigable = isFunction(onNavigate);
  return (
    <ListItemElement
      aria-current={isCurrent ? 'page' : undefined}
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__breadcrumb-list-item`}
    >
      <>
        {!isCurrent && isNavigable ? (
          <ButtonElement
            className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__breadcrumb-button`}
            onClick={onNavigate}
            variant="navigate"
          >
            {name}
          </ButtonElement>
        ) : (
          <SpanElement
            className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__breadcrumb-text`}
            variant="navigation-text"
          >
            {name}
          </SpanElement>
        )}
        {!isCurrent ? <Separator /> : null}
      </>
    </ListItemElement>
  );
};

export function BreadcrumbNavigation({
  breadcrumbs,
  role = 'navigation',
}: BreadcrumbNavigationProps): React.JSX.Element {
  return (
    <NavElement
      aria-label={'Breadcrumb'}
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__breadcrumb`}
      role={role}
    >
      <OrderedListElement
        className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__breadcrumb-list`}
      >
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
}
