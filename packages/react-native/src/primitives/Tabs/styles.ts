import { StyleSheet } from 'react-native';

import { TabsStyles } from './types';

const SELECTED_COLOR = '#047d95';

export const styles: TabsStyles = StyleSheet.create({
  container: { width: '100%' },
  tabsContainer: {
    flexDirection: 'row',
  },
  tab: {
    backgroundColor: '#fafafa',
    padding: 10,
    flexBasis: '50%',
    borderTopWidth: 3,
    borderTopColor: '#dcdee0',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#304050',
  },
  selected: {
    borderTopColor: SELECTED_COLOR,
    color: SELECTED_COLOR,
    backgroundColor: '#fff',
  },
});
