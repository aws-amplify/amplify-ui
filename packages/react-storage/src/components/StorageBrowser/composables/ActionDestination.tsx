import React from 'react';

import { STORAGE_BROWSER_BLOCK_TO_BE_UPDATED } from '../constants';
import {
  DescriptionListElement,
  DescriptionTermElement,
  DescriptionDetailsElement,
  SpanElement,
  ViewElement,
} from '../context/elements';
import { Separator } from '../components/Separator';
import { NavigationProps } from './Navigation';
import { BreadcrumbNavigation } from '../components/BreadcrumbNavigation';

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
    <ViewElement
      className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__action-destination`}
    >
      {isNavigable ? (
        <>
          <SpanElement>{`${label}:`}</SpanElement>
          <BreadcrumbNavigation breadcrumbs={items} role="complementary" />
        </>
      ) : (
        <DescriptionListElement
          className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__description-list`}
          role="list"
        >
          <DescriptionTermElement
            className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__description-term`}
            role="term"
          >
            {`${label}:`}
          </DescriptionTermElement>
          {items.map(({ name }, index) => {
            return (
              <React.Fragment key={`action-destination-item-${name}-${index}`}>
                <DescriptionDetailsElement
                  className={`${STORAGE_BROWSER_BLOCK_TO_BE_UPDATED}__description-details`}
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
