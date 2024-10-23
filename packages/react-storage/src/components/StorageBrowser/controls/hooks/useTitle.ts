import { TitleProps } from '../../composables/Title';
import { useControlsContext } from '../../controls/context';
import { CLASS_BASE } from '../../views/constants';

const BLOCK_NAME = `${CLASS_BASE}__title`;

export type UseTitle = () => {
  props?: TitleProps;
};

export const useTitle: UseTitle = () => {
  const { data } = useControlsContext();
  const { title } = data;

  return {
    props: {
      children: data?.title ? title : '',
      titleClassName: BLOCK_NAME,
    },
  };
};
