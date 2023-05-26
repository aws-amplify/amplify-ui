import {
  MessageComponentBaseProps,
  MessageTextAlign,
} from '@aws-amplify/ui-react-core-notifications';
import { StyleParams } from '../types';

import { getPayloadStyle, getMessageStyles } from '../utils';

describe('getPayloadStyle', () => {
  it('returns the expected output in the happy path', () => {
    const output = getPayloadStyle({
      body: { style: { textAlign: 'left' as MessageTextAlign } },
      container: { style: { backgroundColor: 'lightgray', borderRadius: 2 } },
      header: { style: { textAlign: 'center' as MessageTextAlign } },
      primaryButton: { style: { backgroundColor: 'salmon', color: 'olive' } },
      secondaryButton: { style: { backgroundColor: 'sand', color: 'peru' } },
    } as MessageComponentBaseProps);

    expect(output).toMatchSnapshot();
  });
});

describe('getMessageStyles', () => {
  const payloadStyle: StyleParams['payloadStyle'] = {
    body: { textAlign: 'left' as MessageTextAlign },
    container: { backgroundColor: 'lightgray', borderRadius: 2 },
    header: { textAlign: 'center' as MessageTextAlign },
    primaryButton: { backgroundColor: 'salmon', color: 'olive' },
    secondaryButton: { backgroundColor: 'sand', color: 'peru' },
  };

  const overrideStyle = {
    body: { color: 'white' },
    closeIconButton: { backgroundColor: 'turquoise', color: 'darkcyan' },
    container: { backgroundColor: 'lawngreen', borderRadius: 3 },
    header: { backgroundColor: 'lightpink' },
    image: { backgroundColor: 'royalblue' },
    primaryButton: { backgroundColor: 'seagreen', color: 'black' },
    secondaryButton: { backgroundColor: 'sienna', color: 'orchid' },
  };

  it('returns the expected output in the happy path', () => {
    const output = getMessageStyles({
      styleParams: { payloadStyle, overrideStyle },
    });

    expect(output).toMatchSnapshot();
  });
});
