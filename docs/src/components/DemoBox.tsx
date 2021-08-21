import React from 'react';

interface DemoBoxProps {
  primitiveName: string;
}

export const DemoBox: React.FC<DemoBoxProps> = ({
  primitiveName,
  children,
}) => {
  return (
    <fieldset className="p-4 border-2 border-current border-solid">
      <legend className="font-bold p-1">{primitiveName} props:</legend>
      <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 flex-wrap my-2">
        {children}
      </div>
    </fieldset>
  );
};
