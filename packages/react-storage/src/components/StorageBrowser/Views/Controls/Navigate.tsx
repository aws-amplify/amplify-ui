import React from 'react';

import { useControl } from '../../context/controls';
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
import { parseLocationAccess } from '../../context/controls/Navigate/utils';

import { CLASS_BASE } from '../constants';

import { LocationData, useAction } from '../../context/actions';

interface NavigateItemProps extends ButtonElementProps {
  seperator?: React.ReactNode;
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
  seperator = null,
  ...props
}: NavigateItemProps): React.JSX.Element => {
  return (
    <ListItemElement className={`${BLOCK_NAME}__item`}>
      <ButtonElement {...props} className={className} variant="navigate">
        {children}
      </ButtonElement>
      {seperator}
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
  const [{ history, location }, handleUpdateState] = useControl({
    type: 'NAVIGATE',
  });
  const [{ isLoading }, handleUpdateList] = useAction({
    type: 'LIST_LOCATION_ITEMS',
  });

  const { bucket } = location
    ? parseLocationAccess(location)
    : ({} as LocationData);

  return (
    <NavigateContainer>
      <NavigateItem
        onClick={() => {
          handleUpdateState({ type: 'EXIT' });
          handleUpdateList({ prefix: '', options: { reset: true } });
        }}
        seperator={<Separator />}
      >
        {HOME_NAVIGATE_ITEM}
      </NavigateItem>
      {history?.map((entry, index) => {
        const { position, prefix: _prefix } = entry;
        // remove trailing `/` from `prefix`
        const prefix = _prefix.slice(0, -1);

        // if `position` is the first index:
        // - concatenate `bucket` and `prefix`
        // - if `prefix` is truthy, insert `/` between `bucket` and `prefix`
        const displayValue =
          position === 0
            ? `${bucket}${prefix ? `/${prefix}` : prefix}`
            : prefix;

        const isCurrent = index === history.length - 1;

        return isCurrent ? (
          <ListItemElement
            className={`${BLOCK_NAME}__item`}
            aria-current="page"
          >
            <SpanElement variant="navigate-current">{displayValue}</SpanElement>
          </ListItemElement>
        ) : (
          <NavigateItem
            aria-current={isCurrent ? 'page' : undefined}
            disabled={isLoading}
            key={`${prefix}/${position}`}
            onClick={() => {
              handleUpdateState({ type: 'NAVIGATE', entry });
            }}
            seperator={isCurrent ? null : <Separator />}
          >
            {displayValue}
          </NavigateItem>
        );
      })}
    </NavigateContainer>
  );
}
