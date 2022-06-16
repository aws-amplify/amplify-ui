import { BaseStyleProps, FlexProps, View } from '@aws-amplify/ui-react';

interface BrowserMockProps extends FlexProps, BaseStyleProps {
  location?: string;
}

export const BrowserMock = ({ children, location, ...rest }) => (
  <View flex="1" className="docs-home-browser" {...rest}>
    {location ? (
      <View className="docs-home-browser__nav-bar">{location}</View>
    ) : null}
    <View className="docs-home-browser__page">{children}</View>
  </View>
);
