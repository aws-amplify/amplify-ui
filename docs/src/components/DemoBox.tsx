import {
  Button,
  IconKeyboardArrowDown,
  IconKeyboardArrowUp,
} from '@aws-amplify/ui-react';
import classNames from 'classnames';
import React from 'react';

interface DemoBoxProps {
  primitiveName: string;
  startCollapsed?: boolean;
}

export const DemoBox: React.FC<DemoBoxProps> = ({
  primitiveName,
  children,
  startCollapsed = true,
}) => {
  const [collapsed, setCollapsed] = React.useState(startCollapsed);

  return (
    <fieldset>
      <legend className="font-bold p-1 w-full text-left">
        <Button
          onClick={() => setCollapsed(!collapsed)}
          variation="link"
          isFullWidth={true}
          style={{ textAlign: 'left' }}
        >
          {collapsed ? (
            <>
              <IconKeyboardArrowDown
                style={{ width: '2rem', height: '2rem' }}
              />
              Show {primitiveName} props
            </>
          ) : (
            <>
              <IconKeyboardArrowUp style={{ width: '2rem', height: '2rem' }} />
              {primitiveName} props
            </>
          )}
        </Button>
      </legend>
      <div
        className={classNames(
          'grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5 flex-wrap my-2',
          { hidden: collapsed }
        )}
      >
        {children}
      </div>
    </fieldset>
  );
};
