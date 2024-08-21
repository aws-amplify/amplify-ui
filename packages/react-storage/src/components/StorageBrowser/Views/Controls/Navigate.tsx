import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { useControl } from '../../context/controls';
import { StorageBrowserElements } from '../../context/elements';
import { parseLocationAccess } from '../../context/controls/Navigate/utils';

import { CLASS_BASE } from '../constants';
import type { OmitElements } from '../types';
import { LocationData, useAction } from '../../context/actions';

export interface _NavigateControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (props: { renderNavigateItem?: RenderNavigateItem }): React.JSX.Element;
  Container: T['Nav'];
  NavigateItem: NavigateItem<T>;
}

export interface NavigateControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_NavigateControl<T>, 'Container' | 'NavigateItem'> {
  (props: { renderNavigateItem?: RenderNavigateItem }): React.JSX.Element;
}

interface NavigateItemProps {
  children?: React.ReactNode;
  disabled?: boolean;
  isCurrent?: boolean;
  onClick?: () => void;
}

type RenderNavigateItem = (props: NavigateItemProps) => React.JSX.Element;

interface NavigateItem<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends RenderNavigateItem,
    Pick<T, 'Button' | 'ListItem'> {
  Separator: T['Span'];
}

const { Span, Button, Nav, OrderedList, ListItem } = StorageBrowserElements;
const BLOCK_NAME = `${CLASS_BASE}__navigate`;

const HOME_NAVIGATE_ITEM = 'Home';

const Separator = withBaseElementProps(Span, {
  className: `${BLOCK_NAME}__separator`,
  'aria-hidden': true,
  children: '/',
});

const NavigateItemContainer = withBaseElementProps(ListItem, {
  className: `${BLOCK_NAME}__item`,
});

const NavigateButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__button`,
  variant: 'navigate',
});

export const NavigateItem = (props: NavigateItemProps): React.JSX.Element => {
  const { isCurrent, ...rest } = props;
  return (
    <NavigateItemContainer>
      <NavigateButton {...rest} aria-current={isCurrent ? 'page' : undefined} />
      {isCurrent ? null : <Separator />}
    </NavigateItemContainer>
  );
};

NavigateItem.Button = NavigateButton;
NavigateItem.Separator = Separator;
NavigateItem.ListItem = ListItem;

const NavigateContainer: typeof Nav = function Container({
  children,
  className = BLOCK_NAME,
  ...props
}) {
  return (
    <Nav
      {...props}
      aria-label={props['aria-label'] ?? 'Breadcrumbs'}
      className={className}
    >
      <OrderedList className={`${className}__list`}>{children}</OrderedList>
    </Nav>
  );
};

export const NavigateControl: NavigateControl = (_props) => {
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
      >
        {HOME_NAVIGATE_ITEM}
      </NavigateItem>
      {history?.map((entry) => {
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

        return (
          <React.Fragment key={`${prefix}/${position}`}>
            <NavigateItem
              disabled={isLoading}
              onClick={() => {
                handleUpdateState({ type: 'NAVIGATE', entry });
              }}
              isCurrent={position === history.length - 1}
            >
              {displayValue}
            </NavigateItem>
          </React.Fragment>
        );
      })}
    </NavigateContainer>
  );
};
