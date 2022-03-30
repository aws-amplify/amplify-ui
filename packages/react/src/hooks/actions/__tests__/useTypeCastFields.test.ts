import { useTypeCastFields } from '../shared/useTypeCastFields';
import { renderHook } from '@testing-library/react-hooks';

import { schema } from './models/schema';
import { Home } from './models';

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

describe('useTypeCastFields', () => {
  beforeEach(() => jest.clearAllMocks());
  const {
    result: { current: convertedFields },
  } = renderHook(() =>
    useTypeCastFields<Home>({
      modelName: 'Home',
      schema,
      formFields,
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
    expect(convertedFields).toEqual({
      ...formFields,
      price: 1.99,
      Rating: 5,
      isAvailable: true,
      timestamp: 31556926,
    });
  });
});
