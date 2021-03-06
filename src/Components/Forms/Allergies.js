// React dependencies
import React, { Component } from "react";
import { Text, View, ScrollView, KeyboardAvoidingView } from "react-native";

// ReactJS custom components
import CustomButton from "../UI/Button";

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import { fonts } from "../../styles/text-utils";
import { flex } from "../../styles/flex-utils";
import { spacing } from "../../styles/spacing-utils";

// Heading styles
const MainTitle = [fonts.title1];
const SubHeading = [fonts.title2];

// Section styles
const Section = [spacing.smallBottom, spacing.smallTop];
const AllergySection = [spacing.smallTop, spacing.smallBottom, flex.flex];
const ConfirmationButtonsSection = [flex.justifyContentSpaceAround, flex.row];

// Confirmation button styling
const ConfirmationButtons = {
  padding: 10,
  width: 150
};

export default class Allergies extends Component {
  goForward = e => {
    // Prevent the default behaviour
    e.preventDefault();

    // Increment by one, render the next component
    this.props.forward();
  };

  goBack = e => {
    // Prevent the default behaviour
    e.preventDefault();

    // Decrement by one, render the previous component
    this.props.back();
  };

  render() {
    /* 
    Destructuring status:
    - Destructuring the state and storing them in variables
    - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
    
    - Destructuring the props so they can be refered to via individual variables
    - Destructuring the values from the props so they can be refered to via individual variables
    */
    const { values } = this.props;
    const { allergies, avaliableAllergies } = values;

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
      */

      <ScrollView
        contentContainerStyle={[
          flex.justifyContentCenter,
          spacing.ContainerSpacing,
          flex.alignItemsCenter
        ]}
      >
        <KeyboardAvoidingView behavior="padding">
          <View style={Section}>
            <Text style={MainTitle}>{this.props.title}</Text>
            <Text style={SubHeading}>
              Fill in the inputs below with the appropriate information
            </Text>
          </View>

          <View style={AllergySection}>
            <Text style={SubHeading}>Your allergies</Text>

            {allergies.length < 1 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center"
                }}
              >
                <Text style={SubHeading}>You have no allergies</Text>
              </View>
            ) : null}

            {allergies.map((allergy, index) => {
              return (
                <View key={index} style={Section}>
                  <View>
                    <CustomButton
                      text={`Remove ${allergy}`}
                      mode="contained"
                      compact={true}
                      styling={null}
                      colour="#FF0000"
                      onClick={() => this.props.removeAllergy(index)}
                      label="Remove an allergy"
                      disabled={false}
                    />
                  </View>
                </View>
              );
            })}
          </View>

          <View style={AllergySection}>
            <Text style={SubHeading}>Avaliable allergies</Text>

            {avaliableAllergies.length < 1 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 10
                }}
              >
                <Text style={SubHeading}>No allergies avaliable</Text>
              </View>
            ) : null}

            {avaliableAllergies.map((allergy, index) => {
              return (
                <View key={index} style={Section}>
                  <View>
                    <CustomButton
                      text={`Add ${allergy}`}
                      mode="contained"
                      compact={true}
                      styling={null}
                      colour="#3CB371"
                      onClick={() => this.props.addAllery(index)}
                      label="Add an allergy"
                      disabled={false}
                      isDark={true}
                    />
                  </View>
                </View>
              );
            })}
          </View>

          <View style={ConfirmationButtonsSection}>
            <View>
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

            <View>
              <CustomButton
                text="Next"
                mode="contained"
                compact={true}
                colour="#0277bd"
                styling={ConfirmationButtons}
                onClick={this.goForward}
                label="Submit"
                disabled={false}
              />
            </View>
          </View>

          <View style={{ height: 50 }} />
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
