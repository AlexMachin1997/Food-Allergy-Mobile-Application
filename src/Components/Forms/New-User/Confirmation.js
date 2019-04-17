//React dependencies
import React, { Component } from "react";
import { ScrollView, AsyncStorage } from "react-native";

// Custom React components
import ConfirmationMessage from "../../UI/User-Form-Blocks/ConfirmationMessage";
import ConfirmationAction from "../../UI/User-Form-Blocks/ConfirmationAction";
import ResponseModal from "../../UI/Modals/ResponseModal";
import ActionModal from "../../UI/Modals/ActionModal";

// Promose based HTTP Requests library
import axios from "axios";

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import { flex } from "../../../styles/flex-utils";
import styles from "./styles";

// Section styles
const ConfirmationSection = [flex.justifyContentCenter, flex.flex];

export default class ConfirmationScreen extends Component {
  state = {
    isRegisterModalVisible: false,
    isErrorModalVisible: false,
    isSuccessModalVisible: false,
    error: "",
    success: ""
  };

  goBack = e => {
    // Prevent the default behaviour
    e.preventDefault();

    // Decrement by 1, renders the previous component
    this.props.back();
  };

  addData = async (name, email, password, allergies, avaliableAllergies) => {
    try {
      // Set the isRegisterModalVisiable to false
      this.setState({
        isRegisterModalVisible: !this.state.isRegisterModalVisible
      });

      // NodeJS API Domain name
      const API_URL = "https://radiant-dusk-41662.herokuapp.com";

      // Awaiting the response from the API endpoint
      const response = await axios.post(`${API_URL}/api/users/register`, {
        name: name,
        email: email,
        password: password,
        allergies: allergies
      });

      /*
      Destructuring response:
      - Destructuring the state and storing them in variables
      - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 

      - Destructuring the data object from the response. Data is the response from axios, to access the custom data use data.data, to acces the API message data.message
      */
      const { data } = response;

      // Logs the data message from the response
      console.log("State of data sent to the  /api/users PUT request");
      console.log(data); // log the actual data use data.data (The custom is nested within the axios data)

      /* 
      Updating the success state:
      - success state is set to the data message
      - isSuccessModalVisible is set to the opposite value of the current state
      */
      this.setState({
        success: data.message,
        isSuccessModalVisible: !this.state.isSuccessModalVisible
      });

      /* 
      Saving data to AsyncStorage:
      - AsyncStorage only accepts a string, so the data needs to be stringified
      - It updates the avaliable allergies with the modified values
      
      - For more information about AsyncStorage checkout this link https://facebook.github.io/react-native/docs/asyncstorage
      */
      await AsyncStorage.setItem(
        "avaliableAllergies",
        JSON.stringify(avaliableAllergies)
      );
    } catch (error) {
      /*
      Destructuring response:
      - Destructuring the state and storing them in variables
      - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
      
      - Destructure the data object from the error response object so they can be refered to via varialbes
      */
      const { data } = error.response;

      // Log the data message and data returned
      console.log("Error message from /api/users POST request");
      console.log(data.message);

      /* 
      Updating the error state:
      - error state is set to the data message
      - isErrorModalVisible is set to the opposite value of the current state, for example its false by default this would turn it to true
      */
      this.setState({
        error: data.message,
        isErrorModalVisible: !this.state.isErrorModalVisible
      });

      // Return false to prevent the request from continuting, axios may or may not handle this.
      return false;
    }
  };

  goToLoginScreen = () => {
    // Go to the login screen after registering
    this.props.goToLogin();

    // Hide the success modal to prevent it appearing after navigating to the main screen
    this.setState({ isSuccessModalVisible: !this.state.isSuccessModalVisible });
  };

  render() {
    /*
    Destructuring response:
    - Destructuring the state and storing them in variables
    - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
    
    - Destructure the values from the values object which is passed down via the props, now then can be refered to via variables 
    - Destructure the state so they can be refered to via varialbes
    */

    const {
      values: { name, email, password, avaliableAllergies, allergies }
    } = this.props;

    const {
      isRegisterModalVisible,
      success,
      isSuccessModalVisible,
      error,
      isErrorModalVisible
    } = this.state;

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
        - For information about this component visist it's location which is shown where it's imported

      
        ConfirmationAction:
        - It renders the confirmation actions, they are the back button and update button
        - For information about this component visist it's location which is shown where it's imported
      */

      <ScrollView contentContainerStyle={ConfirmationSection}>
        <ResponseModal
          title="Error"
          visible={isErrorModalVisible}
          onOk={() =>
            this.setState({ isErrorModalVisible: !isErrorModalVisible })
          }
          onDismiss={() =>
            this.setState({ isErrorModalVisible: !isErrorModalVisible })
          }
          text={error}
        />

        <ResponseModal
          title="Success"
          visible={isSuccessModalVisible}
          onOk={() => this.goToLoginScreen()}
          onDismiss={() =>
            this.setState({ isSuccessModalVisible: !isSuccessModalVisible })
          }
          text={success}
        />

        <ActionModal
          title="Account creation"
          visible={isRegisterModalVisible}
          onOk={() =>
            this.addData(name, email, password, allergies, avaliableAllergies)
          }
          onCancel={() =>
            this.setState({
              isRegisterModalVisible: !this.state.isRegisterModalVisible
            })
          }
          onDismiss={() =>
            this.setState({
              isRegisterModalVisible: !this.state.isRegisterModalVisible
            })
          }
          text="You are about to register your account, would you like to continue?"
        />

        <ConfirmationMessage text="Your details are ready to be submitted." />
        <ConfirmationAction
          action={() => {
            this.setState({ isRegisterModalVisible: !isRegisterModalVisible });
          }}
          goBack={this.goBack}
        />
      </ScrollView>
    );
  }
}
