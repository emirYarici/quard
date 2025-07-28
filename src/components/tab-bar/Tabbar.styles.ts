import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/colors';

const stylez = StyleSheet.create({
  tabbarItem: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  tabbar: {
    position: 'absolute',
    justifyContent: 'space-between',
    alignSelf: 'center',
    bottom: 25,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    marginHorizontal: 20,
    borderRadius: 20,
    borderCurve: 'continuous',
    shadowColor: 'gray',
    shadowOffset: {width: 0, height: 10},
    shadowRadius: 10,
    shadowOpacity: 0.3,
    padding: 10,
  },
});

export default stylez;
