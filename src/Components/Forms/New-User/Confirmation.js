//React dependencies
import React, { Component } from 'react'
import {ScrollView, Text, AsyncStorage} from 'react-native'
import { MaterialDialog } from 'react-native-material-dialog';

// Custom React components
import ConfirmationMessage from '../../UI/ConfirmationMessage';
import ConfirmationAction from '../../UI/ConfirmationAction';

// Promose based HTTP Requests library 
import axios from 'axios';

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {flex} from '../../../styles/flex-utils';
import {fonts} from '../../../styles/text-utils';

// Section styles
const ConfirmationSection = [flex.justifyContentCenter, flex.flex];

//Modal styles
const ModalBody = [fonts.body]

export default class ConfirmationScreen extends Component {

  state = {
    isRegisterModalVisible: false,
    errorModal: false,
    successModal: false,
    error: "",
    success: ""
  }


  componentDidMount(){
    console.log("The Registration Confirmation Component Has Mounted");
    console.log("The avaliable values are:");
    console.log(this.props.values)
  }
  /* 
  goBack: 
  - Decrements the parents step state by 1 by referencing the back method passed in via props
  - Finds the component associated to the number and re-renders
  */
  goBack = e => {
    e.preventDefault();
    this.props.back();
  };

/* 
  addData:
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
  addData = async (name, email, password, allergies, avaliableAllergies) => {
    try {

      // Set the isRegisterModalVisiable to false
      this.setState({isRegisterModalVisible: !this.state.isRegisterModalVisible})

      // API Domain name
      const API_URL = 'https://radiant-dusk-41662.herokuapp.com';

      // Awaiting the response from the API endpoint
      const response = await axios.post(`${API_URL}/api/users/register`, {
          "name": name,
          "email": email,
          "password": password,
          "allergies": allergies
      });

      /*
      Destructuring response:
      - Destructuring the state and storing them in variables
      - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
      - Destructuring the data object from the response. Data is the response from axios, to access the custom data use data.data, to acces the API message data.message
      */
      const {data} = response;
      
      // Logs the data message from the response 
      console.log("State of data sent to the  /api/users PUT request");
      console.log(data); // log the actual data use data.data (The custom is nested within the axios data)

      /* 
      Updating the success state:
      - success state is set to the data message
      - successModal is set to the opposite value of the current state
      */
      console.log("The success state has been updated")
      this.setState({
        success: data.message,
        successModal: !this.state.successModal
      });

      await AsyncStorage.setItem('avaliableAllergies', JSON.stringify(avaliableAllergies));
    }

    catch(error) {        
  
    /*
    Destructuring response:
    - Destructuring the state and storing them in variables
    - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
    - Destructuring the data object from the error response. data contains the data fr
    */
    const {data} = error.response;

    // Log the data message and data returned
    console.log("Error message from /api/users POST request")
    console.log(data.message);

    /* 
    Updating the error state:
    - error state is set to the data message
    - errorModal is set to the opposite value of the current state, for example its false by default this would turn it to true
    */ 
    console.log("The error state has been updated")
    this.setState({
      error: data.message,
      errorModal: !this.state.errorModal
    });

    // Return false to prevent the request from continuting, axios may or may not handle this.
    return false;
    }
  }

  /* 
  goToLoginScreen:
  - Call the method goToLogin method which passed down via props
  - Set the successModal to false
  */
  goToLoginScreen = () => {
    console.log("Going to the login screen");
    this.props.goToLogin();
    this.setState({ successModal: !this.state.successModal })
  }


  render() {

    /*
    Destructuring response:
    - Destructuring the state and storing them in variables
    - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
    - Destructure the values from the values object which is passed down via the props, now then can be refered to via variables 
    - Destructure the state so they can be refered to via varialbes
    */
    const {values: { name, email, password, avaliableAllergies, allergies }} = this.props;
    const {isRegisterModalVisible, success, successModal, error, errorModal} = this.state;

    return (

      /* 
        Component overviews with resources:

        ScrollView:
        - Allows content to be scrolled in the event the content exceeds the screen height.
        - Often in very rare cases content will overflow the screen but not actually enable the functionlaity. To solve this add an additional view to the bottom with a fixed hieght
        - For more information about this component visit https://facebook.github.io/react-native/docs/scrollview#docsNav

        MaterialDialog:
        - Custom dialog component
        - This could be replaced by the Alert.alert() but the material dialog is more cleaner and easier to read as opposed to the 
        - For more information about this component visit https://github.com/hectahertz/react-native-material-dialog

        ConfirmationMessage:
        - It accepts only one prop, text which is a string. It's the message which gets displayed below the icon
        
        ConfirmationAction:
        - It renders the confirmation actions, they are the back button and update button
      */
      
      <ScrollView contentContainerStyle={ConfirmationSection}>
        
        {/* Error dialog */}
        <MaterialDialog
          title="Error"
          visible={errorModal}
          onOk={() => this.setState({ errorModal: !errorModal })}
          onCancel={() => this.setState({ errorModal: !errorModal })}>
          <Text style={ModalBody}>
           {error} 
          </Text>
        </MaterialDialog>

        {/* Success dialog */}
        <MaterialDialog
          title="Success"
          visible={successModal}
          onOk={() => this.goToLoginScreen()}
          onCancel={() => this.setState({ successModal: !successModal })}>
          <Text style={ModalBody}>
           {success} 
          </Text>
        </MaterialDialog>

        {/* Account creation confirmation dialog */}
        <MaterialDialog
          title="Account creation"
          visible={isRegisterModalVisible}
          onOk={() => this.addData(name,email, password, allergies, avaliableAllergies)}
          onCancel={() => this.setState({ isRegisterModalVisible: !this.state.isRegisterModalVisible })}>
          <Text style={ModalBody}>
           You are about to register your account, would you like to continue? 
          </Text>
        </MaterialDialog>

        <ConfirmationMessage text="Your details are ready to be submitted."/>
        <ConfirmationAction action={() => { this.setState({isRegisterModalVisible: !isRegisterModalVisible}) }} goBack={this.goBack}/>
      </ScrollView>
    )
  }
}
