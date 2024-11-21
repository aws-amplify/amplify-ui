import { renderHook } from '@testing-library/react';
import * as controlsContextModule from '../../context';
import { ControlsContext } from '../../types';
import { useMessage } from '../useMessage';

const messageType = 'info';
const messageContent = 'Really saying something!';

describe('useMessage', () => {
  const controlsContext: ControlsContext = {
    data: {
      message: {
        type: messageType,
        content: messageContent,
      },
    },
  };

  const useControlsContextSpy = jest.spyOn(
    controlsContextModule,
    'useControlsContext'
  );

  afterEach(() => {
    useControlsContextSpy.mockClear();
  });

  it('provides the expected values to consumers', () => {
    useControlsContextSpy.mockReturnValue(controlsContext);
    const { result } = renderHook(() => useMessage());

    expect(result.current).toMatchObject({
      type: messageType,
      content: messageContent,
    });
  });
});
