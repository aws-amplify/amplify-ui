import { getVideoConstraints } from '../helpers';

describe('getVideoConstraints', () => {
  it('should return 640x480 video constraints', () => {
    const expectedConstraints: MediaTrackConstraints = {
      width: {
        min: 320,
        ideal: 640,
      },
      height: {
        min: 240,
        ideal: 480,
      },
      frameRate: { min: 15, ideal: 30, max: 30 },
      facingMode: 'user',
    };

    const actualConstraints = getVideoConstraints();

    expect(actualConstraints).toEqual(expectedConstraints);
  });
});
