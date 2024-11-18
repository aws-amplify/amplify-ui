import React from 'react';

import { STORAGE_BROWSER_BLOCK } from '../constants';
import {
  DescriptionListElement,
  DescriptionTermElement,
  DescriptionDetailsElement,
  SpanElement,
  ViewElement,
} from '../context/elements';
import { Separator } from '../components/Separator';
import { Navigation, NavigationProps } from './Navigation';
import { useResolvedComposable } from '../controls/hooks/useResolvedComposable';

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
  const Resolved = useResolvedComposable(Navigation, 'Navigation');

  if (!items.length) {
    return null;
  }

  return (
    <ViewElement className={`${STORAGE_BROWSER_BLOCK}__destination`}>
      {isNavigable ? (
        <>
          <SpanElement>{`${label}:`}</SpanElement>
          <Resolved items={items} />
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
