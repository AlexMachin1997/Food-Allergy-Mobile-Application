import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class ShoppingListScreen extends Component {

  static navigationOptions = {
    title: 'Shopping list',
  };

  render() {
    return (
      <View>
        <Text>
            Shopping List Component
        </Text>
      </View>
    );
  }
}