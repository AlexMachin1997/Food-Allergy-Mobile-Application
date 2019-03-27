//React dependencies
import React, { Component } from 'react'
import {ScrollView, Text} from 'react-native'
import { MaterialDialog } from 'react-native-material-dialog';

// Custom React components
import ConfirmationMessage from '../../UI/ConfirmationMessage';
import ConfirmationAction from '../../UI/ConfirmationAction';


import axios from 'axios';

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {flex} from '../../../styles/flex-utils';
import {fonts} from '../../../styles/text-utils';

// Section styles
const ConfirmationSection = [flex.alignItemsCenter, flex.justifyContentCenter, flex.flex];

//Modal styles
const ModalBody = [fonts.body]

export default class ConfirmationScreen extends Component {

  // Components internal state 
  state = {
    isRegisterModalVisible: false,
    errorModal: false,
    successModal: false,
    error: "",
    success: ""
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
  addData = async (name, email, password, allergies) => {
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

      // Destructuring the state and storing them in variables
      // More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
      // Response contains data, its destrcuted from the response object
      const {data} = response;
      
      // Data from the response
      // The first data object is the response from axios
      // The second data object is the data provided by the API e.g. name, email, password etc
      console.log(data.data);

      /* 
      success state is set to the data message
      successModal is set to the opposite value of the current state
      */
      this.setState({
        success: data.message,
        successModal: !this.state.successModal
      });
    }
    catch(error) {        


      // Destructuring the state and storing them in variables
      // More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment         
      // Response contains data, its destrcuted from the error response object
      const {data} = error.response;

      // Log the data message and data returned
      console.log(data.message);
      console.log(data);

      /* 
      error state is set to the data message
      errorModal is set to the opposite value of the current state
      */
      this.setState({
        error: data.message,
        errorModal: !this.state.errorModal
      });

      // Return false to prevent the request from continuting
      return false;
    }
  }

  /* 
  goToLoginScreen:
  - Call the method goToLogin method which passed down via props
  - Set the successModal to false
  */
  goToLoginScreen = () => {
    this.props.goToLogin();
    this.setState({ successModal: !this.state.successModal })
  }


  render() {

    // Destructuring the state and storing them in variables
    // More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     

    // Destructure the values from the values object which is passed down via the props, now then can be refered to via variables 
    const {values: { name, email, password, allergies }} = this.props;

    // Destructure the state so they can be refered to via varialbes
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
        - It accepts only one prop, text which is a string. Its the message which gets displayed below the icon
        
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
          onOk={() => this.addData(name,email, password, allergies)}
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
