// React dependencies
import React, { Component } from "react";
import { Text, View, ScrollView, KeyboardAvoidingView } from "react-native";

// ReactJS custom components
import CustomButton from "../../UI/Button";
import CustomInput from "../../UI/Form-Elements/TextInput";

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import { buttons } from "../../../styles/buttons-utils";
import { fonts } from "../../../styles/text-utils";
import { flex } from "../../../styles/flex-utils";
import { spacing } from "../../../styles/spacing-utils";
import styles from "../Styles";

// Heading styles
const MainTitle = [fonts.title1];
const SubHeading = [fonts.title3];

// Section styles
const Section = [spacing.smallBottom, spacing.smallTop];

// Label styles
const FormLabel = [fonts.title3];

// Input styles
const Outline = { borderRadius: 5 };
const OutlineColour = { borderColor: "black" };
const OutlineWidth = { borderWidth: 1 };

// Button styles
const Button = [buttons.large, styles.RegisterButtons];

export default class ProfileSetup extends Component {
  goForward = e => {
    // Prevents the default behaviour
    e.preventDefault();

    // Increments by one, renders the next component
    this.props.forward();
  };

  render() {
    /* 
    Destructuring status:
    - Destructuring the state and storing them in variables
    - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
    
    - Destructuring the props so they can be refered to via individual variables
    - Destructuring the values from the prps so they can be refered to via individual variables
    */
    const { values, handleChange } = this.props;
    const { name, email, password } = values;

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

      CustomInput:
      - Renders a simple text-based input
      - For information about this component visist it's location which is shown where it's imported

      CustomButton:
      - Renders a simple button component
      - For information about this component visist it's location which is shown where it's imported
      */

      <ScrollView
        contentContainerStyle={[
          flex.justifyContentCenter,
          flex.flex,
          spacing.ContainerSpacing
        ]}
      >
        <KeyboardAvoidingView behavior="padding">
          <View style={Section}>
            <Text style={MainTitle}>Account setup</Text>
            <Text style={SubHeading}>
              Fill in the inputs below with the appropriate information
            </Text>
          </View>

          <View style={Section}>
            <Text style={FormLabel}>Name</Text>
            <CustomInput
              placeholder="Enter your password"
              value={name}
              onChange={value => handleChange("name", value)}
              isSecure={false}
              style={[Outline, OutlineColour, OutlineWidth]}
              isMultiline={true}
              keyboardType="default"
            />
          </View>

          <View style={Section}>
            <Text style={FormLabel}>Email</Text>
            <CustomInput
              placeholder="Enter your password"
              value={email}
              onChange={value => handleChange("email", value)}
              isSecure={false}
              style={[Outline, OutlineColour, OutlineWidth]}
              isMultiline={true}
              keyboardType="email-address"
            />
          </View>

          <View style={Section}>
            <Text style={FormLabel}>Password</Text>
            <CustomInput
              placeholder="Enter your password"
              value={password}
              onChange={value => handleChange("password", value)}
              isSecure={true}
              style={[Outline, OutlineColour, OutlineWidth]}
              isMultiline={true}
              keyboardType="default"
            />
          </View>

          <View style={[flex.justifyContentCenter, flex.row]}>
            <CustomButton
              text="Next"
              mode="contained"
              compact={true}
              styling={Button}
              colour="#0277bd"
              onClick={this.goForward}
              label="Next"
              // Yuck!!!!! dirty validation technique, but it works for now......
              disabled={!name || !email || password.length < 5}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
