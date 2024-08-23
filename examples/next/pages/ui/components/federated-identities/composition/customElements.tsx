import { forwardRef } from 'react';

export const customGroup = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function Group({ children, className, ...props }, ref) {
  return (
    <div className="group" {...props} ref={ref}>
      {children}
    </div>
  );
});

export const customListItem = forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement>
>(function ListItem({ children, className, ...props }, ref) {
  return (
    <li className="list-item" {...props} ref={ref}>
      {children}
    </li>
  );
});

export const customButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(function Button({ children, className, ...props }, ref) {
  return (
    <button className="button" {...props} ref={ref}>
      {children}
    </button>
  );
});

export const customIcon = forwardRef<
  SVGSVGElement,
  React.SVGProps<SVGSVGElement>
>(function Svg({ children, className, ...props }, ref) {
  return (
    <svg className="icon" {...props} ref={ref}>
      {children}
    </svg>
  );
});

export const customText = forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(function Text({ children, className, ...props }, ref) {
  return (
    <span className="text" {...props} ref={ref}>
      {children}
    </span>
  );
});
