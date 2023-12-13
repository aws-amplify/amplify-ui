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

  const platform = router?.query?.platform;
  
  const showContent =
    typeof platform === 'string' &&
    Array.isArray(filters) &&
    filters.some((filter) => filter === platform || filter === 'all');
  return showContent ? children : null;
};
