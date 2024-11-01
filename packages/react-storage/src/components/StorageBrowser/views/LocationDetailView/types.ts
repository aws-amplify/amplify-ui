import { ListViewProps } from '../types';

export interface LocationDetailViewProps extends ListViewProps {
  onActionSelect?: (type: string) => void;
  onExit?: () => void;
}
