import * as React from 'react';

import { render, screen } from '@testing-library/react';
import { countryDialCodes } from '@aws-amplify/ui';

import { DialCodeSelect } from '../DialCodeSelect';
import { ComponentClassName } from '@aws-amplify/ui';
import { DialCodeSelectProps } from '../../types';

describe('CountryCodeSelect', () => {
  const setup = async ({
    defaultValue = '+1',
    label = 'Country Code',
    ...rest
  }: DialCodeSelectProps & { ref?: React.Ref<HTMLSelectElement> }) => {
    render(
      <DialCodeSelect label={label} defaultValue={defaultValue} {...rest} />
    );

    return {
      $countryCodeSelector: await screen.findByRole('combobox'),
    };
  };

  it('should render all country codes as options', async () => {
    const label = 'test label';
    await setup({ label });
    const $countryCodeOptions = await screen.findAllByRole('option');
    const countryCodeOptions = $countryCodeOptions.map(
      ($countryCodeOption) => $countryCodeOption.textContent
    );

    expect(countryCodeOptions).toStrictEqual(countryDialCodes);
  });

  it('should have "tel-country-code" as the default autocomplete attribute', async () => {
    const label = 'test label';
    const { $countryCodeSelector } = await setup({ label });

    expect($countryCodeSelector).toHaveAttribute(
      'autocomplete',
      'tel-country-code'
    );
  });

  it('should render classname for CountryCodeSelect', async () => {
    const className = 'test-class-name';
    const testId = 'CountryCodeSelectTestId';
    const label = 'test label';
    await setup({ className, testId, label });
    const $countryCodeSelect = await screen.findByTestId(testId);

    expect($countryCodeSelect).toHaveClass(className);
    expect($countryCodeSelect).toHaveClass(
      ComponentClassName.CountryCodeSelect
    );
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLSelectElement>();
    const testId = 'CountryCodeSelectTestId';
    const label = 'test label';
    await setup({ testId, ref, label });

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('SELECT');
  });

  it('should have a hidden label by default', async () => {
    const testLabel = 'Hidden Label';
    await setup({ label: testLabel });

    expect(screen.getByText(testLabel)).toBeInTheDocument();
  });
});
