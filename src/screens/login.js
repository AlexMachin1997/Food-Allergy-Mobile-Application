import React, {Component} from 'react';
import {Text, View, Button} from 'react-native';

class Login extends Component {
  render() {
    return (
      <View>
        <Text>
            Login Component
        </Text>
        <Button
          onPress={() => this.props.navigation.navigate('Register')}
          title="Go to Register"
          color="#841584"
        />
      </View>
    );
  }
}


export default Login;