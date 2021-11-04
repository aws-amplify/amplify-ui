import classNames from 'classnames';
import { Item, Header, Trigger, Content } from '@radix-ui/react-accordion';

import { IconExpandMore } from '../Icon';
import { View } from '../View';
import { Primitive } from '../types/view';
import { ExpanderItemProps } from '../types/expander';
import { ComponentClassNames } from '../shared/constants';
import { splitPrimitiveProps } from '../shared/styleUtils';
import { useStableId } from '../shared/utils';

export const EXPANDER_ITEM = 'expander-item';
export const EXPANDER_HEADER = 'expander-header';
export const EXPANDER_ICON = 'expander-icon';
// export const EXPANDER_CONTENT = 'expander-content';
export const EXPANDER_CONTENT_TEXT = 'expander-content-text';

export const ExpanderItem: Primitive<ExpanderItemProps, typeof Item> = ({
  children,
  className,
  title,
  ..._rest
}) => {
  const triggerId = useStableId();
  const contentId = useStableId();
  const { rest } = splitPrimitiveProps(_rest);
  return (
    <Item
      className={classNames(ComponentClassNames.ExpanderItem, className)}
      data-testid={EXPANDER_ITEM}
      {...rest}
    >
      <Header
        className={ComponentClassNames.ExpanderHeader}
        data-testid={EXPANDER_HEADER}
      >
        <Trigger
          aria-controls={contentId}
          className={ComponentClassNames.ExpanderTrigger}
          id={triggerId}
        >
          {title}
          <IconExpandMore
            aria-hidden
            className={ComponentClassNames.ExpanderIcon}
            data-testid={EXPANDER_ICON}
            size="large"
          />
        </Trigger>
      </Header>
      <Content
        aria-labelledby={triggerId}
        className={ComponentClassNames.ExpanderContent}
        id={contentId}
      >
        <View
          className={ComponentClassNames.ExpanderContentText}
          testId={EXPANDER_CONTENT_TEXT}
        >
          {children}
        </View>
      </Content>
    </Item>
  );
};
