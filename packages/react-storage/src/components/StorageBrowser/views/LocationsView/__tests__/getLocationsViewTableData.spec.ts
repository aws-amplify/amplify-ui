import { getLocationsViewTableData } from '../getLocationsViewTableData';
import { LocationViewHeaders } from '../getLocationsViewTableData/types';

describe('getLocationsViewTableData', () => {
  const location1 = {
    bucket: 'bucket',
    id: 'id-1',
    permission: 'READ',
    prefix: 'prefix-1/',
    type: 'PREFIX',
  } as const;
  const location2 = { ...location1, id: 'id-2', prefix: 'prefix-2/' };

  const headers: LocationViewHeaders = [
    {
      key: 'folder',
      type: 'sort',
      content: { label: 'Folder' },
    },
    {
      key: 'bucket',
      type: 'sort',
      content: { label: 'Bucket' },
    },
    {
      key: 'permission',
      type: 'sort',
      content: { label: 'Permission' },
    },
  ];

  // create mocks
  const mockOnNavigate = jest.fn();

  afterEach(() => {
    mockOnNavigate.mockClear();
  });

  it('should return table data as expected', () => {
    expect(
      getLocationsViewTableData({
        pageItems: [location1],
        onNavigate: mockOnNavigate,
        headers,
      })
    ).toStrictEqual({
      headers: [
        expect.objectContaining({ content: { label: 'Folder' } }),
        expect.objectContaining({ content: { label: 'Bucket' } }),
        expect.objectContaining({ content: { label: 'Permission' } }),
      ],
      rows: [
        expect.objectContaining({
          content: [
            expect.objectContaining({
              type: 'button',
              content: expect.objectContaining({ label: location1.prefix }),
            }),
            expect.objectContaining({
              type: 'text',
              content: expect.objectContaining({ text: location1.bucket }),
            }),
            expect.objectContaining({
              type: 'text',
              content: expect.objectContaining({ text: location1.permission }),
            }),
          ],
        }),
      ],
    });
  });

  it('uses bucket label when prefix is empty', () => {
    expect(
      getLocationsViewTableData({
        pageItems: [{ ...location1, prefix: '' }],
        onNavigate: mockOnNavigate,
        headers,
      })
    ).toStrictEqual(
      expect.objectContaining({
        rows: [
          expect.objectContaining({
            content: expect.arrayContaining([
              expect.objectContaining({
                type: 'button',
                content: expect.objectContaining({ label: location1.bucket }),
              }),
            ]),
          }),
        ],
      })
    );
  });

  it('navigates to corresponding locations', () => {
    const tableData = getLocationsViewTableData({
      pageItems: [location1, location2],
      onNavigate: mockOnNavigate,
      headers,
    });
    const [row1FirstContent] = tableData.rows[0].content;
    const [row2FirstContent] = tableData.rows[1].content;
    if (
      row1FirstContent.type === 'button' &&
      row2FirstContent.type === 'button'
    ) {
      row2FirstContent.content.onClick?.();
      row1FirstContent.content.onClick?.();
    }
    expect(mockOnNavigate).toHaveBeenNthCalledWith(1, location2);
    expect(mockOnNavigate).toHaveBeenNthCalledWith(2, location1);
  });
});
