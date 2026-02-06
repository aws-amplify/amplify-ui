import { DELETE_TABLE_RESOLVERS } from '../deleteResolvers';

describe('DELETE_TABLE_RESOLVERS', () => {
  const mockDisplayText = {
    title: 'Delete',
    actionStartLabel: 'Delete',
  };

  const mockProps = {
    displayText: mockDisplayText,
    isProcessing: false,
  };

  const mockItem = {
    data: {
      id: 'ID',
      key: 'test-file.txt',
      fileKey: 'test-file.txt',
      type: 'FILE' as const,
      size: 1000,
      lastModified: new Date('2023-01-01'),
    },
    status: 'QUEUED' as const,
    message: 'test-message',
    progress: undefined,
  };

  const mockFolderItem = {
    data: {
      id: 'FOLDER_ID',
      key: 'documents/',
      type: 'FOLDER' as const,
      totalCount: 5,
    },
    status: 'QUEUED' as const,
    successCount: 0,
  };

  describe('getCell', () => {
    it('returns the expected cell key for a "name" table key', () => {
      const output = DELETE_TABLE_RESOLVERS.getCell({
        key: 'name',
        item: mockItem,
        props: mockProps,
      });

      expect(output.key).toBe('name-ID');
    });

    it('returns the expected cell key for a "status" table key', () => {
      const output = DELETE_TABLE_RESOLVERS.getCell({
        key: 'status',
        item: mockItem,
        props: mockProps,
      });

      expect(output.key).toBe('status-ID');
    });

    it('returns the expected cell key for a "cancel" table key', () => {
      const output = DELETE_TABLE_RESOLVERS.getCell({
        key: 'cancel',
        item: mockItem,
        props: mockProps,
      });

      expect(output.key).toBe('cancel-ID');
    });

    it('handles folder type items', () => {
      const folderItem = {
        ...mockItem,
        data: {
          ...mockItem.data,
          type: 'FOLDER' as const,
        },
      };

      const output = DELETE_TABLE_RESOLVERS.getCell({
        key: 'name',
        item: folderItem,
        props: mockProps,
      });

      expect(output.key).toBe('name-ID');
    });

    it('handles items with progress', () => {
      const itemWithProgress = {
        ...mockItem,
        progress: 50,
      };

      const output = DELETE_TABLE_RESOLVERS.getCell({
        key: 'status',
        item: itemWithProgress,
        props: mockProps,
      });

      expect(output.key).toBe('status-ID');
    });

    it('handles processing state', () => {
      const processingProps = {
        ...mockProps,
        isProcessing: true,
      };

      const output = DELETE_TABLE_RESOLVERS.getCell({
        key: 'cancel',
        item: mockItem,
        props: processingProps,
      });

      expect(output.key).toBe('cancel-ID');
    });

    describe('progress cell resolver', () => {
      it('shows "Deleted" for completed files', () => {
        const completedFile = {
          ...mockItem,
          status: 'COMPLETE' as const,
        };

        const output = DELETE_TABLE_RESOLVERS.getCell({
          key: 'progress',
          item: completedFile,
          props: mockProps,
        });

        expect(output).toEqual({
          key: 'progress-ID',
          type: 'text',
          content: { text: 'Deleted' },
        });
      });

      it('shows "-" for non-completed files', () => {
        const output = DELETE_TABLE_RESOLVERS.getCell({
          key: 'progress',
          item: mockItem,
          props: mockProps,
        });

        expect(output).toEqual({
          key: 'progress-ID',
          type: 'text',
          content: { text: '-' },
        });
      });

      it('shows progress for pending folders with valid count', () => {
        const pendingFolder = {
          ...mockFolderItem,
          status: 'PENDING' as const,
          successCount: 2,
        };

        const output = DELETE_TABLE_RESOLVERS.getCell({
          key: 'progress',
          item: pendingFolder,
          props: mockProps,
        });

        expect(output).toEqual({
          key: 'progress-FOLDER_ID',
          type: 'text',
          content: { text: '2/5 files' },
        });
      });

      it('shows progress with "?" for pending folders with null count', () => {
        const pendingFolderWithNullCount = {
          ...mockFolderItem,
          data: { ...mockFolderItem.data, totalCount: null },
          status: 'PENDING' as const,
          successCount: 3,
        };

        const output = DELETE_TABLE_RESOLVERS.getCell({
          key: 'progress',
          item: pendingFolderWithNullCount,
          props: mockProps,
        });

        expect(output).toEqual({
          key: 'progress-FOLDER_ID',
          type: 'text',
          content: { text: '3/? files' },
        });
      });

      it('shows completed count for folders with valid total', () => {
        const completedFolder = {
          ...mockFolderItem,
          status: 'COMPLETE' as const,
        };

        const output = DELETE_TABLE_RESOLVERS.getCell({
          key: 'progress',
          item: completedFolder,
          props: mockProps,
        });

        expect(output).toEqual({
          key: 'progress-FOLDER_ID',
          type: 'text',
          content: { text: '5 files deleted' },
        });
      });

      it('shows actual deleted count for completed folders with null total', () => {
        const completedFolderWithNullCount = {
          ...mockFolderItem,
          data: { ...mockFolderItem.data, totalCount: null },
          status: 'COMPLETE' as const,
          successCount: 4,
        };

        const output = DELETE_TABLE_RESOLVERS.getCell({
          key: 'progress',
          item: completedFolderWithNullCount,
          props: mockProps,
        });

        expect(output).toEqual({
          key: 'progress-FOLDER_ID',
          type: 'text',
          content: { text: '4 files deleted' },
        });
      });

      it('shows "Count failed" for queued folders with null count', () => {
        const queuedFolderWithNullCount = {
          ...mockFolderItem,
          data: { ...mockFolderItem.data, totalCount: null },
          status: 'QUEUED' as const,
        };

        const output = DELETE_TABLE_RESOLVERS.getCell({
          key: 'progress',
          item: queuedFolderWithNullCount,
          props: mockProps,
        });

        expect(output).toEqual({
          key: 'progress-FOLDER_ID',
          type: 'text',
          content: { text: 'Count failed' },
        });
      });

      it('shows "Calculating..." for folders with undefined count', () => {
        const folderWithUndefinedCount = {
          ...mockFolderItem,
          data: { ...mockFolderItem.data, totalCount: undefined },
        };

        const output = DELETE_TABLE_RESOLVERS.getCell({
          key: 'progress',
          item: folderWithUndefinedCount,
          props: mockProps,
        });

        expect(output).toEqual({
          key: 'progress-FOLDER_ID',
          type: 'text',
          content: { text: 'Calculating...' },
        });
      });
    });

    describe('text cell resolvers', () => {
      it('returns the expected cell values when key is "name" for an item with "QUEUED" status', () => {
        const output = DELETE_TABLE_RESOLVERS.getCell({
          key: 'name',
          item: mockItem,
          props: mockProps,
        });

        expect(output).toEqual({
          key: 'name-ID',
          type: 'text',
          content: { icon: 'action-queued', text: 'test-file.txt' },
        });
      });

      it('returns the expected cell values when key is "name" for a folder item', () => {
        const folderItem = {
          ...mockItem,
          data: {
            ...mockItem.data,
            type: 'FOLDER' as const,
            key: 'documents/',
          },
        };

        const output = DELETE_TABLE_RESOLVERS.getCell({
          key: 'name',
          item: folderItem,
          props: mockProps,
        });

        expect(output).toEqual({
          key: 'name-ID',
          type: 'text',
          content: { icon: 'action-queued', text: 'documents/' },
        });
      });

      it('returns the expected cell values when key is "status" for an item with "QUEUED" status', () => {
        const output = DELETE_TABLE_RESOLVERS.getCell({
          key: 'status',
          item: mockItem,
          props: mockProps,
        });

        expect(output).toEqual({
          key: 'status-ID',
          type: 'text',
          content: { text: undefined },
        });
      });
    });

    describe('button cell resolvers', () => {
      describe('cancel cell', () => {
        it('returns the expected cell values for an item with "QUEUED" status when isProcessing is true', () => {
          const output = DELETE_TABLE_RESOLVERS.getCell({
            key: 'cancel',
            item: mockItem,
            props: { ...mockProps, isProcessing: true },
          });

          expect(output).toEqual({
            key: 'cancel-ID',
            type: 'button',
            content: {
              ariaLabel: 'Cancel item: test-file.txt',
              icon: 'cancel',
              isDisabled: true,
              onClick: undefined,
            },
          });
        });

        it('returns the expected cell values for an item with "COMPLETE" status', () => {
          const completedItem = { ...mockItem, status: 'COMPLETE' as const };
          const output = DELETE_TABLE_RESOLVERS.getCell({
            key: 'cancel',
            item: completedItem,
            props: mockProps,
          });

          expect(output).toEqual({
            key: 'cancel-ID',
            type: 'button',
            content: {
              ariaLabel: 'Cancel item: test-file.txt',
              icon: 'cancel',
              isDisabled: true,
              onClick: undefined,
            },
          });
        });
      });
    });
  });

  describe('getHeader', () => {
    it('returns the expected header data for a name column', () => {
      const output = DELETE_TABLE_RESOLVERS.getHeader({
        key: 'name',
        props: mockProps,
      });

      expect(output).toEqual({
        key: 'name',
        type: 'sort',
        content: { label: undefined },
      });
    });

    it('returns the expected header data for a status column', () => {
      const output = DELETE_TABLE_RESOLVERS.getHeader({
        key: 'status',
        props: mockProps,
      });

      expect(output).toEqual({
        key: 'status',
        type: 'sort',
        content: { label: undefined },
      });
    });

    it('returns the expected header data for a cancel column', () => {
      const output = DELETE_TABLE_RESOLVERS.getHeader({
        key: 'cancel',
        props: mockProps,
      });

      expect(output).toEqual({
        key: 'cancel',
        type: 'text',
        content: { text: undefined },
      });
    });
  });

  describe('getRowKey', () => {
    it('resolves a row key as expected', () => {
      const output = DELETE_TABLE_RESOLVERS.getRowKey({
        item: mockItem,
        props: mockProps,
      });

      expect(output).toBe('ID');
    });
  });
});
