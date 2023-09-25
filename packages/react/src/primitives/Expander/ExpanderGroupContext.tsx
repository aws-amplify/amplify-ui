import * as React from 'react';

type ExpanderGroupContextProps =
  | {
      value?: string[];
      setValue?: (value: string) => void;
    }
  | undefined;

export const ExpanderGroupContext =
  React.createContext<ExpanderGroupContextProps>(undefined);

// export const ExpanderGroupProvider = ({
//   children,
//   value,
//   setValue,
// }: ExpanderGroupContextProps & React.PropsWithChildren) => {
//   return (
//     <ExpanderGroupContext.Provider value={{
//       value,
//       setValue,
//     }}>
//       {children}
//     </ExpanderGroupContext.Provider>
//   )
// }
