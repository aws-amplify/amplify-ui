import { TitleProps } from '../../composables/Title';
import { useControlsContext } from '../../controls/context';

export const useTitle = (): TitleProps => {
  const { data } = useControlsContext();

  return {
    title: data?.title,
  };
};
