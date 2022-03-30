import { useTypeCastFields } from '../shared/useTypeCastFields';
import { renderHook } from '@testing-library/react-hooks';

import { schema } from './models/schema';
import { Home } from './models';
import exp from 'constants';
import { result } from 'lodash';

jest.mock('aws-amplify');

const formFields = {
  address: '1234 Main St',
  image_url: 'https://unsplash.com/photos/qdjotaILp50',
  price: '1.99',
  Rating: '5',
  isAvailable: 'true',
  availabilityDateTime: '2202-03-01T13:00:00.253Z',
  availabilityDate: '2048-01-01',
  availabliltyTime: '13:00:00.253',
  randomJSON: '{"some":"key"}',
  timestamp: '31556926',
  phone: '444-555-6666',
  ipAddress: '192.1.1.1',
  email: 'janeDoe@gmail.com',
  createdAt: '2202-03-01T13:00:00.253Z',
  updatedAt: '2202-03-01T13:00:00.253Z',
};

const fields = {
  ...formFields,
  price: 1.99,
  Rating: 5,
  isAvailable: true,
  timestamp: 31556926,
};

let consoleWarnSpy: jest.SpyInstance;

describe('useTypeCastFields', () => {
  afterEach(() => {
    consoleWarnSpy?.mockRestore();
  });

  describe('when using formFields with schema', () => {
    const {
      result: { current: convertedFields },
    } = renderHook(() =>
      useTypeCastFields<Home>({
        modelName: 'Home',
        schema,
        formFields,
        fields: undefined,
      })
    );
    it('should convert string with Int types to Number', () => {
      expect(convertedFields.Rating).toEqual(5);
    });

    it('should convert string with Float types to Number', () => {
      expect(convertedFields.price).toEqual(1.99);
    });

    it('should convert string with AWSTimestamp types to Number', () => {
      expect(convertedFields.timestamp).toEqual(31556926);
    });

    it('should convert string with Boolean types to Boolean', () => {
      expect(convertedFields.isAvailable).toEqual(true);
    });

    // this test is mean to catch any unexpected conversions
    it('should convert everything together correctly', () => {
      expect(convertedFields).toEqual(fields);
    });
  });

  describe('when using formFields without schema', () => {
    it('expect to throw with error message', () => {
      const {
        result: { error },
      } = renderHook(() =>
        useTypeCastFields<Home>({
          modelName: 'Home',
          fields: undefined,
          formFields,
          schema: undefined,
        })
      );
      expect(error).toEqual(
        Error(
          'DataStore Actions Error: Must provide both `formFields` and `schema`'
        )
      );
    });
  });

  describe('when using strongly typed fields param (not formFields nor schema)', () => {
    const {
      result: { current },
    } = renderHook(() =>
      useTypeCastFields<Home>({
        modelName: 'Home',
        fields,
        schema: undefined,
        formFields: undefined,
      })
    );
    it('should just return fields directly', () => {
      expect(current).toBe(fields);
    });
  });

  describe('when using fields param and formFields', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

    const {
      result: { current },
    } = renderHook(() =>
      useTypeCastFields<Home>({
        modelName: 'Home',
        fields,
        schema,
        formFields,
      })
    );
    it('should just return fields directly', () => {
      expect(current).toBe(fields);
      expect(consoleWarnSpy).toBeCalledWith(
        'DataStore Actions Warning: dont use both `fields` and `formFields`. Use either corrrectly typed `fields` or `formFields` + `schema` params. Defaulting to fields.'
      );
    });
  });
});
