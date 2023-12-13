import { useRouter } from 'next/router';
import { Framework } from '@/data/frameworks';

interface InlineFilterProps {
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

  if (
    !filters ||
    !Array.isArray(filters) ||
    filters.length < 1 ||
    !router ||
    !router.query ||
    Array.isArray(router.query.platform) // platform array not supported by the filter so dropout if it is found
  ) {
    return null;
  }

  let filterKey = '';

  if ('platform' in router.query) {
    filterKey = router.query.platform;
  }

  const showContent = filters.some(
    (filter) => filter === filterKey || filter === 'all'
  );
  return showContent ? children : null;
};
