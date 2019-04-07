// React dependencies
import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  AsyncStorage
} from "react-native";
import { MaterialDialog } from "react-native-material-dialog";

// Custom React components
import CustomButton from "../../Components/UI/Button";
import CustomInput from "../../Components/UI/Input";

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import { buttons } from "../../styles/buttons-utils";
import { flex } from "../../styles/flex-utils";
import { fonts, align } from "../../styles/text-utils";
import { spacing } from "../../styles/spacing-utils";
import { border, radius, width } from "../../styles/border";

// Section
const Section = [spacing.smallBottom, spacing.smallTop];
const SignUpLabelSection = [spacing.mediumTop];

// Label
const FormLabel = [fonts.title3];
const SignUpLabel = [align.center, fonts.title3, spacing.smallBottom];

// Buttons
const Buttons = [buttons.large];

// Headings
const MainTitle = [fonts.title1];
const SubHeading = [fonts.title3];

// Inputs
const Outline = radius.small;
const OutlineColour = border.black;
const OutlineWidth = width.small;

//Modal
const ModalBody = [fonts.body];

// Promise based HTTP libarary
import axios from "axios";

export default class LoginScreen extends Component {
  state = {
    email: "",
    Password: "",

    errorModal: false,
    successModal: false,

    error: "",
    success: ""
  };

  componentDidMount() {
    console.log("The Login Screen Has Mounted");
  }

  // Sets the title within the header
  static navigationOptions = {
    title: "Login"
  };

  /* 
  handleSubmit:
  - This will submit the data via the NodeJS API endpoint 
  - When the data is sent to the API an alert message is sent and the user is redirected to the login screen
  
  Try block:
  - Set the state of the isUpdatModalVisible to false
  - Get the token
  - Send a request to the endpoint with the authorization token set
  - Set the success equal to the API's success message
  - Set the successModal to true

  catch block:
  - Set the error equal to the API's error message
  - Set the errorModal to true
  */
  handleSubmit = async (email, password) => {
    try {
      // API Domain name
      const API_URL = "https://radiant-dusk-41662.herokuapp.com";

      // Awaiting the response from the API endpoint
      const response = await axios.post(`${API_URL}/api/users/login`, {
        email: email, //this.state.email
        password: password // this.state.password
      });

      // Destructuring the state and storing them in variables
      // More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
      // The data object is destructured from the response object
      const { data } = response;
      console.log(data.token);

      // Store the token in AsyncStorage
      try {
        // setItem(key, data)
        await AsyncStorage.setItem("userToken", data.token);
      } catch (error) {
        // When the token can't be saved
        Alert.alert(error.message);
      }

      /* 
      success state is set to the data message
      successModal is set to the opposite value of the current state
      */
      this.setState({
        successModal: !this.state.successModal,
        success: data.message
      });
    } catch (error) {
      /* 
      Object Destructuring:
      - Destructuring the state and storing them in variables
      - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
      */
      const { data } = error.response;
      console.log(data.message);

      /* 
      error state is set to the data message
      errorModal is set to the opposite value of the current state
      */
      this.setState({
        error: data.message,
        errorModal: !this.state.errorModal
      });

      // Return to stop the process (This might be handled by axios, but not sure)
      return false;
    }
  };

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
    });
  };

  render() {
    /* 
    Object Destructuring:
    - Destructuring the state and storing them in variables
    - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
    */
    const {
      email,
      password,
      errorModal,
      successModal,
      error,
      success
    } = this.state;

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
        
          MaterialDialog:
          - Custom dialog component
          - This could be replaced by the Alert.alert() but the material dialog is more cleaner and easier to read as opposed to the 
          - For more information about this component visit https://github.com/hectahertz/react-native-material-dialog

          CustomInput and CustomButton
          - Refer to the indvidual components for a full breakdown
        */

      <ScrollView
        contentContainerStyle={[
          flex.justifyContentCenter,
          flex.flex,
          spacing.ContainerSpacing
        ]}
      >
        <KeyboardAvoidingView behavior="padding">
          {/* Success dialog */}
          <MaterialDialog
            title="Success"
            visible={successModal}
            onOk={() => this.props.navigation.navigate("authStack")}
            onCancel={() => this.props.navigation.navigate("authStack")}
          >
            <Text style={ModalBody}>{success}</Text>
          </MaterialDialog>

          {/* Error dialog */}
          <MaterialDialog
            title="Error"
            visible={errorModal}
            onOk={() => this.setState({ errorModal: !errorModal })}
            onCancel={() => this.setState({ errorModal: !errorModal })}
          >
            <Text style={ModalBody}>{error}</Text>
          </MaterialDialog>

          <View style={Section}>
            <Text style={MainTitle}>Welcome back</Text>
            <Text style={SubHeading}>Please sign in to continue</Text>
          </View>

          <View style={Section}>
            <Text style={FormLabel}>Email</Text>
            <CustomInput
              placeholder="Enter your email address"
              value={email}
              onChange={value => this.handleChange("email", value)}
              isSecure={false}
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
              onChange={value => this.handleChange("password", value)}
              isSecure={true}
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
              onClick={() => this.handleSubmit(email, password)}
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
              onClick={() => this.props.navigation.navigate("register")}
              accessibilityLabel="Register"
              disabled={false}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
