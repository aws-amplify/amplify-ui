import { LocationData } from '../../actions';
import { StoreProviderProps } from '../types';
import {
  CHANGED_MODE,
  CONLICTING_PROPS,
  DEPRECATED_PROPS,
  DEPRECATED_PROPS_AND_CONFLICTING,
  DEPRECATED_SUFFIX,
  MISSING_REQUIRED,
  READONLY,
} from '../validateStoreProps';

// mock implementation to disable terminal output
const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

const location: LocationData = {
  bucket: 'my-bucket',
  prefix: 'my-prefix',
  permissions: ['delete'],
  id: '',
  type: 'BUCKET',
};

describe('validateStoreProps', () => {
  let validateStoreProps: (props: StoreProviderProps) => void;

  beforeEach(() => {
    // use `jest.isolateModules` to reset module state between tests
    jest.isolateModules(() => {
      // disable the below linting rules as they do not play well with `require` statements
      // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access
      validateStoreProps = require('../validateStoreProps').default;
    });
  });

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  it('logs the expected error message when provided multiple deprecated props once', () => {
    validateStoreProps({ actionType: 'some-action', location });

    const expected = [
      DEPRECATED_PROPS,
      '`actionType`, `location`',
      DEPRECATED_SUFFIX,
    ];
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(...expected);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(...expected);
  });

  it('logs the expected error message when provided a single deprecated prop once', () => {
    validateStoreProps({ actionType: 'some-action' });

    const expected = [DEPRECATED_PROPS, '`actionType`', DEPRECATED_SUFFIX];

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(...expected);

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(...expected);
  });

  it('logs the expected error message when provided both `value` and `defaultValue` props once', () => {
    validateStoreProps({ value: {}, defaultValue: {} });
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(CONLICTING_PROPS);

    validateStoreProps({ value: {}, defaultValue: {} });
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(CONLICTING_PROPS);
  });

  it('logs the expected message when provided a `value.location` with missing required parameters once', () => {
    validateStoreProps({
      // @ts-expect-error force invalid location
      value: { location: { ...location, bucket: undefined } },
      onValueChange: jest.fn(),
    });

    const expected = [MISSING_REQUIRED, '`bucket`'];
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(...expected);

    validateStoreProps({
      // @ts-expect-error force invalid location
      value: { location: { ...location, bucket: undefined } },
      onValueChange: jest.fn(),
    });
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(...expected);
  });

  it('logs the expected messages when provided a deprecated `location` with missing required parameters once', () => {
    validateStoreProps({
      // @ts-expect-error force invalid location
      location: { ...location, bucket: undefined, prefix: undefined },
    });

    const expectedOne = [DEPRECATED_PROPS, '`location`', DEPRECATED_SUFFIX];
    const expectedTwo = [MISSING_REQUIRED, '`bucket`, `prefix`'];

    // scenario logs both deprecated and missing messages
    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
    expect(consoleErrorSpy).toHaveBeenCalledWith(...expectedOne);
    expect(consoleErrorSpy).toHaveBeenCalledWith(...expectedTwo);

    validateStoreProps({
      // @ts-expect-error force invalid location
      location: { ...location, bucket: undefined, prefix: undefined },
    });

    expect(consoleErrorSpy).toHaveBeenCalledTimes(2);
    expect(consoleErrorSpy).toHaveBeenCalledWith(...expectedOne);
    expect(consoleErrorSpy).toHaveBeenCalledWith(...expectedTwo);
  });

  it('logs the expected message when provided only a `value` prop once', () => {
    validateStoreProps({ value: { location } });

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(READONLY);

    validateStoreProps({ value: { location } });

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(READONLY);
  });

  it('logs the expected messages when provided a deprecated prop and a `value` prop once', () => {
    validateStoreProps({
      value: { location },
      location,
      onValueChange: jest.fn(),
    });

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      DEPRECATED_PROPS_AND_CONFLICTING,
      '`location`',
      DEPRECATED_SUFFIX
    );

    validateStoreProps({
      value: { location },
      location,
      onValueChange: jest.fn(),
    });

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      DEPRECATED_PROPS_AND_CONFLICTING,
      '`location`',
      DEPRECATED_SUFFIX
    );
  });

  it('logs the expected message on change between controlled and uncontrolled mode once', () => {
    validateStoreProps({ value: null });
    validateStoreProps({});

    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(CHANGED_MODE);
  });
});
