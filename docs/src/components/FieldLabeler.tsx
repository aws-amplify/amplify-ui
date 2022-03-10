import * as React from 'react';

export const FieldLabeler: React.FC<{
  alignItems?: string;
  direction?: string;
  gap?: string;
  id: string;
  labelPadding?: string;
  order?: string;
}> = ({
  alignItems = '',
  children,
  direction = 'flex-col',
  gap = 'gap-1',
  id,
  labelPadding = 'pr-2',
  order = 'order-first',
}) => (
  <div className={`flex ${gap} ${direction} ${alignItems}`}>
    <label className={`${labelPadding} ${order}`} htmlFor={id}>
      {id}
    </label>
    {children}
  </div>
);
