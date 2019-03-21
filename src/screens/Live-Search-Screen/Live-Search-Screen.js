import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class LiveSearchScreen extends Component {

  static navigationOptions = {
    title: 'Live search',
  };


  render() {
    return (
      <View>
        <Text>
            Live Search Component
        </Text>
      </View>
    );
  }
}