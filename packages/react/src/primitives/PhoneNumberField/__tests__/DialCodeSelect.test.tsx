import * as React from 'react';

import { render, screen } from '@testing-library/react';
import { dialCodes } from '@aws-amplify/ui';

import { DialCodeSelect } from '../DialCodeSelect';
import { ComponentClassNames } from '../../shared/constants';

describe('DialCodeSelect', () => {
  const setup = async ({
    defaultValue = '+1',
    label = 'Dial Code',
    ...rest
  }: Partial<typeof DialCodeSelect['defaultProps']>) => {
    render(
      <DialCodeSelect label={label} defaultValue={defaultValue} {...rest} />
    );

    return {
      $dialCodeSelector: await screen.findByRole('combobox'),
    };
  };

  it('should render all dial codes as options', async () => {
    await setup({});
    const $dialCodeOptions = await screen.findAllByRole('option');
    const dialCodeOptions = $dialCodeOptions.map(
      ($dialCodeOption) => $dialCodeOption.textContent
    );

    expect(dialCodeOptions).toMatchInlineSnapshot(
      dialCodes,
      `
      Array [
        "+1",
        "+7",
        "+20",
        "+27",
        "+30",
        "+31",
        "+32",
        "+33",
        "+34",
        "+36",
        "+39",
        "+40",
        "+41",
        "+43",
        "+44",
        "+45",
        "+46",
        "+47",
        "+48",
        "+49",
        "+51",
        "+52",
        "+53",
        "+54",
        "+55",
        "+56",
        "+57",
        "+58",
        "+60",
        "+61",
        "+62",
        "+63",
        "+64",
        "+65",
        "+66",
        "+81",
        "+82",
        "+84",
        "+86",
        "+90",
        "+91",
        "+92",
        "+93",
        "+94",
        "+95",
        "+98",
        "+212",
        "+213",
        "+216",
        "+218",
        "+220",
        "+221",
        "+222",
        "+223",
        "+224",
        "+225",
        "+226",
        "+227",
        "+228",
        "+229",
        "+230",
        "+231",
        "+232",
        "+233",
        "+234",
        "+235",
        "+236",
        "+237",
        "+238",
        "+239",
        "+240",
        "+241",
        "+242",
        "+243",
        "+244",
        "+245",
        "+246",
        "+248",
        "+249",
        "+250",
        "+251",
        "+252",
        "+253",
        "+254",
        "+255",
        "+256",
        "+257",
        "+258",
        "+260",
        "+261",
        "+262",
        "+263",
        "+264",
        "+265",
        "+266",
        "+267",
        "+268",
        "+269",
        "+290",
        "+291",
        "+297",
        "+298",
        "+299",
        "+345",
        "+350",
        "+351",
        "+352",
        "+353",
        "+354",
        "+355",
        "+356",
        "+357",
        "+358",
        "+359",
        "+370",
        "+371",
        "+372",
        "+373",
        "+374",
        "+375",
        "+376",
        "+377",
        "+378",
        "+379",
        "+380",
        "+381",
        "+382",
        "+385",
        "+386",
        "+387",
        "+389",
        "+420",
        "+421",
        "+423",
        "+500",
        "+501",
        "+502",
        "+503",
        "+504",
        "+505",
        "+506",
        "+507",
        "+508",
        "+509",
        "+537",
        "+590",
        "+591",
        "+593",
        "+594",
        "+595",
        "+596",
        "+597",
        "+598",
        "+599",
        "+670",
        "+672",
        "+673",
        "+674",
        "+675",
        "+676",
        "+677",
        "+678",
        "+679",
        "+680",
        "+681",
        "+682",
        "+683",
        "+685",
        "+686",
        "+687",
        "+688",
        "+689",
        "+690",
        "+691",
        "+692",
        "+850",
        "+852",
        "+853",
        "+855",
        "+856",
        "+872",
        "+880",
        "+886",
        "+960",
        "+961",
        "+962",
        "+963",
        "+964",
        "+965",
        "+966",
        "+967",
        "+968",
        "+970",
        "+971",
        "+972",
        "+973",
        "+974",
        "+975",
        "+976",
        "+977",
        "+992",
        "+993",
        "+994",
        "+995",
        "+996",
        "+998",
      ]
    `
    );
  });

  it('should have "tel-dial-code" as the default autocomplete attribute', async () => {
    const { $dialCodeSelector } = await setup({});

    expect($dialCodeSelector).toHaveAttribute('autocomplete', 'tel-dial-code');
  });

  it('should render classname for DialCodeSelect', async () => {
    const className = 'test-class-name';
    const testId = 'DialCodeSelectTestId';
    await setup({ className, testId });
    const $dialCodeSelect = await screen.findByTestId(testId);

    expect($dialCodeSelect).toHaveClass(className);
    expect($dialCodeSelect).toHaveClass(ComponentClassNames.DialCodeSelect);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLSelectElement>();
    const testId = 'DialCodeSelectTestId';
    await setup({ testId, ref });

    await screen.findByTestId(testId);
    expect(ref.current.nodeName).toBe('SELECT');
  });

  it('should have a hidden label by default', async () => {
    const testLabel = 'Hidden Label';
    await setup({ label: testLabel });

    expect(screen.getByText(testLabel)).toBeInTheDocument();
  });
});
