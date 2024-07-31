import { defineBaseElement } from '@aws-amplify/ui-react-core/elements';
import { IconElement } from './IconElement';

export interface FederatedIdentitiesElements {
  Button: typeof ButtonElement;
  ListItem: typeof ListItemElement;
  Icon: typeof IconElement;
  Group: typeof GroupElement;
}

type ButtonElementProps = 'onClick' | 'type';
export const ButtonElement = defineBaseElement<'button', ButtonElementProps>({
  type: 'button',
  displayName: 'Button',
});

export const GroupElement = defineBaseElement({
  type: 'div',
  displayName: 'UnorderedList',
});

export const ListItemElement = defineBaseElement({
  type: 'li',
  displayName: 'ListItem',
});

export const FederatedIdentitiesElements: FederatedIdentitiesElements = {
  Button: ButtonElement,
  Group: GroupElement,
  ListItem: ListItemElement,
  Icon: IconElement,
};
