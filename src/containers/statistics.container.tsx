import {View} from 'react-native';
import {COLORS} from '../../constants/colors';

import {RadarChart} from 'react-native-gifted-charts';
export function StatisticsContainer() {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.background}}>
      <View style={{width: '100%', backgroundColor: COLORS.surface}}>
        <RadarChart
          data={[42, 40, 35, 40, 38, 55]}
          labels={['mat', 'türkçe', 'cog', 'Apr', 'May', 'Jun']}
          labelConfig={{stroke: COLORS.primary, fontWeight: 'bold'}}
          dataLabelsConfig={{stroke: 'brown'}}
          dataLabelsPositionOffset={0}
          maxValue={70}
        />
      </View>
    </View>
  );
}
