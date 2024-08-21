import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { ComponentClassName } from '@aws-amplify/ui';

import { classNameModifier } from '../shared/utils';
import { ForwardRefPrimitive, Primitive } from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { View } from '../View';
import { IconUser, useIcons } from '../Icon';
import { Image } from '../Image';
import { AvatarProps, BaseAvatarProps } from './types';

const AvatarPrimitive: Primitive<AvatarProps, 'span'> = (
  { className, children, variation, colorTheme, size, src, alt, ...rest },
  ref
) => {
  const icons = useIcons('avatar');
  const icon = icons?.user ?? <IconUser />;
  const componentClasses = classNames(
    ComponentClassName.Avatar,
    className,
    classNameModifier(ComponentClassName.Avatar, variation),
    classNameModifier(ComponentClassName.Avatar, size),
    classNameModifier(ComponentClassName.Avatar, colorTheme)
  );

  return (
    <View as="span" className={componentClasses} ref={ref} {...rest}>
      {src ? (
        <Image className={ComponentClassName.AvatarImage} src={src} alt={alt} />
      ) : (
        children ?? (
          <View
            as="span"
            className={ComponentClassName.AvatarIcon}
            aria-hidden="true"
          >
            {icon}
          </View>
        )
      )}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/avatar)
 */
export const Avatar: ForwardRefPrimitive<BaseAvatarProps, 'span'> =
  primitiveWithForwardRef(AvatarPrimitive);

Avatar.displayName = 'Avatar';
