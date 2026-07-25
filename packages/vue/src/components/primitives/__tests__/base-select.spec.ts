import { fireEvent, render } from '@testing-library/vue';

import BaseSelect from '../base-select.vue';

describe('BaseSelect', () => {
  it('renders an option for each provided option', () => {
    const { container } = render(BaseSelect, {
      props: {
        options: ['+1', '+44', '+49'],
        selectValue: '',
      },
    });

    const options = container.querySelectorAll('option');
    expect(options).toHaveLength(3);
    expect(options[0].value).toBe('+1');
    expect(options[2].value).toBe('+49');
  });

  it('marks the matching option as selected', () => {
    const { container } = render(BaseSelect, {
      props: {
        options: ['+1', '+44', '+49'],
        selectValue: '+44',
      },
    });

    const options = container.querySelectorAll('option');
    // the option matching selectValue is selected, others are not
    expect(options[1].selected).toBe(true);
    expect(options[0].selected).toBe(false);
  });

  it('renders no options when the list is undefined', () => {
    const { container } = render(BaseSelect, {
      props: {
        options: undefined,
        selectValue: '',
      },
    });

    expect(container.querySelectorAll('option')).toHaveLength(0);
  });

  it('emits update:selectValue when the selection changes', async () => {
    const { container, emitted } = render(BaseSelect, {
      props: {
        options: ['+1', '+44', '+49'],
        selectValue: '+1',
      },
    });

    const select = container.querySelector('select')!;
    await fireEvent.update(select, '+49');

    expect(emitted()['update:selectValue']).toBeTruthy();
    expect(emitted()['update:selectValue'][0]).toEqual(['+49']);
  });
});
