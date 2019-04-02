import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class LiveSearchScreen extends Component {

  componentDidMount() {
    console.log("The Live Search Component Has Mounted");
  }

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