// React dependencies
import React, { Component } from "react";
import { Text, View, Image, ScrollView } from "react-native";

// Custom React components
import CustomButton from "../../Components/UI/Button";

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import { buttons } from "../../styles/buttons-utils";
import { flex } from "../../styles/flex-utils";
import { fonts } from "../../styles/text-utils";

// Application Icon
import AppIcon from "../../assets/Icon.png";

// Component specific styling
import styles from "./Styles";

// Button utils
const Button = [styles.HomeButtons, buttons.large];

// Heading utils
const Heading = [fonts.title1];

export default class HomeScreen extends Component {
  componentDidMount() {
    console.log("The Home Screen Has Mounted");
  }

  // Sets the title within the header and disables the header properties whilst on this screen
  static navigationOptions = {
    headerMode: "none",
    header: null
  };

  render() {
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
        
                
        CustomButton:
        - Check the component for more information
      */

      <ScrollView
        contentContainerStyle={[
          flex.alignItemsCenter,
          flex.justifyContentCenter,
          flex.grow
        ]}
      >
        <View>
          <Text style={Heading}> Food Allergy Assistant</Text>
        </View>

        <View>
          <Image source={AppIcon} style={styles.HomeScreenIcon} />
        </View>

        <View style={{ marginBottom: 10 }}>
          <CustomButton
            text="Sign up"
            mode="contained"
            compact={true}
            styling={Button}
            colour="#0277bd"
            onClick={() => this.props.navigation.navigate("register")}
            label="Go to the register screen"
          />
        </View>

        <View>
          <CustomButton
            text="Log in"
            mode="contained"
            compact={true}
            styling={Button}
            colour="#0277bd"
            onClick={() => this.props.navigation.navigate("login")}
            label="Go to the login screen"
          />
        </View>
      </ScrollView>
    );
  }
}
