import { Button } from '@aws-amplify/ui-react';
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
    <div>
      <Button testId="locationChange" onClick={() => goToAmazon()}>
        Go to amazon.com
      </Button>
      <Button testId="reload" onClick={() => reload()}>
        Reload
      </Button>
      <Button testId="hash" onClick={() => handleHashClick()}>
        Go to #notes
      </Button>
      <div id="notes">notes</div>
    </div>
  );
};
