import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class BarcodeScreen extends Component {

  static navigationOptions = {
    headerTitle: 'Barcode Search',
  };


  render() {
    return (
      <View>
        <Text>
            Barcode Component
        </Text>
      </View>
    );
  }
}
