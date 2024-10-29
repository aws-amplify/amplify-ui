import React from 'react';
import { isFunction } from '@aws-amplify/ui';

import {
  ButtonElement,
  ButtonElementProps,
  ListItemElement,
  NavElement,
  NavElementProps,
  OrderedListElement,
  SpanElement,
  StorageBrowserElements,
} from '../../context/elements';

import { CLASS_BASE } from '../constants';

import { useAction } from '../../do-not-import-from-here/actions';
import { useStore } from '../../providers/store';

interface NavigateItemProps extends ButtonElementProps {
  isCurrent?: boolean;
}

type RenderNavigateItem = (props: NavigateItemProps) => React.JSX.Element;

interface NavigateItem<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends RenderNavigateItem,
    Pick<T, 'Button' | 'ListItem'> {
  Separator: T['Span'];
}

const BLOCK_NAME = `${CLASS_BASE}__navigate`;

const HOME_NAVIGATE_ITEM = 'Home';

function Separator() {
  return (
    <SpanElement aria-hidden className={`${BLOCK_NAME}__separator`}>
      /
    </SpanElement>
  );
}

export const NavigateItem = ({
  className = `${BLOCK_NAME}__button`,
  children,
  isCurrent = false,
  ...props
}: NavigateItemProps): React.JSX.Element => {
  return (
    <ListItemElement
      aria-current={isCurrent ? 'page' : undefined}
      className={`${BLOCK_NAME}__item`}
    >
      {isCurrent ? (
        <SpanElement variant="navigate-current">{children}</SpanElement>
      ) : (
        <>
          <ButtonElement {...props} className={className} variant="navigate">
            {children}
          </ButtonElement>
          <Separator />
        </>
      )}
    </ListItemElement>
  );
};

function NavigateContainer({
  children,
  className = BLOCK_NAME,
  ...props
}: NavElementProps) {
  return (
    <NavElement
      {...props}
      aria-label={props['aria-label'] ?? 'Breadcrumbs'}
      className={className}
    >
      <OrderedListElement className={`${className}__list`}>
        {children}
      </OrderedListElement>
    </NavElement>
  );
}

export function NavigateControl({
  onExit,
}: {
  onExit?: () => void;
}): React.JSX.Element {
  const [{ history }, dispatchStoreAction] = useStore();
  const { current, previous } = history;

  const [{ isLoading }, handleList] = useAction('LIST_LOCATION_ITEMS');

  return (
    <NavigateContainer>
      <NavigateItem
        onClick={() => {
          if (isFunction(onExit)) onExit();
          dispatchStoreAction({ type: 'RESET_HISTORY' });

          handleList({
            // @todo: prefix should not be required to refresh
            prefix: current?.prefix ?? '',
            options: { reset: true },
          });
          dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
          dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
        }}
      >
        {HOME_NAVIGATE_ITEM}
      </NavigateItem>
      {previous?.map((destination, index) => {
        const { bucket, id, prefix: _prefix } = destination;
        // remove trailing `/` from `prefix`
        const prefix = _prefix?.endsWith('/') ? _prefix.slice(0, -1) : _prefix;

        // if `position` is the first index:
        // - concatenate `bucket` and `prefix`
        // - if `prefix` is truthy, insert `/` between `bucket` and `prefix`
        const displayValue =
          index === 0 ? `${bucket}${prefix ? `/${prefix}` : prefix}` : prefix;

        const isCurrent = index === previous.length - 1;
        return (
          <NavigateItem
            disabled={isLoading}
            key={id}
            onClick={() => {
              dispatchStoreAction({ type: 'RESET_ACTION_TYPE' });
              dispatchStoreAction({ type: 'RESET_LOCATION_ITEMS' });
              dispatchStoreAction({ type: 'NAVIGATE', destination });
            }}
            isCurrent={isCurrent}
          >
            {displayValue}
          </NavigateItem>
        );
      })}
    </NavigateContainer>
  );
}
