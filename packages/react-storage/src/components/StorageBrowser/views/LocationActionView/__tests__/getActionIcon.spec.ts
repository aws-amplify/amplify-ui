import { getActionIcon } from '../getActionIcon';

describe('getActionIcon', () => {
  it('should return correct icon variant for each status', () => {
    expect(getActionIcon('QUEUED')).toBe('action-queued');
    expect(getActionIcon('PENDING')).toBe('action-progress');
    expect(getActionIcon('COMPLETE')).toBe('action-success');
    expect(getActionIcon('FAILED')).toBe('action-error');
    expect(getActionIcon('CANCELED')).toBe('action-canceled');
  });
});
