//React dependencies
import React, { Component } from 'react'
import {View,ScrollView, Alert, StyleSheet} from 'react-native'

// Custom React components
import Confirmation from '../../Components/UI/Confirmation';
import CustomButton from '../../Components/UI/Button';

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {buttons} from '../../styles/buttons-utils';
import {flex} from '../../styles/flex-utils';
import {spacing} from '../../styles/spacing-utils';

// Component assets
import Icon from '../../assets/Happy-face.png'


const styles = StyleSheet.create({
  RegisterButtons: {
    width: 150
  }
})


// Sections 
const ConfirmationSection = [flex.alignItemsCenter, flex.justifyContentCenter, flex.flex];
const ConfirmationButtonsSection = [flex.row, flex.alignItemsCenter, flex.justifyContentCenter,spacing.mediumLeft];
const ConfirmationButtonSection = [flex.flex];

//Buttons
const ConfirmationButtons = [buttons.large, styles.RegisterButtons];

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
    const {values: { name, email, password, allergies }} = this.props;

    return (

      /* 
        Component overviews with resources:

        ScrollView:
        - Allows content to be scrolled in the event the content exceeds the screen height.
        - Often in very rare cases content will overflow the screen but not actually enable the functionlaity. To solve this add an additional view to the bottom with a fixed hieght
        - For more information about this component visit https://facebook.github.io/react-native/docs/scrollview#docsNav

        View:
        - Is the wrapper, it's the equivalent of a div tag in web development the only difference being React-Natives is more messy
        - For more information about this component visit https://facebook.github.io/react-native/docs/view
                
        Text:
        - Renders a string of text, its the equivalent of a p tag in web development
        - For more information about this component visit https://facebook.github.io/react-native/docs/text
        
        CustomButton and Confirmation:
        - Check the components for more information
      */
      
      <ScrollView contentContainerStyle={ConfirmationSection}>
            
        <Confirmation icon={Icon} text="Your details are ready to be submitted, would you like to submit them ?"/>

        <View style={ConfirmationButtonsSection}>       
          
          <View style={ConfirmationButtonSection}>
              <CustomButton 
                text="Go back" 
                mode="contained" 
                compact={true} 
                colour="#0277bd" 
                styling={ConfirmationButtons} 
                onClick={this.goBack} 
                label="Go back to the previous form"
                disabled={false}
              />
          </View>     

          <View style={ConfirmationButtonSection}>
              <CustomButton 
                text="Send" 
                mode="contained" 
                compact={true} 
                colour="#0277bd" 
                styling={ConfirmationButtons} 
                onClick={() => this.addData(name, email, password, allergies)} 
                label="Submit your data"
                disabled={false}
                />
          </View>

        </View>
      </ScrollView>
    )
  }
}
