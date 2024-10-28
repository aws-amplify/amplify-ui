import React from 'react';

import { Field } from '../../components/Field';
import {
  ButtonElement,
  IconElement,
  InputElement,
  LabelElement,
  SpanElement,
} from '../../context/elements';

import { CLASS_BASE } from '../constants';

const BLOCK_NAME = `${CLASS_BASE}__search`;

const TOGGLE_BLOCK = 'toggle';

export const SearchControl = ({
  handleSearch,
}: {
  handleSearch: (term: string, includeSubfolders: boolean) => void;
}): React.JSX.Element => (
  <Field
    icon={<IconElement variant="search" />}
    className={BLOCK_NAME}
    variant="search"
  >
    <ButtonElement
      className={`${BLOCK_NAME}__button`}
      onClick={() => {
        handleSearch('denied', true);
      }}
    >
      {' '}
      Submit{' '}
    </ButtonElement>
    <SpanElement className={`${BLOCK_NAME}-${TOGGLE_BLOCK}__container`}>
      <InputElement
        className={`${BLOCK_NAME}-${TOGGLE_BLOCK}__checkbox`}
        type="checkbox"
      />
      <LabelElement className={`${BLOCK_NAME}-${TOGGLE_BLOCK}__label`} />
    </SpanElement>
  </Field>
);
