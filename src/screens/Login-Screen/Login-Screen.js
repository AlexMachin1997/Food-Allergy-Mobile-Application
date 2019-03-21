// React dependencies 
import React, {Component} from 'react';
import {Text, View, ScrollView, TextInput, KeyboardAvoidingView, Alert} from 'react-native';

// Custom React components
import CustomButton from '../../Components/UI/Button';
import CustomInput from '../../Components/UI/Input';

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {buttons} from '../../styles/buttons-utils';
import {flex} from '../../styles/flex-utils';
import {fonts, align} from '../../styles/text-utils';
import {spacing} from '../../styles/spacing-utils';
import {border, radius, width} from '../../styles/border';


// Sections
const Section = [spacing.smallBottom, spacing.smallTop]
const SignUpLabelSection = [spacing.mediumTop];

// Labels 
const FormLabel = [fonts.title3]
const SignUpLabel = [align.center, fonts.title3, spacing.smallBottom]

// Buttons
const Buttons = [buttons.large]

// Headings 
const MainTitle = [fonts.title1];
const SubHeading = [fonts.title3]

// Inputs 
const Outline = radius.small;
const OutlineColour = border.black;
const OutlineWidth = width.small;

export default class LoginScreen extends Component {

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
  handleSubmit:
  - No params required
  */
  handleSubmit = () => {
    this.props.navigation.navigate('authStack');    
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
        
          CustomButton and CustomInput
          - Check the components for more information
        */
         
        <ScrollView contentContainerStyle={[flex.justifyContentCenter,flex.flex, spacing.ContainerSpacing]}>
          <KeyboardAvoidingView behavior="padding">    

            <View style={Section}>
              <Text style={MainTitle}>Welcome back</Text>
              <Text style={SubHeading}>Please sign in to continue</Text>
            </View>

            <View style={Section}>
              <Text style={FormLabel}>Email</Text>
              <CustomInput
                placeholder="Enter your email address"
                value={email}
                onChange = {(value) => this.handleChange('email', value)}
                secureTextEntry={false}
                style={[Outline, OutlineColour, OutlineWidth]}
                Ismultiline={true}
                keyboardType="email-address"
              />   
            </View>

            <View style={Section}>
              <Text style={FormLabel}>Password</Text>
              <CustomInput
                placeholder="Enter your password"
                value={password}
                onChange = {(value) => this.handleChange('password', value)}
                secureTextEntry={true}
                style={[Outline, OutlineColour, OutlineWidth]}
                Ismultiline={true}
              />    
            </View>

            <View style={Section}>
              <CustomButton 
                text="Login" 
                mode="contained" 
                compact={true} 
                colour="#0277bd" 
                styling={Buttons} 
                onClick={this.handleSubmit} 
                label="Login"
                disabled={!email || !password}
              />       
            </View>

            <View style={SignUpLabelSection}>
              <Text style={SignUpLabel}> Don't have an account ? </Text>       
              <CustomButton 
              text="Register" 
              mode="contained" 
              compact={true} 
              colour="#0277bd" 
              styling={Buttons} 
              onClick={() => this.props.navigation.navigate('register')} 
              accessibilityLabel="Register"
              disabled={false}
              />    
            </View>

          </KeyboardAvoidingView>
        </ScrollView>
    );
  }
}