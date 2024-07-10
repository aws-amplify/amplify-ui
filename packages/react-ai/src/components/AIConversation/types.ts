import { defineBaseElement } from '@aws-amplify/ui-react/internal';

export const ViewElement = defineBaseElement({
  displayName: 'View',
  type: 'div',
});

export const ButtonElement = defineBaseElement({
  displayName: 'Button',
  type: 'button',
});

export const ParagraphElement = defineBaseElement({
  displayName: 'Paragraph',
  type: 'p',
});

export const IconElement = defineBaseElement({
  displayName: 'Icon',
  type: 'svg',
});

export const ImageElement = defineBaseElement({
  displayName: 'Image',
  type: 'img',
});

export interface ButtonElementProps
  extends React.AriaAttributes,
    React.RefAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit';
  variant?: 'search-submit' | 'toggle-menu';
}

export interface ViewElementProps
  extends React.AriaAttributes,
    React.RefAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export interface ParagraphElementProps
  extends React.AriaAttributes,
    React.RefAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  className?: string;
}

export interface ParagraphElementProps
  extends React.AriaAttributes,
    React.RefAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  className?: string;
}

export interface IconElementProps
  extends React.AriaAttributes,
    React.RefAttributes<HTMLOrSVGElement> {
  children?: React.ReactNode;
  className?: string;
}

export interface ImageElementProps
  extends React.AriaAttributes,
    React.RefAttributes<HTMLImageElement> {
  children?: React.ReactNode;
  className?: string;
}
