import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import type { OmitElements } from '../types';
import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';
import { useControl } from '../../context/controls';
import { isFolderName } from '../../context/actions/types';

const { Span, Button, Nav, OrderedList, ListItem } = StorageBrowserElements;
const BLOCK_NAME = `${CLASS_BASE}__navigate`;

const HOME_NAVIGATE_ITEM = 'Home';

/* <Separator /> */

const Separator = withBaseElementProps(Span, {
  className: `${BLOCK_NAME}__separator`,
  children: '/',
});

type RenderNavigateItemProps = {
  item: string;
  current?: boolean;
  onClick?: () => void;
};

/* <NavigateItem /> */
type RenderNavigateItem = (props: RenderNavigateItemProps) => React.JSX.Element;

interface NavigateItem<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends RenderNavigateItem,
    Pick<T, 'Button' | 'ListItem'> {
  Separator: T['Span'];
}

const NavigateItemContainer = withBaseElementProps(ListItem, {
  className: `${BLOCK_NAME}__item`,
});

const NavigateButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__button`,
});

const NavigateItem: NavigateItem = ({ item: name, current, onClick }) => {
  return (
    <NavigateItemContainer>
      <NavigateButton onClick={onClick}>{name}</NavigateButton>
      {current ? null : <Separator />}
    </NavigateItemContainer>
  );
};

NavigateItem.Button = NavigateButton;
NavigateItem.Separator = Separator;
NavigateItem.ListItem = ListItem;

/* <NavigateContainer /> */
const NavigateContainer: typeof Nav = React.forwardRef(function Container(
  { children, ...props },
  ref
) {
  return (
    <Nav
      {...props}
      aria-label={props['aria-label'] ?? 'Breadcrumbs'}
      className={props.className ?? `${BLOCK_NAME}__container`}
      ref={ref}
    >
      <OrderedList className={`${props.className ?? BLOCK_NAME}__list`}>
        {children}
      </OrderedList>
    </Nav>
  );
});

/* <NavigateControl /> */
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

export const NavigateControl: NavigateControl = (_props) => {
  const [state, handleUpdateState] = useControl({ type: 'NAVIGATE' });

  return (
    <NavigateContainer>
      <NavigateItem
        item={HOME_NAVIGATE_ITEM}
        current={!state.location}
        onClick={() => handleUpdateState({ type: 'DESELECT_LOCATION' })}
      />
      {state.location && (
        <>
          <NavigateItem
            item={state.location.bucket}
            current={!state.history || state.history.length === 0}
            onClick={() => {
              if (state.location) {
                handleUpdateState({
                  type: 'SELECT_LOCATION',
                  location: state.location,
                });
              }
            }}
          />
          {state.history?.map((folder, index) => (
            <NavigateItem
              key={index}
              item={folder}
              current={folder === state.history?.[state.history.length - 1]}
              onClick={() => {
                if (isFolderName(folder)) {
                  handleUpdateState({
                    type: 'EXIT_FOLDER',
                    name: folder,
                  });
                }
              }}
            />
          ))}
        </>
      )}
    </NavigateContainer>
  );
};
