import * as React from 'react';

type AccordionContextProps =
  | {
      value?: string[];
      setValue?: (value: string) => void;
    }
  | undefined;

export const AccordionContext =
  React.createContext<AccordionContextProps>(undefined);

type AccordionItemContextProps = string | undefined;

export const AccordionItemContext =
  React.createContext<AccordionItemContextProps>(undefined);
