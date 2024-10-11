import React from 'react';

import { useControl } from '../../context/control';
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
import { parseLocationAccess } from '../../context/navigate/utils';

import { CLASS_BASE } from '../constants';

import { LocationData, useAction } from '../../context/actions';

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

export function NavigateControl(): React.JSX.Element {
  const [{ history, location }, handleUpdateState] = useControl('NAVIGATE');
  const [{ isLoading }, handleUpdateList] = useAction('LIST_LOCATION_ITEMS');
  const [, handleLocationActionsState] = useControl('LOCATION_ACTIONS');

  const { bucket } = location
    ? parseLocationAccess(location)
    : ({} as LocationData);

  return (
    <NavigateContainer>
      <NavigateItem
        onClick={() => {
          handleUpdateState({ type: 'EXIT' });
          handleUpdateList({ prefix: '', options: { reset: true } });
          handleLocationActionsState({ type: 'CLEAR' });
        }}
      >
        {HOME_NAVIGATE_ITEM}
      </NavigateItem>
      {history?.map((entry, index) => {
        const { position, prefix: _prefix } = entry;
        // remove trailing `/` from `prefix`
        const prefix = _prefix.endsWith('/') ? _prefix.slice(0, -1) : _prefix;

        // if `position` is the first index:
        // - concatenate `bucket` and `prefix`
        // - if `prefix` is truthy, insert `/` between `bucket` and `prefix`
        const displayValue =
          position === 0
            ? `${bucket}${prefix ? `/${prefix}` : prefix}`
            : prefix;

        const isCurrent = index === history.length - 1;
        return (
          <NavigateItem
            disabled={isLoading}
            key={`${prefix}/${position}`}
            onClick={() => {
              handleUpdateState({ type: 'NAVIGATE', entry });
              handleLocationActionsState({ type: 'CLEAR' });
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
