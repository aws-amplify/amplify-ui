import { capitalize } from '@aws-amplify/ui';
import { CopyViewDisplayText } from '../../../../displayText';

import { MOCK_COPY_TASKS } from '../__testUtils__/tasks';
import { STATUS_ICONS, STATUS_LABELS } from '../constants';
import { CopyActionTask, CopyTableResolverProps } from '../types';
import { COPY_TABLE_KEYS, COPY_TABLE_RESOLVERS } from '../copyResolvers';

const mockDisplayText: CopyViewDisplayText = {
  tableColumnNameHeader: 'Name',
  tableColumnFolderHeader: 'Folder',
  tableColumnTypeHeader: 'Type',
  tableColumnSizeHeader: 'Size',
  tableColumnStatusHeader: 'Status',
  tableColumnProgressHeader: 'Progress',
  tableColumnCancelHeader: 'Cancel',
};

const mockItems = Object.values(MOCK_COPY_TASKS);

const mockProps: CopyTableResolverProps = {
  displayText: mockDisplayText,
  isProcessing: true,
  onTaskRemove: jest.fn(),
};

describe('COPY_TABLE_RESOLVERS', () => {
  beforeEach(jest.clearAllMocks);

  describe('getCell', () => {
    it.each(COPY_TABLE_KEYS)(
      'returns the expect cell `key` for a "%s" table `key`',
      (key) => {
        const data = {
          key,
          item: MOCK_COPY_TASKS.QUEUED,
          props: mockProps,
        };
        const cell = COPY_TABLE_RESOLVERS.getCell(data);

        expect(cell).toBeDefined();
        expect(cell.key).toBe(`${key}-${MOCK_COPY_TASKS.QUEUED.data.id}`);
      }
    );

    describe('text cell resolvers', () => {
      it.each(mockItems)(
        'returns the expected cell values when `key` is "name" for an item with "$status" status',
        (item) => {
          const key = 'name';
          const output = COPY_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'text',
            content: {
              icon: STATUS_ICONS[item.status],
              text: item.data.fileKey,
            },
          });
        }
      );

      it.each(mockItems)(
        'returns the expected cell values when `key` is `folder` for an item with "$status" status',
        (item) => {
          const key = 'folder';
          const output = COPY_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'text',
            content: { text: 'test-folder/' },
          });
        }
      );

      it.each(mockItems)(
        'returns the expected cell values when `key` is `status` for an item with "$status" status',
        (item) => {
          const key = 'status';
          const output = COPY_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'text',
            content: { text: mockDisplayText[STATUS_LABELS[item.status]] },
          });
        }
      );

      it.each(mockItems)(
        'returns the expected cell values when `key` is `type` for an item with "$status" status',
        (item) => {
          const key = 'type';
          const output = COPY_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'text',
            content: { text: 'txt' },
          });
        }
      );

      describe('status cell', () => {
        it('returns an empty string for `context.text` when `item.status` is "OVERWRITE_PREVENTED"', () => {
          const key = 'status';

          const item = {
            ...MOCK_COPY_TASKS.FAILED,
            status: 'OVERWRITE_PREVENTED',
          } as CopyActionTask;

          const output = COPY_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'text',
            content: { text: '' },
          });
        });
      });
    });

    describe('number cell resolvers', () => {
      it.each(mockItems)(
        'returns the expected cell values when `key` is `size` for an item with "$status" status',
        (item) => {
          const key = 'size';
          const output = COPY_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'number',
            content: { value: item.data.size, displayValue: '1.0 kB' },
          });
        }
      );
    });

    describe('button cell resolvers', () => {
      describe('cancel cell', () => {
        it('returns the expected cell values for an `item` with "QUEUED" status when `isProcessing` is "true"', () => {
          const key = 'cancel';
          const item = MOCK_COPY_TASKS.QUEUED;
          const output = COPY_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: mockProps,
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'button',
            content: {
              ariaLabel: `Cancel item: ${item.data.fileKey}`,
              isDisabled: false,
              onClick: expect.any(Function),
              icon: 'cancel',
            },
          });
        });

        it('returns the expected cell values for an `item` with "QUEUED" status when `isProcessing` is "false"', () => {
          const key = 'cancel';
          const item = MOCK_COPY_TASKS.QUEUED;
          const output = COPY_TABLE_RESOLVERS.getCell({
            item,
            key,
            props: { ...mockProps, isProcessing: false },
          });

          expect(output).toStrictEqual({
            key: `${key}-${item.data.id}`,
            type: 'button',
            content: {
              ariaLabel: `Remove item: ${item.data.fileKey}`,
              isDisabled: false,
              onClick: expect.any(Function),
              icon: 'cancel',
            },
          });
        });

        it.each([MOCK_COPY_TASKS.PENDING, MOCK_COPY_TASKS.COMPLETE])(
          'returns the expected cell values for an `item` with "$status" status',
          (item) => {
            const key = 'cancel';
            const output = COPY_TABLE_RESOLVERS.getCell({
              item,
              key,
              props: mockProps,
            });

            expect(output).toStrictEqual({
              key: `${key}-${item.data.id}`,
              type: 'button',
              content: {
                ariaLabel: `Cancel item: ${item.data.fileKey}`,
                isDisabled: true,
                onClick: undefined,
                icon: 'cancel',
              },
            });
          }
        );
      });
    });
  });

  describe('getHeader', () => {
    // filter out cancel, does not allow sorting
    it.each(COPY_TABLE_KEYS.filter((key) => key !== 'cancel'))(
      'returns the expect header data for a %s column',
      (key) => {
        const data = { key, props: mockProps };
        const output = COPY_TABLE_RESOLVERS.getHeader(data);

        expect(output).toStrictEqual({
          key,
          type: 'sort',
          content: { label: capitalize(key) },
        });
      }
    );

    it('returns the expect header data for a cancel column', () => {
      const key = 'cancel' as const;
      const data = { key, props: mockProps };
      const output = COPY_TABLE_RESOLVERS.getHeader(data);

      expect(output).toStrictEqual({
        key,
        type: 'text',
        content: { text: capitalize(key) },
      });
    });
  });

  describe('getRowKey', () => {
    it('resolves a row key as expected', () => {
      const rowKey = COPY_TABLE_RESOLVERS.getRowKey({
        item: MOCK_COPY_TASKS.PENDING,
        props: mockProps,
      });

      expect(rowKey).toBe(MOCK_COPY_TASKS.PENDING.data.id);
    });
  });
});
