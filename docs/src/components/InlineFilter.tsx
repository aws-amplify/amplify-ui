import { useRouter } from 'next/router';
import { Framework } from '@/data/frameworks';

type InlineFilterProps = {
  children: React.ReactNode;
  /**
   * List of platforms that will render this content. If the current platform
   * is not in this list then the content will not be render
   */
  filters: (Framework | 'all')[];
};

/**
 *
 * Usage:
 * <InlineFilter filters={['react', 'android']}>
 *  This content will only render for react and angular platforms
 * </InlineFilter>
 */
export const InlineFilter = ({ filters, children }: InlineFilterProps) => {
  if (!filters || !Array.isArray(filters) || filters.length < 1) {
    return null;
  }
  const router = useRouter();

  let filterKey = '';

  if ('platform' in router.query) {
    filterKey = router.query.platform as string;
  }

  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i];
    if (filter === filterKey || filter === 'all') {
      return children;
    }
  }

  return null;
};
