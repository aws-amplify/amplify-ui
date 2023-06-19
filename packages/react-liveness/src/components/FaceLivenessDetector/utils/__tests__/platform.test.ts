import { VERSION } from '../../../../version';
import { getLivenessUserAgent } from '../platform';

describe('getLivenessUserAgent', () => {
  it('should return a user agent string containing the current version', () => {
    const customUserAgent = getLivenessUserAgent();

    expect(customUserAgent).toContain('ui-react-liveness');
    expect(customUserAgent).toContain(VERSION);
  });
});
