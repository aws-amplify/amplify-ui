import { getRandomScalingAttributes } from '../liveness';

describe('Liveness Helper', () => {
  it('should parse clientActionDocumnet and return oval scaling attributes', () => {
    const testClientActionJSON = {
      ovalScaleFactor: { width: 0.76, centerX: 0.65, centerY: 0.66 },
    };
    const randomScalingAttributes = getRandomScalingAttributes(
      JSON.stringify(testClientActionJSON)
    );

    expect(Number(randomScalingAttributes.centerX)).toBe(0.65);
    expect(randomScalingAttributes.centerY).toBe(0.66);
    expect(randomScalingAttributes.width).toBe(0.76);
  });
});
