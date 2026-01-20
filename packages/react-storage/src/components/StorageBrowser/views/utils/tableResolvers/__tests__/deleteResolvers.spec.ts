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

  describe('getCell', () => {
    it('returns the expected cell key for a "name" table key', () => {
      const output = DELETE_TABLE_RESOLVERS.getCell({
        key: 'name',
        item: mockItem,
        props: mockProps,
      });

      expect(output.key).toBe('name');
    });

    it('returns the expected cell key for a "status" table key', () => {
      const output = DELETE_TABLE_RESOLVERS.getCell({
        key: 'status',
        item: mockItem,
        props: mockProps,
      });

      expect(output.key).toBe('status');
    });

    it('returns the expected cell key for a "cancel" table key', () => {
      const output = DELETE_TABLE_RESOLVERS.getCell({
        key: 'cancel',
        item: mockItem,
        props: mockProps,
      });

      expect(output.key).toBe('cancel');
    });

    describe('text cell resolvers', () => {
      it('returns the expected cell values when key is "name" for an item with "QUEUED" status', () => {
        const output = DELETE_TABLE_RESOLVERS.getCell({
          key: 'name',
          item: mockItem,
          props: mockProps,
        });

        expect(output).toEqual({
          key: 'name',
          type: 'text',
          content: { text: 'test-file.txt' },
        });
      });

      it('returns the expected cell values when key is "status" for an item with "QUEUED" status', () => {
        const output = DELETE_TABLE_RESOLVERS.getCell({
          key: 'status',
          item: mockItem,
          props: mockProps,
        });

        expect(output).toEqual({
          key: 'status',
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
            key: 'cancel',
            type: 'button',
            content: {
              ariaLabel: 'Cancel item:  cancel',
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
            key: 'cancel',
            type: 'button',
            content: {
              ariaLabel: 'Cancel item:  cancel',
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
