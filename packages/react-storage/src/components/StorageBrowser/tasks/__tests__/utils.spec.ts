import { CancelableTaskHandlerOutput, TaskHandlerOutput } from '../../actions';
import { updateTasks, isCancelableOutput } from '../utils';

const one = { id: 'one', status: 'running' };
const two = { id: 'two', status: 'walking' };
const three = { id: 'three', status: 'crawling' };
const four = { id: 'four', status: 'running' };

const tasks = [one, two, three, four];

describe('updateTasks', () => {
  it('handles updating a `task` in the middle of `tasks` as expected', () => {
    const result = updateTasks(tasks, { id: 'two', status: 'crawling' });

    expect(result[1].id).toBe('two');
    expect(result[1].status).toBe('crawling');
  });

  it('handles updating the first `task` of `tasks` as expected', () => {
    const result = updateTasks(tasks, { id: 'one', status: 'crawling' });

    expect(result[0].id).toBe('one');
    expect(result[0].status).toBe('crawling');
  });

  it('handles updating the last `task` of `tasks` as expected', () => {
    const result = updateTasks(tasks, { id: 'four', status: 'crawling' });

    expect(result[3].id).toBe('four');
    expect(result[3].status).toBe('crawling');
  });

  it('returns unmodified `tasks` when provided `task.keyid is not found', () => {
    const result = updateTasks(tasks, {
      id: 'nooooooooo',
      status: 'crawling',
    });

    expect(result).toBe(tasks);
  });
});

describe('isCancelableOutput', () => {
  it('returns `true` when `output.cancel` is a function', () => {
    const output: CancelableTaskHandlerOutput = {
      cancel: jest.fn(),
      key: 'testo',
      result: Promise.resolve('COMPLETE'),
    };
    const result = isCancelableOutput(output);

    expect(result).toBe(true);
  });

  it('returns `false` when `output.cancel` is not a function', () => {
    const output: TaskHandlerOutput = {
      // @ts-expect-error force allow `cancel`
      cancel: 'cancel',
      key: 'testo',
      result: Promise.resolve('COMPLETE'),
    };
    const result = isCancelableOutput(output);

    expect(result).toBe(false);
  });

  it('returns `false` when `output.cancel` is undefined', () => {
    const output: TaskHandlerOutput = {
      key: 'testo',
      result: Promise.resolve('COMPLETE'),
    };
    const result = isCancelableOutput(output);

    expect(result).toBe(false);
  });
});
