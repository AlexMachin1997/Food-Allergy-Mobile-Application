import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

class Register extends Component {
  render() {
    return (
      <View>
        <Text>
            Register Component
        </Text>
        <Button
          onPress={() => this.props.navigation.navigate('Login')}
          title="Go to login"
          color="#841584"
        />
      </View>
    );
  }
}

export default Register;