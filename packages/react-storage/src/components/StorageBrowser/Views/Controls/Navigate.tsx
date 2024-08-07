import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { useControl } from '../../context/controls';
import { StorageBrowserElements } from '../../context/elements';
import { parseLocationAccess } from '../../context/controls/Navigate/utils';

import { CLASS_BASE } from '../constants';
import type { OmitElements } from '../types';
import { LocationData } from '../../context/actions';

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
  children: '/',
});

const NavigateItemContainer = withBaseElementProps(ListItem, {
  className: `${BLOCK_NAME}__item`,
});

const NavigateButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__button`,
  variant: 'navigate',
});

export const NavigateItem = (props: NavigateItemProps): React.JSX.Element => (
  <NavigateItemContainer>
    <NavigateButton {...props} />
  </NavigateItemContainer>
);

NavigateItem.Button = NavigateButton;
NavigateItem.Separator = Separator;
NavigateItem.ListItem = ListItem;

const NavigateContainer: typeof Nav = React.forwardRef(function Container(
  { children, ...props },
  ref
) {
  return (
    <Nav
      {...props}
      aria-label={props['aria-label'] ?? 'Breadcrumbs'}
      className={props.className ?? BLOCK_NAME}
      ref={ref}
    >
      <OrderedList className={`${props.className ?? BLOCK_NAME}__list`}>
        {children}
      </OrderedList>
    </Nav>
  );
});

export const NavigateControl: NavigateControl = (_props) => {
  const [{ history, location }, handleUpdateState] = useControl({
    type: 'NAVIGATE',
  });

  const { bucket } = location
    ? parseLocationAccess(location)
    : ({} as LocationData);

  return (
    <NavigateContainer>
      <NavigateItem
        onClick={() => {
          handleUpdateState({ type: 'EXIT' });
        }}
      >
        {HOME_NAVIGATE_ITEM}
      </NavigateItem>
      {history?.map((entry, i) => {
        // if `entry` is the first index, concatenate the `bucket` and initial prefix
        const sanitizedEntry =
          i === 0 ? `${bucket}${entry ? `/${entry}` : ''}` : entry;

        const displayValue = !sanitizedEntry.endsWith('/')
          ? sanitizedEntry
          : sanitizedEntry.slice(0, -1);

        return (
          <React.Fragment key={entry}>
            <Separator />
            <NavigateItem
              onClick={() => {
                handleUpdateState({ type: 'NAVIGATE', prefix: entry });
              }}
            >
              {displayValue}
            </NavigateItem>
          </React.Fragment>
        );
      })}
    </NavigateContainer>
  );
};
