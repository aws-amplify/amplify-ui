import { refreshReducer } from '../Refresh';

describe('refreshReducer', () => {
  it('handles a START as expected', () => {
    const newState = refreshReducer({ isRefreshing: false }, { type: 'START' });

    expect(newState).toEqual({ isRefreshing: true });
  });
  it('handles a DONE as expected', () => {
    const newState = refreshReducer({ isRefreshing: true }, { type: 'DONE' });

    expect(newState).toEqual({ isRefreshing: false });
  });
});
