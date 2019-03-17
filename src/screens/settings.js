// React dependencies
import React, {Component} from 'react';
import {Text, View, AsyncStorage, ScrollView, Dimensions} from 'react-native';

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {flex} from '../styles/flex-utils';
import {fonts} from '../styles/text-utils';
import {spacing} from '../styles/spacing-utils';
import {buttons} from '../styles/buttons-utils';

// User-Interface Libaries
import {Button, Divider} from 'react-native-paper';

// Action properties
const Action = {marginBottom: 5, marginTop: 5};
const ActionTitle = [fonts.title3]
const ActionBody = [fonts.callout];

// General properties
const DividerStyling = {height:1, marginTop:10};
const {height} = Dimensions.get('window');


class Settings extends Component {

  // Setting the screens title
  static navigationOptions = {
    title: 'Settings',
  };

  // This components own 
  state = {
    screenHeight: height
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({screenHeight:contentHeight })
  };

  render() {
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <ScrollView contentContainerStyle={[spacing.ContainerSpacing]} scrollEnabled={scrollEnabled} onContentSizeChange={this.onContentSizeChange}>
        <View>

          <View style={Action}>
            <Text style={ActionTitle}>Account deletion</Text>
            <Text style={ActionBody}>Permanently delete your account and all of it's content</Text>
            <Button mode="contained" style={[buttons.large]} color="#FF0000" compact={true} onPress={()=> {}} accessibilityLabel="Delete account button">
              Delete account
            </Button>
          </View>     

          <Divider style={DividerStyling} />

          <View style={Action}>
            <Text style={ActionTitle}>Delete contents</Text>
            <Text style={ActionBody}>Permanently delete all your application contents </Text>
            <Button mode="contained" style={[buttons.large]} color="#FF0000" compact={true} onPress={()=> {}} accessibilityLabel="Delete internal storage contents">
              Delete data
            </Button>
          </View>

          <Divider style={DividerStyling} />

          <View style={Action}>
            <Text style={ActionTitle}>Logout</Text>
            <Text style={ActionBody}>End your current session, you will be redirected </Text>
            <Button mode="contained" style={[buttons.large]} color="#FF0000" compact={true} onPress={()=> {this.props.navigation.navigate('guestStack')}} accessibilityLabel="Logout">
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