import React from 'react';

import {
  ButtonElement,
  ListItemElement,
  NavElement,
  OrderedListElement,
  SpanElement,
} from '../context/elements';

import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../constants';
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
    <SpanElement
      aria-hidden
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__breadcrumb-separator`}
    >
      /
    </SpanElement>
  );
};

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
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__breadcrumb`}
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
};
