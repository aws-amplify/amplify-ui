import { CancelableTaskHandlerOutput, TaskHandlerOutput } from '../../actions';
import { updateTasks, hasExistingTask, isCancelableOutput } from '../utils';

const one = { key: 'one', status: 'running' };
const two = { key: 'two', status: 'walking' };
const three = { key: 'three', status: 'crawling' };
const four = { key: 'four', status: 'running' };

const tasks = [one, two, three, four];

describe('updateTasks', () => {
  it('handles updating a `task` in the middle of `tasks` as expected', () => {
    const result = updateTasks(tasks, { key: 'two', status: 'crawling' });

    expect(result[1].key).toBe('two');
    expect(result[1].status).toBe('crawling');
  });

  it('handles updating the first `task` of `tasks` as expected', () => {
    const result = updateTasks(tasks, { key: 'one', status: 'crawling' });

    expect(result[0].key).toBe('one');
    expect(result[0].status).toBe('crawling');
  });

  it('handles updating the last `task` of `tasks` as expected', () => {
    const result = updateTasks(tasks, { key: 'four', status: 'crawling' });

    expect(result[3].key).toBe('four');
    expect(result[3].status).toBe('crawling');
  });

  it('returns unmodified `tasks` when provided `task.key` is not found', () => {
    const result = updateTasks(tasks, {
      key: 'nooooooooo',
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

describe('hasExistingTask', () => {
  it('returns `true` for an existing `task`', () => {
    const result = hasExistingTask(tasks, one);
    expect(result).toBe(true);
  });

  it('returns `false` for a non-existint `task`', () => {
    const result = hasExistingTask(tasks, { key: 'five' });
    expect(result).toBe(false);
  });
});
