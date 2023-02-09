import { getVideoConstraints } from '../helpers';

describe('getVideoConstraints', () => {
  it('desktop', () => {
    const contentWidth = 500;

    const expectedConstraints: MediaTrackConstraints = {
      width: {
        min: 320,
        ideal: 640,
        max: contentWidth,
      },
      height: {
        min: 240,
        ideal: 480,
        max: 1080,
      },
      frameRate: { min: 15, ideal: 30, max: 30 },
      facingMode: 'user',
    };

    const actualConstraints = getVideoConstraints(false, contentWidth);

    expect(actualConstraints).toEqual(expectedConstraints);
  });

  it('mobile with portrait', () => {
    const contentWidth = 400;

    const expectedConstraints: MediaTrackConstraints = {
      width: {
        min: 320,
        ideal: window.innerHeight,
      },
      height: {
        min: 240,
        ideal: window.innerWidth,
      },
      frameRate: { min: 15, ideal: 30, max: 30 },
      facingMode: 'user',
    };

    const actualConstraints = getVideoConstraints(true, contentWidth);

    expect(actualConstraints).toEqual(expectedConstraints);
  });
});
