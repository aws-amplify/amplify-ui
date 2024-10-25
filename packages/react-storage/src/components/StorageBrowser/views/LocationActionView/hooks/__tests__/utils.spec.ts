import {
  getActionIconVariant,
  getActionViewTaskStatuses,
  getFileTypeDisplayValue,
  getFilenameWithoutPrefix,
} from '../utils';

describe('Utils', () => {
  describe('getActionIconVariant', () => {
    it('should return correct icon variant for each status', () => {
      expect(getActionIconVariant('QUEUED')).toBe('action-queued');
      expect(getActionIconVariant('PENDING')).toBe('action-progress');
      expect(getActionIconVariant('COMPLETE')).toBe('action-success');
      expect(getActionIconVariant('FAILED')).toBe('action-error');
      expect(getActionIconVariant('CANCELED')).toBe('action-canceled');
    });
  });

  describe('getActionViewTaskStatuses', () => {
    it('should return correct statuses when no tasks have started', () => {
      const counts = {
        INITIAL: 0,
        QUEUED: 5,
        PENDING: 0,
        FAILED: 0,
        COMPLETE: 0,
        CANCELED: 0,
        TOTAL: 5,
      };
      const result = getActionViewTaskStatuses(counts);
      expect(result).toEqual({
        hasStarted: false,
        taskCounts: counts,
        disableCancel: true,
        disableClose: false,
        disablePrimary: false,
      });
    });

    it('should return correct statuses when some tasks have started', () => {
      const counts = {
        INITIAL: 0,
        QUEUED: 3,
        PENDING: 2,
        FAILED: 0,
        COMPLETE: 0,
        CANCELED: 0,
        TOTAL: 5,
      };
      const result = getActionViewTaskStatuses(counts);
      expect(result).toEqual({
        hasStarted: true,
        taskCounts: counts,
        disableCancel: false,
        disableClose: true,
        disablePrimary: true,
      });
    });

    it('should return correct statuses when all tasks have completed', () => {
      const counts = {
        INITIAL: 0,
        QUEUED: 0,
        PENDING: 0,
        FAILED: 1,
        COMPLETE: 3,
        CANCELED: 1,
        TOTAL: 5,
      };
      const result = getActionViewTaskStatuses(counts);
      expect(result).toEqual({
        hasStarted: true,
        taskCounts: counts,
        disableCancel: true,
        disableClose: false,
        disablePrimary: true,
      });
    });
  });

  describe('getFileTypeDisplayValue', () => {
    it('should return the file extension', () => {
      expect(getFileTypeDisplayValue('document.pdf')).toBe('pdf');
      expect(getFileTypeDisplayValue('image.jpg')).toBe('jpg');
      expect(getFileTypeDisplayValue('script.ts')).toBe('ts');
    });

    it('should return an empty string for files without extension', () => {
      expect(getFileTypeDisplayValue('README')).toBe('');
    });
  });

  describe('getFilenameWithoutPrefix', () => {
    it('should return the filename without the path', () => {
      expect(getFilenameWithoutPrefix('/path/to/file.txt')).toBe('file.txt');
      expect(getFilenameWithoutPrefix('document.pdf')).toBe('document.pdf');
    });

    it('should handle paths with multiple slashes', () => {
      expect(getFilenameWithoutPrefix('/path//to///file.txt')).toBe('file.txt');
    });
  });
});
