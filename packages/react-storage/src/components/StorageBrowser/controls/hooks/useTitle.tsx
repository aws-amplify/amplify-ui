import { TitleProps } from '../../composables/Title';
import { useControlsContext } from '../../controls/context';

type UseTitle = () => TitleProps;

export const useTitle: UseTitle = () => {
  const { data } = useControlsContext();

  return {
    title: data ? data.title : undefined,
  };
};
