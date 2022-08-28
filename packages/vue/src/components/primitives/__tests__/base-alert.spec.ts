import BaseAlert from '../base-alert.vue';
import { components } from '../../../../global-spec';
import { render } from '@testing-library/vue';
import { I18n } from 'aws-amplify';

describe('Base Alert', () => {
  it('Base Alert Exists', () => {
    const wrapper = render(BaseAlert, {
      global: {
        components,
      },
    });

    expect(wrapper).toBeTruthy();
  });

  it('shows correct default accessible label', () => {
    const { queryByRole } = render(BaseAlert, {
      global: {
        components,
      },
    });

    const defaultButton = queryByRole('button');
    expect(defaultButton?.getAttribute('aria-label')).toBe('Dismiss alert');
  });

  it('shows correct default translated label', () => {
    const translatedAriaLabel = 'Translated dismiss alert';
    I18n.putVocabulariesForLanguage('en', {
      'Dismiss alert': translatedAriaLabel,
    });
    const { queryByRole } = render(BaseAlert, {
      global: {
        components,
      },
    });

    const defaultButton = queryByRole('button');
    expect(defaultButton?.getAttribute('aria-label')).toBe(translatedAriaLabel);
  });

  it('should set aria-hidden to be true on dismiss button decorative icon', () => {
    const { queryByRole } = render(BaseAlert, {
      global: {
        components,
      },
    });
    const defaultButton = queryByRole('button');
    const icon = defaultButton?.children[0];
    expect(icon?.getAttribute('aria-hidden')).toBe('true');
  });
});
