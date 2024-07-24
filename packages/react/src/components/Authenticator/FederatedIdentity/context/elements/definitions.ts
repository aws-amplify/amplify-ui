import { defineBaseElement } from '@aws-amplify/ui-react-core/elements';

export interface FederatedIdentityElements {
  Button: typeof ButtonElement;
  List: typeof ListElement;
  ListItem: typeof ListItemElement;
  Icon: typeof IconElement;
}

type ButtonElementProps = 'onClick' | 'type';
export const ButtonElement = defineBaseElement<'button', ButtonElementProps>({
  type: 'button',
  displayName: 'Button',
});

export const ListElement = defineBaseElement({
  type: 'ul',
  displayName: 'UnorderedList',
});

export const ListItemElement = defineBaseElement({
  type: 'li',
  displayName: 'ListItem',
});

export const IconElement = defineBaseElement<'svg', never>({
  type: 'svg',
  displayName: 'Icon',
});

export const FederatedIdentityElements: FederatedIdentityElements = {
  Button: ButtonElement,
  List: ListElement,
  ListItem: ListItemElement,
  Icon: IconElement,
};
