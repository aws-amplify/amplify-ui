import * as React from 'react';
import { render, screen } from '@testing-library/react';
import kebabCase from 'lodash/kebabCase';

import { AUTO_GENERATED_ID_PREFIX } from '../../utils/useStableId';
import { ComponentClassNames } from '../../shared';
import { ComponentPropsToStylePropsMap } from '../../types';
import { SwitchField } from '../SwitchField';

describe('Switch Field', () => {
  const label = 'My switch label';

  describe('Switch wrapper', () => {
    it('should pass through the className', () => {
      const { container } = render(
        <SwitchField label={label} className="my-switch" />
      );

      const wrapper = container.getElementsByClassName(
        ComponentClassNames.SwitchField
      )[0];
      expect(wrapper).toHaveClass('my-switch');
    });

    it('should render the position classes on SwitchField', () => {
      const { container } = render(
        <SwitchField label={label} labelPosition="top" />
      );

      const wrapper = container.getElementsByClassName(
        ComponentClassNames.SwitchWrapper
      )[0];
      expect(wrapper).toHaveClass(`${ComponentClassNames.SwitchWrapper}--top`);
    });

    it('should forward ref to DOM element', async () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<SwitchField testId="testId" label={label} ref={ref} />);

      await screen.findByLabelText(label);
      expect(ref.current?.nodeName).toBe('DIV');
    });

    it('should set the data-size attribute', () => {
      const { container } = render(<SwitchField label={label} size="large" />);

      const wrapper = container.getElementsByClassName(
        ComponentClassNames.SwitchField
      )[0] as HTMLElement;
      expect(wrapper.dataset['size']).toEqual('large');
    });

    it('should set the label for attribute to match the passed in id', () => {
      const { container } = render(
        <SwitchField label={label} id="my-switch" />
      );

      const wrapper = container.getElementsByClassName(
        ComponentClassNames.SwitchWrapper
      )[0];
      expect(wrapper).toHaveAttribute('for', 'my-switch');
    });

    it('should set the data-label-position attribute', () => {
      const { container } = render(
        <SwitchField label={label} labelPosition="end" />
      );

      const wrapper = container.getElementsByClassName(
        ComponentClassNames.SwitchField
      )[0] as HTMLElement;
      expect(wrapper).toHaveAttribute('data-label-position', 'end');
    });
  });

  describe('Label', () => {
    it('should render the passed in label string', () => {
      const { container } = render(<SwitchField label={label} />);

      const field = container.getElementsByClassName(
        ComponentClassNames.SwitchLabel
      )[0];
      expect(field).toHaveTextContent(label);
    });

    it('should render the passed in label element', () => {
      const label = <span className="my-custom-label">Element Label</span>;
      const { container } = render(<SwitchField label={label} />);

      const field = container.getElementsByClassName('my-custom-label')[0];
      expect(field).toHaveTextContent('Element Label');
    });

    it('should hide the label using the visually hidden component when the isLabelHidden flag is passed in', () => {
      const { container } = render(<SwitchField label={label} isLabelHidden />);

      const field = container.getElementsByClassName(
        ComponentClassNames.SwitchLabel
      )[0];
      expect(field).toHaveClass('amplify-visually-hidden');
    });
  });

  describe('Input', () => {
    it('should create a checkbox input element', () => {
      const { container } = render(<SwitchField label={label} />);

      const field = container.getElementsByTagName('input')[0];
      expect(field).toHaveAttribute('type', 'checkbox');
    });

    it('should hide the input with the visually hidden component', () => {
      const { container } = render(<SwitchField label={label} />);

      const field = container.getElementsByTagName('input')[0].parentElement;
      expect(field).toHaveClass('amplify-visually-hidden');
    });

    it('should pass through the name and value properties to the checkbox', () => {
      const { container } = render(
        <SwitchField label={label} name="myCheckbox" value="checkboxValue" />
      );

      const field = container.getElementsByTagName('input')[0];
      expect(field).toHaveAttribute('name', 'myCheckbox');
      expect(field).toHaveAttribute('value', 'checkboxValue');
    });

    it('should disable the checkbox with the isDisabled prop', () => {
      const { container } = render(<SwitchField label={label} isDisabled />);

      const field = container.getElementsByTagName('input')[0];
      expect(field).toHaveProperty('disabled', true);
    });

    it('should set the input to checked with the isChecked prop', () => {
      const { container } = render(<SwitchField isChecked label={label} />);

      const field = container.getElementsByTagName('input')[0];
      expect(field).toBeChecked();
    });

    it('should update the checked value when a controlled value is updated', async () => {
      const { rerender } = render(<SwitchField isChecked label={label} />);

      const input = await screen.findByLabelText(label);
      expect(input).toBeChecked();

      rerender(<SwitchField isChecked={false} label={label} />);

      expect(input).not.toBeChecked();
    });

    it('should set the input to checked with the defaultChecked prop', () => {
      const { container } = render(
        <SwitchField label={label} defaultChecked />
      );

      const field = container.getElementsByTagName('input')[0];
      expect(field).toBeChecked();
    });

    it('should set the id on the input element', () => {
      const { container } = render(
        <SwitchField label={label} id="my-switch" />
      );

      const field = container.getElementsByTagName('input')[0];
      expect(field.id).toEqual('my-switch');
    });

    it('should render labeled radio when id is not provided and is autogenerated', async () => {
      render(<SwitchField label={label} />);

      const field = await screen.findByLabelText(label);
      expect(field.id.startsWith(AUTO_GENERATED_ID_PREFIX)).toBe(true);
    });
  });

  describe('Switch Track', () => {
    it('should render the state classes on SwitchField', () => {
      const { container } = render(
        <SwitchField label={label} isChecked isDisabled />
      );

      const wrapper = container.getElementsByClassName(
        ComponentClassNames.SwitchTrack
      )[0];
      expect(wrapper).toHaveClass(
        `${ComponentClassNames.SwitchTrack}--checked`
      );
      expect(wrapper).toHaveClass(
        `${ComponentClassNames.SwitchTrack}--disabled`
      );
    });

    it('should set the track color for the unchecked switch', () => {
      const { container } = render(
        <SwitchField label={label} trackColor="red" />
      );

      const track = container.getElementsByClassName(
        ComponentClassNames.SwitchTrack
      )[0] as HTMLElement;
      expect(
        track.style.getPropertyValue(
          kebabCase(ComponentPropsToStylePropsMap.backgroundColor)
        )
      ).toBe('red');
    });

    it('should set the track color for the checked switch field', () => {
      const { container } = render(
        <SwitchField label={label} trackCheckedColor="red" defaultChecked />
      );

      const track = container.getElementsByClassName(
        ComponentClassNames.SwitchTrack
      )[0] as HTMLElement;
      expect(
        track.style.getPropertyValue(
          kebabCase(ComponentPropsToStylePropsMap.backgroundColor)
        )
      ).toBe('red');
    });

    it('should add the data-focused attribute to the track when the input is focused', () => {
      const { container } = render(<SwitchField label={label} />);

      const track = container.getElementsByClassName(
        ComponentClassNames.SwitchTrack
      )[0] as HTMLElement;
      const inputField = container.getElementsByTagName('input')[0];
      inputField.focus();

      expect(track).toHaveAttribute('data-focused');
    });
  });

  describe('Switch Thumb', () => {
    it('should change the switch thumb color', () => {
      const { container } = render(
        <SwitchField label={label} thumbColor="red" />
      );

      const track = container.getElementsByClassName(
        ComponentClassNames.SwitchThumb
      )[0] as HTMLElement;
      expect(
        track.style.getPropertyValue(
          kebabCase(ComponentPropsToStylePropsMap.backgroundColor)
        )
      ).toBe('red');
    });
  });
});
