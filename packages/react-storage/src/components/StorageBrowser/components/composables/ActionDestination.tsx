import React from 'react';

import { STORAGE_BROWSER_BLOCK } from '../base';
import {
  DescriptionListElement,
  DescriptionTermElement,
  DescriptionDetailsElement,
  SpanElement,
  ViewElement,
} from '../elements';
import { BreadcrumbNavigation, Separator } from '../base';
import type { NavigationProps } from './Navigation';

export interface ActionDestinationProps {
  isNavigable?: boolean;
  items: NavigationProps['items'];
  label?: string;
}

export const ActionDestination = ({
  isNavigable,
  items,
  label,
}: ActionDestinationProps): React.JSX.Element | null => {
  if (!items.length) {
    return null;
  }

  return (
    <ViewElement className={`${STORAGE_BROWSER_BLOCK}__destination`}>
      {isNavigable ? (
        <>
          <SpanElement>{`${label}:`}</SpanElement>
          <BreadcrumbNavigation breadcrumbs={items} role="complementary" />
        </>
      ) : (
        <DescriptionListElement
          className={`${STORAGE_BROWSER_BLOCK}__description-list`}
          role="list"
        >
          <DescriptionTermElement
            className={`${STORAGE_BROWSER_BLOCK}__description-term`}
            role="term"
          >
            {`${label}:`}
          </DescriptionTermElement>
          {items.map(({ name }, index) => {
            return (
              <React.Fragment key={`action-destination-item-${name}-${index}`}>
                <DescriptionDetailsElement
                  className={`${STORAGE_BROWSER_BLOCK}__description-details`}
                  role="definition"
                >
                  <SpanElement variant="destination-text">{name}</SpanElement>
                </DescriptionDetailsElement>
                {index === items.length - 1 ? null : <Separator />}
              </React.Fragment>
            );
          })}
        </DescriptionListElement>
      )}
    </ViewElement>
  );
};
