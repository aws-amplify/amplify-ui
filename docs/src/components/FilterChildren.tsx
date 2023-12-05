import { useRouter } from 'next/router';

export const FilterChildren = ({ children, filterKey = '' }) => {
  const router = useRouter();

  if ('platform' in router.query) {
    filterKey = router.query.platform as string;
  }

  const filteredChildren = children.filter(
    (el) => el.key === filterKey || el.key === 'all'
  );

  return filteredChildren;
};
