// React dependencies 
import React, {Component} from 'react';
import {Text, View, ScrollView, TextInput, KeyboardAvoidingView, Alert} from 'react-native';

// User-Interface Libaries
import {Button} from 'react-native-paper';


/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {buttons} from '../styles/buttons-utils';
import {flex} from '../styles/flex-utils';
import {fonts, colours, align} from '../styles/text-utils';
import {spacing} from '../styles/spacing-utils';
import {images} from '../styles/image-utils';
import {border, radius, width} from '../styles/border'


// Sections
const section = [spacing.smallBottom, spacing.smallTop]

// Labels 
const formLabel = [fonts.title3]
const signUpLabel = [align.center, fonts.title3, spacing.smallBottom]

// Buttons
const button = [buttons.large]

// Headings 
const MainTitle = [fonts.title1];
const SubHeading = [fonts.title3]

// Inputs 
const outline = radius.small;
const outlineColour = border.black;
const outlineWidth = width.small;

class Login extends Component {

  // Login components own internal state
  state = {
    email: "",
    Password: "",
  };

  // Sets the title within the header
  static navigationOptions = {
    title: 'Login',
  };

  /* 
  isEmpty:
  - Checks if the users email or password is not falsy (empty values, empty string = false )
  */
  isEmpty = ({email, password}) => {
    return (
      !email.length || 
      !password.length
    )
  }

  /* 
  handleSubmit:
  - No params required 
  - Checks the input isn't empty
  */
  handleSubmit = () => {

    if(this.isEmpty(this.state)) {
      Alert.alert("Looks like some of the required details are missing");
      return false 
    }

    this.props.navigation.navigate('authStack');    
    return true
  }

  /* 
  handleChange:
  - Takes two params an id and value 
  - the id is the destrcutred variable named which is referenced via a string
  - value is the value of the input field the function is being used on
  -Sets the inputs own internal state equal to the state provided
  */
  handleChange = (id, value) => {
    this.setState({
      [id]: value
    })
  }

  render() {

    // Destructuring the state and storing them in variables
    // More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
    const {email, password} = this.state;
  
    return (
      
        /* 
          Component overviews with resources:

          ScrollView:
          - Allows content to be scrolled in the event the content exceeds the screen height.
          - Often in very rare cases content will overflow the screen but not actually enable the functionlaity. To solve this add an additional view to the bottom with a fixed hieght
          - For more information about this component visit https://facebook.github.io/react-native/docs/scrollview#docsNav

          KeyboardAvoid View:
          - Enable the keyboard functionlaity to be controlled
          - In Android/App/src/Main/AndroidManifest.xml the property android:windowSoftInputMode is set to "adjustPan" to prevent content being pushed off screen
          - For more information about this component this visit https://facebook.github.io/react-native/docs/keyboardavoidingview#docsNav 

          View:
          - Is the wrapper, it's the equivalent of a div tag in web development the only difference being React-Natives is more messy
          - For more information about this component visit https://facebook.github.io/react-native/docs/view
                    
          Text:
          - Renders a string of text, its the equivalent of a p tag in web development
          - For more information about this component visit https://facebook.github.io/react-native/docs/text 

          TextInput:
          - Is a text input field with numerous props to use, its the equivalent of input tag in web development 
          - For additional information about the props allowed visist https://facebook.github.io/react-native/docs/textinput
          
          Button (react-native paper):
          - Pre-made material button
          - Accepts a number of props, though for this project only mode, compact, style, color, onPress and accessabiltyLabel were used
          - For more information about this component visit https://callstack.github.io/react-native-paper/button.html       
        */
         
        <ScrollView contentContainerStyle={[flex.justifyContentCenter,flex.flex, spacing.ContainerSpacing]}>
          <KeyboardAvoidingView behavior="padding">    

            <View style={section}>
              <Text style={MainTitle}>Welcome back</Text>
              <Text style={SubHeading}>Please sign in to continue</Text>
            </View>

            <View style={section}>
              <Text style={formLabel}>Email</Text>
              <TextInput
                placeholder="Enter your email address"
                value={email}
                onChangeText = {(value) => this.handleChange('email', value)}
                keyboardType="email-address"
                style={[outline, outlineColour, outlineWidth]}
                multiline={true} 
              />            
            </View>

            <View style={section}>
              <Text style={formLabel}>Password</Text>
              <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText = {(value) => this.handleChange('password', value)}
                secureTextEntry={true}
                style={[outline, outlineColour, outlineWidth]}
                multiline={true}
              />   
            </View>

            <View style={section}>
              <Button mode="contained" compact={true} style={button} color="#0277bd" onPress={this.handleSubmit} accessibilityLabel="Sign up for a free account">
                Login
              </Button>          
            </View>

            <View style={[spacing.mediumTop]}>
              <Text style={signUpLabel}> Don't have an account ? </Text>       
              <Button mode="contained" compact={true}  style={button} color="#0277bd" onPress={()=> {this.props.navigation.navigate('register')}} accessibilityLabel="Sign up for a free account">
                Sign up
              </Button>  
            </View>

          </KeyboardAvoidingView>
        </ScrollView>
    );
  }
}

export default Login;