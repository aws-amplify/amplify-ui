import { View } from '@aws-amplify/ui-react';

/**
 * Creates a keyboard friendly scollable overflow region.
 * Use case: Wrap a <Table> with overflowing content with this.
 */
export function OverflowGroup({ children }) {
  return (
    <View className="docs-overflow" role="group" tabindex="0">
      {children}
    </View>
  );
}
