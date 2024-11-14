import { LIST_ITEMS_SCENARIOS } from './scenarios';
import { DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT } from '../locationDetailView';

describe('LocationDetailView display text', () => {
  it('should match snapshot values', () => {
    expect(DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT).toMatchSnapshot();
  });

  it.each(LIST_ITEMS_SCENARIOS)(
    '`getListResultsMessage` returns the expected values in the %s scenario',
    (_, data) => {
      const { getListItemsResultMessage } =
        DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT;

      expect(getListItemsResultMessage(data)).toMatchSnapshot();
    }
  );

  it('returns correct string for title', () => {
    const { getTitle } = DEFAULT_LOCATION_DETAIL_VIEW_DISPLAY_TEXT;

    expect(
      getTitle({
        current: {
          bucket: 'test-bucket',
          permission: 'READ',
          id: '123',
          prefix: '',
          type: 'PREFIX',
        },
        path: '',
        key: 'path/to/somewhere',
      })
    ).toBe(`path/to/somewhere`);

    expect(
      getTitle({
        current: {
          bucket: 'test-bucket',
          permission: 'READ',
          id: '123',
          prefix: '',
          type: 'PREFIX',
        },
        path: '',
        key: '',
      })
    ).toBe(`test-bucket`);
  });
});
