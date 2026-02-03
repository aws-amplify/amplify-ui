import { ACTION_SCENARIOS } from './scenarios';
import { DEFAULT_DELETE_VIEW_DISPLAY_TEXT } from '../deleteView';

describe('DeleteView display text values', () => {
  it('should match snapshot values', () => {
    expect(DEFAULT_DELETE_VIEW_DISPLAY_TEXT).toMatchSnapshot();
  });

  it.each(ACTION_SCENARIOS)(
    '`getActionCompleteMessage` returns the expected values in the %s scenario',
    (_, counts) => {
      const { getActionCompleteMessage } = DEFAULT_DELETE_VIEW_DISPLAY_TEXT;

      expect(getActionCompleteMessage({ counts })).toMatchSnapshot();
    }
  );

  describe('getActionCompleteMessage with tasks', () => {
    const { getActionCompleteMessage } = DEFAULT_DELETE_VIEW_DISPLAY_TEXT;

    it('handles no items to delete', () => {
      const result = getActionCompleteMessage({
        counts: {
          TOTAL: 0,
          COMPLETE: 0,
          FAILED: 0,
          CANCELED: 0,
          OVERWRITE_PREVENTED: 0,
          QUEUED: 0,
          PENDING: 0,
        },
      });
      expect(result).toEqual({ content: 'No items to delete.', type: 'info' });
    });

    it('handles mixed files and folders - all successful', () => {
      const tasks = [
        {
          data: { type: 'FOLDER', key: 'folder1', id: '1' },
          status: 'COMPLETE',
        },
        { data: { type: 'FILE', key: 'file1', id: '2' }, status: 'COMPLETE' },
      ] as any;
      const result = getActionCompleteMessage({
        counts: {
          COMPLETE: 2,
          TOTAL: 2,
          FAILED: 0,
          CANCELED: 0,
          OVERWRITE_PREVENTED: 0,
          QUEUED: 0,
          PENDING: 0,
        },
        tasks,
      });
      expect(result?.content).toContain(
        'All 1 folders and 1 files deleted successfully'
      );
      expect(result?.type).toBe('success');
    });

    it('handles folders only - partial failure', () => {
      const tasks = [
        {
          data: { type: 'FOLDER', key: 'folder1', id: '1' },
          status: 'COMPLETE',
        },
        { data: { type: 'FOLDER', key: 'folder2', id: '2' }, status: 'FAILED' },
      ] as any;
      const result = getActionCompleteMessage({
        counts: {
          COMPLETE: 1,
          TOTAL: 2,
          FAILED: 1,
          CANCELED: 0,
          OVERWRITE_PREVENTED: 0,
          QUEUED: 0,
          PENDING: 0,
        },
        tasks,
      });
      expect(result?.content).toContain('1 folder deleted, 1 folder failed');
      expect(result?.type).toBe('error');
    });

    it('handles folders only - no successful deletions', () => {
      const tasks = [
        { data: { type: 'FOLDER', key: 'folder1', id: '1' }, status: 'FAILED' },
        { data: { type: 'FOLDER', key: 'folder2', id: '2' }, status: 'FAILED' },
      ] as any;
      const result = getActionCompleteMessage({
        counts: {
          COMPLETE: 0,
          TOTAL: 2,
          FAILED: 2,
          CANCELED: 0,
          OVERWRITE_PREVENTED: 0,
          QUEUED: 0,
          PENDING: 0,
        },
        tasks,
      });
      expect(result?.content).toContain('Failed to delete 2 folders');
      expect(result?.type).toBe('error');
    });
  });
});
