import {Text} from '@react-navigation/elements';
import {Image, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
export function ScanResultContainer(props) {
  console.log('baksana', props);
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <Image
          style={{flex: 1, backgroundColor: 'red '}}
          source={{uri: props.route.params.croppedImageUri.uri}}
          resizeMode="contain"
        />

        <Text>{props.route.params.result.text}</Text>
      </SafeAreaView>
    </View>
  );
}
