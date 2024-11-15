import { act, renderHook } from '@testing-library/react';
import { useControlsContext } from '../../../controls/context';
import { useDataTable } from '../useDataTable';
import { compareButtonData } from '../compareFunctions/compareButtonData';
import { compareDateData } from '../compareFunctions/compareDateData';
import { compareNumberData } from '../compareFunctions/compareNumberData';
import { compareTextData } from '../compareFunctions/compareTextData';
import { DataTableSortHeader } from '../../../composables/DataTable';

jest.mock('../../../controls/context');
jest.mock('../compareFunctions/compareButtonData');
jest.mock('../compareFunctions/compareDateData');
jest.mock('../compareFunctions/compareNumberData');
jest.mock('../compareFunctions/compareTextData');

describe('useDataTable', () => {
  const checkboxHeader = { type: 'checkbox', content: {} };
  const sortHeader = { type: 'sort', content: {} };
  const textHeader = { type: 'text', content: {} };
  const buttonDataCell = { type: 'button', content: {} };
  const checkboxDataCell = { type: 'checkbox', content: {} };
  const dateDataCell = { type: 'date', content: {} };
  const numberDataCell = { type: 'number', content: {} };
  const textDataCell = { type: 'text', content: {} };
  // assert mocks
  const mockUseControlsContext = useControlsContext as jest.Mock;
  const mockCompareButtonData = compareButtonData as jest.Mock;
  const mockCompareDateData = compareDateData as jest.Mock;
  const mockCompareNumberData = compareNumberData as jest.Mock;
  const mockCompareTextData = compareTextData as jest.Mock;

  beforeEach(() => {
    mockCompareButtonData.mockReturnValue(0);
    mockCompareDateData.mockReturnValue(0);
    mockCompareNumberData.mockReturnValue(0);
    mockCompareTextData.mockReturnValue(0);
  });

  afterEach(() => {
    mockUseControlsContext.mockReset();
    mockCompareButtonData.mockReset();
    mockCompareDateData.mockReset();
    mockCompareNumberData.mockReset();
    mockCompareTextData.mockReset();
  });

  it('returns useDataTable data', () => {
    mockUseControlsContext.mockReturnValue({
      data: {
        tableData: {
          headers: [
            { key: 'header-1', ...checkboxHeader },
            { key: 'header-2', ...sortHeader },
            { key: 'header-3', ...textHeader },
            { key: 'header-4', ...textHeader },
            { key: 'header-5', ...textHeader },
          ],
          isLoading: undefined,
          loadingIndicator: undefined,
          rows: [
            {
              key: 'row-1',
              content: [
                { key: 'row-1 data-cell-1', ...checkboxDataCell },
                { key: 'row-1 data-cell-2', ...buttonDataCell },
                { key: 'row-1 data-cell-3', ...dateDataCell },
                { key: 'row-1 data-cell-4', ...numberDataCell },
                { key: 'row-1 data-cell-5', ...textDataCell },
              ],
            },
          ],
        },
      },
    });

    const { result } = renderHook(() => useDataTable());

    expect(result.current).toStrictEqual({
      headers: [
        { key: 'header-1', ...checkboxHeader },
        {
          key: 'header-2',
          ...sortHeader,
          content: {
            onSort: expect.any(Function),
            sortDirection: 'ascending',
          },
        },
        { key: 'header-3', ...textHeader },
        { key: 'header-4', ...textHeader },
        { key: 'header-5', ...textHeader },
      ],
      isLoading: undefined,
      loadingIndicator: undefined,
      rows: [
        {
          key: 'row-1',
          content: [
            { key: 'row-1 data-cell-1', ...checkboxDataCell },
            { key: 'row-1 data-cell-2', ...buttonDataCell },
            { key: 'row-1 data-cell-3', ...dateDataCell },
            { key: 'row-1 data-cell-4', ...numberDataCell },
            { key: 'row-1 data-cell-5', ...textDataCell },
          ],
        },
      ],
    });
  });

  it('returns empty headers and rows if tableData is undefined', () => {
    mockUseControlsContext.mockReturnValue({ data: {} });

    const { result } = renderHook(() => useDataTable());

    expect(result.current).toStrictEqual({
      headers: [],
      isLoading: undefined,
      loadingIndicator: undefined,
      rows: [],
    });
  });

  it('handles data with no sortable columns', () => {
    mockUseControlsContext.mockReturnValue({
      data: {
        tableData: {
          headers: [{ key: 'header-1', ...textHeader }],
          isLoading: undefined,
          loadingIndicator: undefined,
          rows: [
            {
              key: 'row-1',
              content: [{ key: 'row-1 data-cell-1', ...buttonDataCell }],
            },
          ],
        },
      },
    });

    const { result } = renderHook(() => useDataTable());

    expect(result.current).toStrictEqual({
      headers: [expect.objectContaining({ key: 'header-1' })],
      isLoading: undefined,
      loadingIndicator: undefined,
      rows: [expect.objectContaining({ key: 'row-1' })],
    });
  });

  it('defaults to sorting by the first sortable column', () => {
    mockUseControlsContext.mockReturnValue({
      data: {
        tableData: {
          headers: [
            { key: 'header-1', ...textHeader },
            { key: 'header-2', ...sortHeader },
            { key: 'header-3', ...sortHeader },
          ],
          isLoading: undefined,
          loadingIndicator: undefined,
          rows: [
            {
              key: 'row-1',
              content: [
                { key: 'row-1 data-cell-1', ...textDataCell },
                { key: 'row-1 data-cell-2', ...textDataCell },
                { key: 'row-1 data-cell-3', ...textDataCell },
              ],
            },
          ],
        },
      },
    });

    const { result } = renderHook(() => useDataTable());

    expect(result.current).toStrictEqual(
      expect.objectContaining({
        headers: [
          expect.objectContaining({ key: 'header-1' }),
          expect.objectContaining({
            content: {
              onSort: expect.any(Function),
              sortDirection: 'ascending',
            },
          }),
          expect.objectContaining({
            content: {
              onSort: expect.any(Function),
              sortDirection: undefined,
            },
          }),
        ],
      })
    );
  });

  it('sorts by the correct column', () => {
    mockUseControlsContext.mockReturnValue({
      data: {
        tableData: {
          headers: [
            { key: 'header-1', ...sortHeader },
            { key: 'header-2', ...sortHeader },
            { key: 'header-3', ...sortHeader },
          ],
          isLoading: undefined,
          loadingIndicator: undefined,
          rows: [
            {
              key: 'row-1',
              content: [
                { key: 'row-1 data-cell-1', ...buttonDataCell },
                { key: 'row-1 data-cell-2', ...dateDataCell },
                { key: 'row-1 data-cell-3', ...numberDataCell },
              ],
            },
            {
              key: 'row-2',
              content: [
                { key: 'row-2 data-cell-1', ...buttonDataCell },
                { key: 'row-2 data-cell-2', ...dateDataCell },
                { key: 'row-2 data-cell-3', ...numberDataCell },
              ],
            },
          ],
        },
      },
    });
    mockCompareDateData.mockReturnValue(-1);
    mockCompareNumberData.mockReturnValue(1);

    const { result } = renderHook(() => useDataTable());
    expect(result.current).toStrictEqual(
      expect.objectContaining({
        rows: [
          expect.objectContaining({ key: 'row-1' }),
          expect.objectContaining({ key: 'row-2' }),
        ],
      })
    );

    act(() => {
      const [, sortDateData] = result.current.headers;
      (sortDateData as DataTableSortHeader).content.onSort!();
    });

    expect(result.current).toStrictEqual(
      expect.objectContaining({
        rows: [
          expect.objectContaining({ key: 'row-2' }),
          expect.objectContaining({ key: 'row-1' }),
        ],
      })
    );

    act(() => {
      const [, , sortNumberData] = result.current.headers;
      (sortNumberData as DataTableSortHeader).content.onSort!();
    });

    expect(result.current).toStrictEqual(
      expect.objectContaining({
        rows: [
          expect.objectContaining({ key: 'row-1' }),
          expect.objectContaining({ key: 'row-2' }),
        ],
      })
    );

    expect(mockCompareButtonData).toHaveBeenCalledTimes(1);
    expect(mockCompareDateData).toHaveBeenCalledTimes(1);
    expect(mockCompareNumberData).toHaveBeenCalledTimes(1);
    expect(mockCompareTextData).not.toHaveBeenCalled();
  });

  it('sorts button type data cells', () => {
    mockUseControlsContext.mockReturnValue({
      data: {
        tableData: {
          headers: [{ key: 'header-1', ...sortHeader }],
          isLoading: undefined,
          loadingIndicator: undefined,
          rows: [
            {
              key: 'row-1',
              content: [{ key: 'row-1 data-cell-1', ...buttonDataCell }],
            },
            {
              key: 'row-2',
              content: [{ key: 'row-2 data-cell-2', ...buttonDataCell }],
            },
          ],
        },
      },
    });
    mockCompareButtonData.mockReturnValue(-1);

    const { result } = renderHook(() => useDataTable());
    expect(result.current).toStrictEqual(
      expect.objectContaining({
        rows: [
          expect.objectContaining({ key: 'row-2' }),
          expect.objectContaining({ key: 'row-1' }),
        ],
      })
    );
    expect(mockCompareButtonData).toHaveBeenCalledTimes(1);
    expect(mockCompareDateData).not.toHaveBeenCalled();
    expect(mockCompareNumberData).not.toHaveBeenCalled();
    expect(mockCompareTextData).not.toHaveBeenCalled();
  });

  it('sorts date type data cells', () => {
    mockUseControlsContext.mockReturnValue({
      data: {
        tableData: {
          headers: [{ key: 'header-1', ...sortHeader }],
          isLoading: undefined,
          loadingIndicator: undefined,
          rows: [
            {
              key: 'row-1',
              content: [{ key: 'row-1 data-cell-1', ...dateDataCell }],
            },
            {
              key: 'row-2',
              content: [{ key: 'row-2 data-cell-1', ...dateDataCell }],
            },
          ],
        },
      },
    });
    mockCompareDateData.mockReturnValue(-1);

    const { result } = renderHook(() => useDataTable());
    expect(result.current).toStrictEqual(
      expect.objectContaining({
        rows: [
          expect.objectContaining({ key: 'row-2' }),
          expect.objectContaining({ key: 'row-1' }),
        ],
      })
    );
    expect(mockCompareButtonData).not.toHaveBeenCalled();
    expect(mockCompareDateData).toHaveBeenCalledTimes(1);
    expect(mockCompareNumberData).not.toHaveBeenCalled();
    expect(mockCompareTextData).not.toHaveBeenCalled();
  });

  it('sorts number type data cells', () => {
    mockUseControlsContext.mockReturnValue({
      data: {
        tableData: {
          headers: [{ key: 'header-1', ...sortHeader }],
          isLoading: undefined,
          loadingIndicator: undefined,
          rows: [
            {
              key: 'row-1',
              content: [{ key: 'row-1 data-cell-1', ...numberDataCell }],
            },
            {
              key: 'row-2',
              content: [{ key: 'row-2 data-cell-1', ...numberDataCell }],
            },
          ],
        },
      },
    });
    mockCompareNumberData.mockReturnValue(-1);

    const { result } = renderHook(() => useDataTable());
    expect(result.current).toStrictEqual(
      expect.objectContaining({
        rows: [
          expect.objectContaining({ key: 'row-2' }),
          expect.objectContaining({ key: 'row-1' }),
        ],
      })
    );
    expect(mockCompareButtonData).not.toHaveBeenCalled();
    expect(mockCompareDateData).not.toHaveBeenCalled();
    expect(mockCompareNumberData).toHaveBeenCalledTimes(1);
    expect(mockCompareTextData).not.toHaveBeenCalled();
  });

  it('sorts text type data cells', () => {
    mockUseControlsContext.mockReturnValue({
      data: {
        tableData: {
          headers: [{ key: 'header-1', ...sortHeader }],
          rows: [
            {
              key: 'row-1',
              content: [{ key: 'row-1 data-cell-1', ...textDataCell }],
            },
            {
              key: 'row-2',
              content: [{ key: 'row-2 data-cell-1', ...textDataCell }],
            },
          ],
        },
      },
    });
    mockCompareTextData.mockReturnValue(-1);

    const { result } = renderHook(() => useDataTable());
    expect(result.current).toStrictEqual(
      expect.objectContaining({
        rows: [
          expect.objectContaining({ key: 'row-2' }),
          expect.objectContaining({ key: 'row-1' }),
        ],
      })
    );
    expect(mockCompareButtonData).not.toHaveBeenCalled();
    expect(mockCompareDateData).not.toHaveBeenCalled();
    expect(mockCompareNumberData).not.toHaveBeenCalled();
    expect(mockCompareTextData).toHaveBeenCalledTimes(1);
  });

  it('does not sort checkbox type data cells', () => {
    mockUseControlsContext.mockReturnValue({
      data: {
        tableData: {
          headers: [{ key: 'header-1', ...sortHeader }],
          rows: [
            {
              key: 'row-1',
              content: [{ key: 'row-1 data-cell-1', ...checkboxDataCell }],
            },
            {
              key: 'row-2',
              content: [{ key: 'row-2 data-cell-1', ...checkboxDataCell }],
            },
          ],
        },
      },
    });

    const { result } = renderHook(() => useDataTable());
    expect(result.current).toStrictEqual(
      expect.objectContaining({
        rows: [
          expect.objectContaining({ key: 'row-1' }),
          expect.objectContaining({ key: 'row-2' }),
        ],
      })
    );
    expect(mockCompareButtonData).not.toHaveBeenCalled();
    expect(mockCompareDateData).not.toHaveBeenCalled();
    expect(mockCompareNumberData).not.toHaveBeenCalled();
    expect(mockCompareTextData).not.toHaveBeenCalled();
  });

  it('groups then sorts different types of data cells in the same column', () => {
    mockUseControlsContext.mockReturnValue({
      data: {
        tableData: {
          headers: [{ key: 'header-1', ...sortHeader }],
          rows: [
            {
              key: 'button-row-1',
              content: [{ key: 'button-row-1 data-cell-1', ...buttonDataCell }],
            },
            {
              key: 'number-row-1',
              content: [{ key: 'number-row-1 data-cell-1', ...numberDataCell }],
            },
            {
              key: 'text-row-1',
              content: [{ key: 'text-row-1 data-cell-1', ...textDataCell }],
            },
            {
              key: 'checkbox-row-1',
              content: [
                { key: 'checkbox-row-1 data-cell-1', ...checkboxDataCell },
              ],
            },
            {
              key: 'date-row-1',
              content: [{ key: 'date-row-1 data-cell-1', ...dateDataCell }],
            },
            {
              key: 'date-row-2',
              content: [{ key: 'date-row-2 data-cell-1', ...dateDataCell }],
            },
            {
              key: 'button-row-2',
              content: [{ key: 'button-row-2 data-cell-1', ...buttonDataCell }],
            },
            {
              key: 'text-row-2',
              content: [{ key: 'text-row-2 data-cell-1', ...textDataCell }],
            },
            {
              key: 'checkbox-row-2',
              content: [
                { key: 'checkbox-row-2 data-cell-1', ...checkboxDataCell },
              ],
            },
            {
              key: 'number-row-2',
              content: [{ key: 'number-row-2 data-cell-1', ...numberDataCell }],
            },
          ],
        },
      },
    });
    mockCompareButtonData.mockReturnValue(-1);
    mockCompareDateData.mockReturnValue(-1);
    mockCompareNumberData.mockReturnValue(-1);
    mockCompareTextData.mockReturnValue(-1);

    const { result } = renderHook(() => useDataTable());
    expect(result.current).toStrictEqual(
      expect.objectContaining({
        rows: [
          expect.objectContaining({ key: 'checkbox-row-1' }),
          expect.objectContaining({ key: 'checkbox-row-2' }),
          expect.objectContaining({ key: 'button-row-2' }),
          expect.objectContaining({ key: 'button-row-1' }),
          expect.objectContaining({ key: 'date-row-2' }),
          expect.objectContaining({ key: 'date-row-1' }),
          expect.objectContaining({ key: 'number-row-2' }),
          expect.objectContaining({ key: 'number-row-1' }),
          expect.objectContaining({ key: 'text-row-2' }),
          expect.objectContaining({ key: 'text-row-1' }),
        ],
      })
    );

    mockCompareButtonData.mockReturnValue(1);
    mockCompareDateData.mockReturnValue(1);
    mockCompareNumberData.mockReturnValue(1);
    mockCompareTextData.mockReturnValue(1);

    act(() => {
      const [sortData] = result.current.headers;
      (sortData as DataTableSortHeader).content.onSort!();
    });

    expect(result.current).toStrictEqual(
      expect.objectContaining({
        rows: [
          expect.objectContaining({ key: 'text-row-1' }),
          expect.objectContaining({ key: 'text-row-2' }),
          expect.objectContaining({ key: 'number-row-1' }),
          expect.objectContaining({ key: 'number-row-2' }),
          expect.objectContaining({ key: 'date-row-1' }),
          expect.objectContaining({ key: 'date-row-2' }),
          expect.objectContaining({ key: 'button-row-1' }),
          expect.objectContaining({ key: 'button-row-2' }),
          expect.objectContaining({ key: 'checkbox-row-1' }),
          expect.objectContaining({ key: 'checkbox-row-2' }),
        ],
      })
    );
  });
});
