import React from 'react';

import { Field } from '../components/Field';
import {
  ButtonElement,
  IconElement,
  InputElement,
  LabelElement,
  SpanElement,
  ViewElement,
} from '../context/elements';
import { CLASS_BASE } from '../views/constants';
import { displayText } from '../displayText/en';

const BLOCK_NAME = `${CLASS_BASE}__search`;

const TOGGLE_BLOCK = 'toggle';

export interface SearchProps {
  onSearch: (term: string, includeSubfolders: boolean) => void;
}

export const Search = ({ onSearch }: SearchProps): React.JSX.Element => {
  const [term, setTerm] = React.useState('');
  const [subfoldersIncluded, setSubfoldersIncluded] = React.useState(false);

  // FIXME: focus not returning to input field after clear

  return (
    <ViewElement className={BLOCK_NAME}>
      <Field
        icon={
          <IconElement
            className={`${BLOCK_NAME}__field__icon`}
            variant="search"
          />
        }
        className={`${BLOCK_NAME}__field`}
        variant="search"
        onChange={(e) => setTerm(e.target.value)}
        placeholder={displayText.searchPlaceholder}
        value={term}
      >
        {term ? (
          <ButtonElement
            aria-label={displayText.searchClearLabel}
            className={`${BLOCK_NAME}__field-clear-button`}
            onClick={() => setTerm('')}
            variant="refresh"
          >
            <IconElement variant="dismiss" />
          </ButtonElement>
        ) : null}
      </Field>
      <ButtonElement
        className={`${BLOCK_NAME}__submit-button`}
        onClick={() => onSearch(term, subfoldersIncluded)}
      >
        Submit
      </ButtonElement>
      <SpanElement className={`${BLOCK_NAME}-${TOGGLE_BLOCK}__container`}>
        <InputElement
          checked={subfoldersIncluded}
          className={`${BLOCK_NAME}-${TOGGLE_BLOCK}__checkbox`}
          onChange={() => setSubfoldersIncluded(!subfoldersIncluded)}
          type="checkbox"
        />
        <LabelElement className={`${BLOCK_NAME}-${TOGGLE_BLOCK}__label`}>
          Include subfolders
        </LabelElement>
      </SpanElement>
    </ViewElement>
  );
};
