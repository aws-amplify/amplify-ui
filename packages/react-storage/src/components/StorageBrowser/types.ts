export interface PaginationControlProps {
  ariaLabel?: string;
  children: React.ReactNode;
  className?: string;
}

export interface BreadcrumbsProps {
  ariaLabel?: string;
  children: React.ReactNode;
  className?: string;
}

export interface ButtonElementProps {
  ariaLabel?: string;
  isDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  className?: string;
}

export interface ViewProps {
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  ariaHidden?: boolean;
}

export interface IconProps {
  ariaHidden?: boolean;
  className?: string;
  type?: 'refresh' | 'next' | 'previous';
}

export interface SearchControlProps {
  onSubmit?: () => void;
  children?: React.ReactNode;
}

export interface HeadingProps {
  children?: React.ReactNode;
  className?: string;
}

export interface InputProps {
  id?: string;
  className?: string;
}

export interface LabelProps {
  htmlFor?: string;
  className?: string;
  children?: React.ReactNode;
}
