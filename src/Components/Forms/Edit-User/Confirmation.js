//React dependencies
import React, { Component } from 'react'
import {ScrollView, Alert} from 'react-native'

// Custom React components
import ConfirmationMessage from '../../UI/ConfirmationMessage';
import ConfirmationAction from '../../UI/ConfirmationAction';

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {flex} from '../../../styles/flex-utils';
import ConfirmationAction from '../../UI/ConfirmationAction';

// Sections 
const ConfirmationSection = [flex.alignItemsCenter, flex.justifyContentCenter, flex.flex];

export default class ConfirmationScreen extends Component {
  
  goBack = e => {
    e.preventDefault();
    this.props.back();
  };

  /* 
  addData:
  - This will submit the data via the NodeJS API endpoint 
  - When the data is sent to the API an alert message is sent and the user is redirected to the login screen
  */
  addData = () => {
    Alert.alert(`Your account has succesfully been created`);
    this.props.goToLogin();
  }

  render() {

    // Use to send data to the API endpoint
    // e.g. name can be used to show the name, email can be used to show email etc
    const {values: { name, email, password, allergies }} = this.props;

    return (

      /* 
        Component overviews with resources:

        ScrollView:
        - Allows content to be scrolled in the event the content exceeds the screen height.
        - Often in very rare cases content will overflow the screen but not actually enable the functionlaity. To solve this add an additional view to the bottom with a fixed hieght
        - For more information about this component visit https://facebook.github.io/react-native/docs/scrollview#docsNav


        ConfirmationMessage:
        - It accepts only one prop, text which is a string. Its the message which gets displayed below the icon
        
        ConfirmationAction:
        - It renders the confirmation actions, they are the back button and update button
        The action passes a reference to the method goBack
      */
      
      <ScrollView contentContainerStyle={ConfirmationSection}>
        <ConfirmationMessage text="Your details are ready to be updated, would you like to update them?"/>
        <ConfirmationAction goBack={this.goBack}/>
      </ScrollView>
    )
  }
}
