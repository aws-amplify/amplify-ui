import { splitPrimitiveProps } from '../splitPrimitiveProps';
import { AllStyleProps } from '../../types';

describe('splitPrimitiveProps', () => {
  it('should split props into style props and rest', () => {
    const styleProps: AllStyleProps = {
      backgroundColor: 'yellow',
      alignSelf: 'baseline',
      area: 'auto',
      basis: 'content',
      border: '1px solid black',
      borderRadius: '2px',
      alignContent: 'space-around',
      alignItems: 'baseline',
      columnGap: '2rem',
      direction: 'column-reverse',
      gap: '2rem',
      justifyContent: 'space-around',
      rowGap: '4rem',
      wrap: 'nowrap',
    };
    const restProps = {
      type: 'textarea',
      rows: '4',
      autoComplete: 'current-password',
      name: 'password',
      placeholder: 'Password',
    };

    const { styleProps: resultStyleProps, rest: resultRest } =
      splitPrimitiveProps({
        ...styleProps,
        ...restProps,
      });

    expect(resultRest).toEqual(restProps);
    expect(resultStyleProps).toEqual(styleProps);
  });
});
