import { StyleSheet } from 'react-native';

import { TabsStyles } from './types';

const SELECTED_COLOR = '#047d95';

export const styles: TabsStyles = StyleSheet.create({
  readonly: {
    opacity: 1,
  },
  tabList: {
    flexDirection: 'row',
    width: '100%',
  },
  tab: {
    backgroundColor: '#e1e1e1',
    borderTopColor: '#dcdee0',
    borderTopWidth: 2,
    flexBasis: 0,
    flexGrow: 1,
    padding: 12,
  },
  tabText: {
    color: '#304050',
    fontSize: 16,
    fontWeight: '700',
  },
  selected: {
    backgroundColor: '#fff',
    borderTopColor: SELECTED_COLOR,
    color: SELECTED_COLOR,
  },
});
