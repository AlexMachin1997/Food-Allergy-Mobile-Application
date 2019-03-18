// React dependencies
import React, {Component} from 'react';
import {Text, View, AsyncStorage, ScrollView} from 'react-native';

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {fonts} from '../styles/text-utils';
import {spacing} from '../styles/spacing-utils';
import {buttons} from '../styles/buttons-utils';

// User-Interface Libaries
import {Button, Divider} from 'react-native-paper';

// Action properties
const Action = {marginBottom: 5, marginTop: 5};
const ActionTitle = [fonts.title3]
const ActionBody = [fonts.callout];
const ActionButton = [buttons.large];


// Divider properties
const DividerStyling = {height:1, marginTop:10};


class Settings extends Component {

  // Setting the screens title
  static navigationOptions = {
    title: 'Settings',
  };

  deleteAccount = async () => {
    this.props.navigation.navigate('guestStack');
  }

  logout = async () => {
    this.props.navigation.navigate('guestStack');
  }

  deleteStorage = async () => {
    this.props.navigation.navigate('guestStack');
  }


  render() {
    return (

      /* 
        Component overviews with resources:

        ScrollView:
        - Allows content to be scrolled in the event the content exceeds the screen height.
        - Often in very rare cases content will overflow the screen but not actually enable the functionlaity. To solve this add an additional view to the bottom with a fixed hieght
        - For more information about this component visit https://facebook.github.io/react-native/docs/scrollview

        View:
        - Is the wrapper, it's the equivalent of a div tag in web development the only difference being React-Natives is more messy
        - For more information about this component visit https://facebook.github.io/react-native/docs/view
                  
        Text:
        - Renders a string of text, its the equivalent of a p tag in web development
        - For more information about this component visit https://facebook.github.io/react-native/docs/text 
        
        Button (react-native paper):
        - Pre-made material button
        - Accepts a number of props, though for this project only mode, compact, style, color, onPress and accessabiltyLabel were used
        - For more information about this component visit https://callstack.github.io/react-native-paper/button.html       
      */

      <ScrollView contentContainerStyle={[spacing.ContainerSpacing]}>
        <View>

          <View style={Action}>
            <Text style={ActionTitle}>Account deletion</Text>
            <Text style={ActionBody}>Permanently delete your account and all of it's content</Text>
            <Button mode="contained" style={ActionButton} color="#FF0000" compact={true} onPress={this.deleteAccount} accessibilityLabel="Delete account button">
              Delete account
            </Button>
          </View>     

          <Divider style={DividerStyling} />

          <View style={Action}>
            <Text style={ActionTitle}>Delete contents</Text>
            <Text style={ActionBody}>Permanently delete all your application contents </Text>
            <Button mode="contained" style={ActionButton} color="#FF0000" compact={true} onPress={this.deleteStorage} accessibilityLabel="Delete internal storage contents">
              Delete data
            </Button>
          </View>

          <Divider style={DividerStyling} />

          <View style={Action}>
            <Text style={ActionTitle}>Logout</Text>
            <Text style={ActionBody}>End your current session, you will be redirected </Text>
            <Button mode="contained" style={ActionButton} color="#FF0000" compact={true} onPress={this.logout} accessibilityLabel="Logout">
              Logout
            </Button>
          </View>     

          <Divider style={DividerStyling} />

          <View style={{height: 50}}></View>

        </View>
      </ScrollView>
    );
  }
}

export default Settings;