import { Button, View } from '@aws-amplify/ui-react';
import { useNavigateAction } from '@aws-amplify/ui-react/internal';

export const NavigateActions = () => {
  const goToAmazon = useNavigateAction({
    type: 'url',
    url: '/ui/hooks/actions?pageChange',
  });
  const reload = useNavigateAction({
    type: 'reload',
  });
  const goToHash = useNavigateAction({
    type: 'anchor',
    anchor: '#notes',
  });

  const handleHashClick = () => {
    console.log('Run handleHasClick');
    goToHash();
  };
  return (
    <View>
      <Button onClick={() => goToAmazon()}>Go to amazon.com</Button>
      <Button onClick={() => reload()}>Reload</Button>
      <Button onClick={() => handleHashClick()}>Go to #notes</Button>
      <View id="notes">notes</View>
    </View>
  );
};
