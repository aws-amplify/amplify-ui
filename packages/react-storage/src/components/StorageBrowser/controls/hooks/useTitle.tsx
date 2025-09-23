import type { TitleProps } from '../../components/composables/Title';
import { useControlsContext } from '../context';

export const useTitle = (): TitleProps => {
  const { data } = useControlsContext();

  return {
    title: data?.title,
  };
};
