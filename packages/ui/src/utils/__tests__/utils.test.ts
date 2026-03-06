import { groupLog, splitObject } from '../utils';

describe('groupLog', () => {
  it('should log with group when events provided', () => {
    const consoleSpy = jest
      .spyOn(console, 'groupCollapsed')
      .mockImplementation();
    const logSpy = jest.spyOn(console, 'log').mockImplementation();
    const endSpy = jest.spyOn(console, 'groupEnd').mockImplementation();

    groupLog('test', 'event1', 'event2');

    expect(consoleSpy).toHaveBeenCalledWith('test');
    expect(logSpy).toHaveBeenCalledWith('event1');
    expect(logSpy).toHaveBeenCalledWith('event2');
    expect(endSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
    logSpy.mockRestore();
    endSpy.mockRestore();
  });

  it('should log without group when no events', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation();

    groupLog('test');

    expect(logSpy).toHaveBeenCalledWith('test');

    logSpy.mockRestore();
  });
});

describe('splitObject', () => {
  it('should split object based on predicate', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const [left, right] = splitObject(obj, (key) => key === 'a' || key === 'c');

    expect(left).toEqual({ a: 1, c: 3 });
    expect(right).toEqual({ b: 2 });
  });
});
