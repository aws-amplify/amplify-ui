import { createComponentClasses } from '@aws-amplify/ui-react/theme';

const clx = createComponentClasses({
  name: 'button',
});

export const LinkButton = ({ variation, children, ...rest }) => {
  return (
    <a
      className={clx({
        modifier: [variation],
      })}
      {...rest}
    >
      {children}
    </a>
  );
};
