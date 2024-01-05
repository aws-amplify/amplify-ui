import { useRouter } from 'next/router';
import { FilterChildren } from '@aws-amplify/ui-react/internal';
import { isString } from '@aws-amplify/ui';

import { Framework } from '@/data/frameworks';

export interface InlineFilterProps {
  children: React.ReactNode;
  /**
   * List of platforms that will render this content. If the current platform
   * is not in this list then the content will not be rendered
   */
  filters: (Framework | 'all')[];
}

/**
 * Used to show content for filtered platforms
 * Usage:
 * <InlineFilter filters={['react', 'android']}>
 *  This content will only render for react and angular platforms
 * </InlineFilter>
 */
export const InlineFilter = ({ filters, children }: InlineFilterProps) => {
  const router = useRouter();
  const platform = router?.query?.platform;

  if (!isString(platform)) {
    return null;
  }

  return (
    <FilterChildren allowedFilters={filters} targetFilter={platform}>
      {children}
    </FilterChildren>
  );
};
