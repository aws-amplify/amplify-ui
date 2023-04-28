import { Overlay, View, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export const Box = ({}) => {
  return (
    <View padding="small medium" backgroundColor="white">
      <Text>Message text.</Text>
    </View>
  );
};

export default function App() {
  return (
    <div>
      Test.
      <Overlay origin={{ horizontal: 'end', vertical: 'end' }}>
        <Box />
        <Box />
      </Overlay>
    </div>
  );
}
