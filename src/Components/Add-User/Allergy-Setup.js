import React, { Component } from 'react'
import {Text, View} from 'react-native'
import {Button} from 'react-native-paper'

export default class AllergySetup extends Component {

  goForward = e => {
    e.preventDefault();
    this.props.forward();
  };

  goBack = e => {
    e.preventDefault();
    this.props.back();
  };

  render() {
    return (
        <View>
            <Text> Allergy Setup </Text>

            <Button icon="add-a-photo" mode="contained" onPress={this.goForward}>
              Next
            </Button>

            <Button icon="add-a-photo" mode="contained" onPress={this.goBack}>
              Back
            </Button>
        </View>

        
    )
  }
}