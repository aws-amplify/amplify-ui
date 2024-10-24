import { TitleProps } from '../../composables/Title';
import { useControlsContext } from '../../controls/context';

export type UseTitle = () => {
  props?: TitleProps;
};

export const useTitle: UseTitle = () => {
  const { data } = useControlsContext();

  return {
    props: {
      title: data?.title,
    },
  };
};
