//React dependencies
import React, { Component } from 'react'
import {ScrollView, Text} from 'react-native'
import { MaterialDialog } from 'react-native-material-dialog';

// Custom React components
import ConfirmationMessage from '../../UI/ConfirmationMessage';
import ConfirmationAction from '../../UI/ConfirmationAction';

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {flex} from '../../../styles/flex-utils';
import {fonts} from '../../../styles/text-utils';

// Sections 
const ConfirmationSection = [flex.alignItemsCenter, flex.justifyContentCenter, flex.flex];

//Modal 
const ModalBody = [fonts.body]

export default class ConfirmationScreen extends Component {

  state = {
    isModalVisible: false
  }

  goBack = e => {
    e.preventDefault();
    this.props.back();
  };

  /* 
  addData:
  - This will submit the data via the NodeJS API endpoint 
  - When the data is sent to the API an alert message is sent and the user is redirected to the login screen
  - When integrating with the API pass the values as parameters, when the function is called they will then be used to create the object to submit to the endpoint 
  */
  addData = () => {
    this.setState({isModalVisible: !this.state.isModalVisible})
    this.props.goToLogin();
  }

  render() {

    // Use to send data to the API endpoint
    const {values: { name, email, password, allergies }} = this.props;
    const {isModalVisible} = this.state;

    return (

      /* 
        Component overviews with resources:

        ScrollView:
        - Allows content to be scrolled in the event the content exceeds the screen height.
        - Often in very rare cases content will overflow the screen but not actually enable the functionlaity. To solve this add an additional view to the bottom with a fixed hieght
        - For more information about this component visit https://facebook.github.io/react-native/docs/scrollview#docsNav

        MaterialDialog
        - Access the data via the destructured data
      */
      
      <ScrollView contentContainerStyle={ConfirmationSection}>
        
        <MaterialDialog
          title="Account creation"
          visible={isModalVisible}
          onOk={() => this.addData()}
          onCancel={() => this.setState({ isModalVisible: !this.state.isModalVisible })}>
          <Text style={ModalBody}>
           You are about to register your account, would you like to continue? 
          </Text>
        </MaterialDialog>

        <ConfirmationMessage text="Your details are ready to be submitted."/>
        <ConfirmationAction action={() => { this.setState({isModalVisible: !isModalVisible}) }} goBack={this.goBack}/>
      </ScrollView>
    )
  }
}
