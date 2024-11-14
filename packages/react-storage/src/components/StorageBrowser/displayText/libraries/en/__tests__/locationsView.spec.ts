import { LIST_LOCATIONS_SCENARIOS } from './scenarios';
import { DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT } from '../locationsView';

describe('LocationsView display text', () => {
  it('should match snapshot values', () => {
    expect(DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT).toMatchSnapshot();
  });

  it.each(LIST_LOCATIONS_SCENARIOS)(
    '`getListLocationsResultMessage` returns the expected values in the %s scenario',
    (_, data) => {
      const { getListLocationsResultMessage } =
        DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT;

      expect(getListLocationsResultMessage(data)).toMatchSnapshot();
    }
  );

  it('returns the expected values from getPermissionsDisplayValue', () => {
    const { getDownloadLabel, getPermissionsDisplayValue } =
      DEFAULT_LOCATIONS_VIEW_DISPLAY_TEXT;

    expect(getPermissionsDisplayValue('READ')).toMatchSnapshot();
    expect(getPermissionsDisplayValue('WRITE')).toMatchSnapshot();
    expect(getPermissionsDisplayValue('READWRITE')).toMatchSnapshot();
    // @ts-expect-error
    // testing unknown permission type
    expect(getPermissionsDisplayValue('CUSTOM')).toMatchSnapshot();
    expect(getDownloadLabel('my.jpg')).toMatchSnapshot();
  });
});
