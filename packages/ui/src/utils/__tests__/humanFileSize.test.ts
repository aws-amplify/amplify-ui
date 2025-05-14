import { humanFileSize } from '../humanFileSize';

describe('humanFileSize', () => {
  it('returns the correct human readable string for 100000 bytes metric false', () => {
    const message = humanFileSize(100000);

    expect(message).toEqual('97.7 KiB');
  });
  it('returns the correct human readable string for 100000 bytes metric true', () => {
    const message = humanFileSize(100000, true);

    expect(message).toEqual('100.0 kB');
  });
  it('returns the correct human readable string for 0 bytes', () => {
    const message = humanFileSize(0);

    expect(message).toEqual('0 B');
  });
  it('returns the correct human readable string for negative bytes', () => {
    const message = humanFileSize(-1);

    expect(message).toEqual('-1 B');
  });
});
