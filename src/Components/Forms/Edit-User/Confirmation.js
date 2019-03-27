//React dependencies
import React, { Component } from 'react'
import {ScrollView, Text, AsyncStorage} from 'react-native'


// React-Native Material-Dialog library
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
const ConfirmationSection = [flex.alignItemsCenter, flex.justifyContentCenter, flex.flex];

//Modal styles
const ModalBody = [fonts.body];


export default class ConfirmationScreen extends Component {

  // Components internal state 
  state = {
    isUpdateModalVisible: false,
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
  UpdateData:
  - This will submit the data via the NodeJS API endpoint 
  - When the data is sent to the API an alert message is sent and the user is redirected to the search screen
  
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
  updateData = async (name, email, phoneNumber, allergies) => {
     
    try {
      
      // Hide the condifrmation modal 
      this.setState({ isUpdateModalVisible: !this.state.isUpdateModalVisible })

      // Get the token from storage, wait for the promise to resolve
      const token = await AsyncStorage.getItem('userToken');

      // API Domain name
      const API_URL = 'https://radiant-dusk-41662.herokuapp.com';
      
      // Awaiting the response from the API endpoint and set the header to have an authorization token
      const response = await axios.put(`${API_URL}/api/users`,{
              "name": name,
              "email": email,
              "phone": phoneNumber,
              "allergies": allergies
      }, 
      {
          headers: {
              "Accept": "application/json",
              "Content-type": "application/json",
              "Authorization": token
          }
      });

      // Destructuring the state and storing them in variables
      // More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
      // Destructure the data object from the response object so they can be refered to via varialbes
      const {data} = response;

      // Log the data object
      console.log(data);
    
      /* 
      success state is set to the data message
      successModal is set to the opposite value of the current state
      */
      this.setState({
        success: data.message,
        successModal: !this.state.successModal
      });

      // Update AsyncStorage with the new values from the update form props
      const userData = {
        name: data.data.name,
        email: data.data.email,
        phoneNumber: data.data.phone,
        allergies: data.data.allergies
      }

      console.log(userData);
      await AsyncStorage.setItem('userData',JSON.stringify(userData));

    }
    
    catch(error) {

      // Destructuring the state and storing them in variables
      // More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
      // Destructure the data object from the error response object so they can be refered to via varialbes
      const {data} = error.response; 
      console.log(data)
      
      /* 
      error state is set to the data message
      errorModal is set to the opposite value of the current state
      */
      this.setState({
        error: data, // Could use data.error but when the users token is invalid no message would be shown (Look for the solution in the error modal)
        errorModal: !this.state.errorModal
      });

      // Return false to prevent the request from continuting
      return false;
    }
  }

  /* 
  goToMainScreen:
  - Call the method goToSearch method which passed down via props
  - Set the successModal to false
  */
  goToMainScreen = () => {
    this.props.goToSearch();
    this.setState({ successModal: !this.state.successModal });
  }

  render() {

    // Destructuring the state and storing them in variables
    // More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
   
    // Destructure the values from the values object which is passed down via the props, now then can be refered to via variables 
    const {values: { name, email,phoneNumber, allergies }} = this.props;

    // Destructure the state so they can be refered to via varialbes
    const {isUpdateModalVisible, errorModal, successModal , error , success} = this.state;

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
          onOk={() => this.setState({errorModal: !errorModal})}
          onCancel={() => this.setState({ errorModal: !errorModal })}>
          <Text style={ModalBody}>
            {error.error ? error.error : "Unauthorized access, please logout"}
          </Text>
        </MaterialDialog>

        {/* Success dialog */}
        <MaterialDialog
          title="Success"
          visible={successModal}
          onOk={() => this.goToMainScreen()}
          onCancel={() => this.setState({ successModal: !successModal })}>
          <Text style={ModalBody}>
            {success}
          </Text>
        </MaterialDialog>

        {/* Update confirmation dialog */}
        <MaterialDialog
          title="Account update"
          visible={isUpdateModalVisible}
          onOk={() => this.updateData(name, email,phoneNumber, allergies)}
          onCancel={() => this.setState({ isUpdateModalVisible: !isUpdateModalVisible })}>
          <Text style={ModalBody}>
            Looks like you want to update your account, would you like to continue?
          </Text>
        </MaterialDialog>

        <ConfirmationMessage text="Your details are ready to be updated."/>
        <ConfirmationAction action={() => { this.setState({isUpdateModalVisible: !isUpdateModalVisible}) }} goBack={this.goBack}/>
      </ScrollView>
    )
  }
}
