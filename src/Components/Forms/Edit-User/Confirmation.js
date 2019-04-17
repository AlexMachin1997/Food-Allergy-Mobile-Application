//React dependencies
import React, { Component } from "react";
import { ScrollView, Text, AsyncStorage } from "react-native";

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
- Since the utils are objects you will need to access the properties like flex.row or flex.justifyContentCenter 
*/
import { flex } from "../../../styles/flex-utils";
import { fonts } from "../../../styles/text-utils";

// Section styling
const ConfirmationSection = [flex.justifyContentCenter, flex.flex];

//Modal styling
const ModalBody = [fonts.body];

export default class ConfirmationScreen extends Component {
  state = {
    isUpdateModalVisible: false,
    isErrorModalVisible: false,
    isSuccessModalVisible: false,
    error: "",
    success: ""
  };

  componentDidMount() {
    console.log("The Edit User Confirmation Has Mounted");
    console.log("The avaliable values are:");
    console.log(this.props.values);
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

  updateData = async (
    name,
    email,
    phoneNumber,
    allergies,
    avaliableAllergies
  ) => {
    try {
      // Hides the account update modal
      this.setState({ isUpdateModalVisible: !this.state.isUpdateModalVisible });

      // Get the token from storage, wait for the promise to resolve
      const token = await AsyncStorage.getItem("userToken");

      // NodeJS API Domain name
      const API_URL = "https://radiant-dusk-41662.herokuapp.com";

      // Awaiting the response from the API endpoint and set the header to have an authorization token
      const response = await axios.put(
        `${API_URL}/api/users`,
        {
          name: name,
          email: email,
          phone: phoneNumber,
          allergies: allergies
        },
        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: token
          }
        }
      );

      /*
      Destructuring response:
      - Destructuring the state and storing them in variables
      - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
      
      - Destructuring the data object from the response. data contains the message from the NodeJS API
      */
      const { data } = response;

      // Logs the data message from the response
      console.log("State of data sent to /api/users PUT request");
      console.log(data);

      /* 
      Updating the state:
      - success state is set to the data message from the API response
      - isSuccessModalVisible is set to the opposite value of the current state
      */
      this.setState({
        success: data.message,
        isSuccessModalVisible: !this.state.isSuccessModalVisible
      });

      /* 
      Saving data to AsyncStorage:
      - AsyncStorage only accepts a string, so the data needs to be stringified
      - It saves both the userData and the avaliable allergies
      
      - For more information about AsyncStorage checkout this link https://facebook.github.io/react-native/docs/asyncstorage
      */
      const userData = {
        name: data.data.name,
        email: data.data.email,
        phoneNumber: data.data.phone,
        allergies: data.data.allergies
      };

      console.log("The local user data have been updated");
      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      console.log("The avaliable allergies have been updated");
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
      console.log("Error meesage from the /api/users PUT request");
      console.log(data);

      /* 
      Updating the error state:
      - error state is set to the data message
      - isErrorModalVisible is set to the opposite value of the current state
      */
      this.setState({
        error: data, // Could use data.error but when the users token is invalid no message would be shown (Look for the solution in the error modal)
        isErrorModalVisible: !this.state.isErrorModalVisible
      });

      // Return false to prevent the request from continuting. Not sure if axios handles this or not.
      return false;
    }
  };

  goToSearchScreens = () => {
    // After confirming the update go back to the SearchStack (MainScreen)
    this.props.goToSearch();

    // Hide the success modal to prevent it appearing after navigating to the main screen
    this.setState({ isSuccessModalVisible: !this.state.isSuccessModalVisible });
  };

  render() {
    /*
    Destructuring response:
    - Destructuring the state and storing them in variables
    - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
    
    - Destructure the values from the values object which is passed down via the props so they can accessed via indvidual variables 
    - Destructuring the state to also access them via variables
    */

    const {
      values: { name, email, phoneNumber, allergies, avaliableAllergies }
    } = this.props;

    const {
      isUpdateModalVisible,
      isErrorModalVisible,
      isSuccessModalVisible,
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
          onOk={() => this.goToSearchScreens()}
          onDismiss={() =>
            this.setState({ isSuccessModalVisible: !isSuccessModalVisible })
          }
          text={success}
        />

        <ActionModal
          title="Update profile"
          visible={isUpdateModalVisible}
          onOk={() =>
            this.updateData(
              name,
              email,
              phoneNumber,
              allergies,
              avaliableAllergies
            )
          }
          onCancel={() =>
            this.setState({
              isUpdateModalVisible: !this.state.isUpdateModalVisible
            })
          }
          onDismiss={() =>
            this.setState({
              isUpdateModalVisible: !this.state.isUpdateModalVisible
            })
          }
          text="Looks like you want to update your account, would you like to
          continue?"
        />

        <ConfirmationMessage text="Your details are ready to be updated." />
        <ConfirmationAction
          action={() => {
            this.setState({ isUpdateModalVisible: !isUpdateModalVisible });
          }}
          goBack={this.goBack}
        />
      </ScrollView>
    );
  }
}
