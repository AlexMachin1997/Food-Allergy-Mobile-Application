import React, {Component} from 'react';
import {Text, View, ScrollView, TextInput, KeyboardAvoidingView, Alert} from 'react-native';

import {Button} from 'react-native-paper';


import {buttons} from '../styles/buttons-utils';
import {flex} from '../styles/flex-utils';
import {fonts, colours, align} from '../styles/text-utils';
import {spacing} from '../styles/spacing-utils';
import {images} from '../styles/image-utils';

import AppIcon from '../assets/Icon.png';

const section = [spacing.smallBottom, spacing.smallTop]

// Label
const InputLabel = [fonts.title3]
const SignUpLabel = [align.center, fonts.title3, spacing.smallBottom]

const button = [buttons.large]

class Login extends Component {

  // Login components own internal state
  state = {
    email: "",
    Password: "",
    emailError: "The email field cannot be empty",
    passwordError: "The password field cannot be empty",
  };

  // Sets the title within the header
  static navigationOptions = {
    title: 'Login',
  };

  // This will handle the POST request to the API when they are integrated together
  handleSubmit = () => {

    if(this.state.email == "" || this.state.password == "") {
      Alert.alert("Looks like your missing some details");
    } else {
      this.props.navigation.navigate('authStack');
    }
  }

  render() {

    const {email, password} = this.state;

    return (
        
        <ScrollView contentContainerStyle={[flex.justifyContentCenter,flex.flex, spacing.ContainerSpacing]}>
          <KeyboardAvoidingView behavior="padding">    
            <View style={section}>
              <Text style={InputLabel}>Email</Text>
              <TextInput
                placeholder="Enter your email address"
                value={email}
                onChangeText={email => this.setState({ email })}
                keyboardType="email-address"
              />
            </View>
            <Text>{email}</Text>


            <View style={section}>
              <Text style={InputLabel}>Password</Text>
              <TextInput
                placeholder="Enter your email address"
                value={password}
                onChangeText={password => this.setState({ password })}
                secureTextEntry={true}
              />   
            </View>

            <View style={section}>
              <Button mode="contained" compact={true} style={button} color="#0277bd" onPress={this.handleSubmit} accessibilityLabel="Sign up for a free account">
                Login
              </Button>          
            </View>

            <View style={[spacing.mediumTop]}>
              <Text style={SignUpLabel}> Don't have an account ? </Text>       
              <Button mode="contained" compact={true}  style={button} color="#0277bd" onPress={()=> {this.props.navigation.navigate('Register')}} accessibilityLabel="Sign up for a free account">
                Sign up
              </Button>  
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
    );
  }
}

export default Login;