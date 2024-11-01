import { createEnhancedListHandler } from '../actions/createEnhancedHandler';

const mockAction = jest.fn();

describe('createEnhancedHandler', () => {
  it('should call action', async () => {
    const handler = createEnhancedListHandler(mockAction);
    mockAction.mockReturnValue({
      items: [],
      nextToken: undefined,
    });

    const result = await handler(
      {
        nextToken: undefined,
        items: [],
      },
      {
        config: {
          bucket: '',
          credentials: jest.fn(),
          region: '',
        },
        prefix: 'a_prefix',
      }
    );

    expect(mockAction).toHaveBeenCalled();
    expect(result).toEqual({
      items: [],
      nextToken: undefined,
    });
  });
});
