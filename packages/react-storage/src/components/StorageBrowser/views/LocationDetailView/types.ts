import { LocationData } from '../../actions';

export interface LocationDetailViewProps {
  className?: (defaultClassName: string) => string;
  onActionSelect?: (type: string) => void;
  onExit?: () => void;
  onNavigate?: (destination: LocationData) => void;
}
