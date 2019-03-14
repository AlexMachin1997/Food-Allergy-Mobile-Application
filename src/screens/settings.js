// React dependencies
import React, {Component} from 'react';
import {Text, View, AsyncStorage} from 'react-native';

/* 
Util classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {flex} from '../styles/flex-utils';
import {fonts, textColour} from '../styles/text-utils';
import {spacing} from '../styles/spacing-utils';
import {background} from '../styles/background-utils';
import {images} from '../styles/image-utils';

import { Button, Divider} from 'react-native-paper';

class Settings extends Component {
  render() {
    return (
      <View style={[flex.enableFlex, flex.column, spacing.ContainerSpacing, flex.justifyContentSpaceEvenly]}>

      <View>
        <Text style={[fonts.title1]}>Core application settings</Text>
      </View>

      <Divider />

      <View style={[spacing.smallTop]}>
        <Text style={[fonts.title3]}>Account deletion</Text>
        <Text style={[fonts.callout]}>Permanently delete your account and all of it's content</Text>
          <Button mode="contained"  color="#FF0000" compact={true} onPress={()=> {}}>
           Delete account
          </Button>
      </View>     

      <Divider />

      <View style={[spacing.smallTop]}>
        <Text style={[fonts.title3]}>Delete contents</Text>
        <Text style={[fonts.callout]}> Permanently delete all your application contents </Text>
        <Button mode="contained"  color="#FF0000" compact={true} onPress={()=> {}}>
           Delete data
        </Button>
      </View>

      <Divider />

      <View style={[spacing.smallTop]}>
        <Text style={[fonts.title3]}>Delete contents</Text>
        <Text style={[fonts.callout]}>Permanently delete all your application contents </Text>
        <Button mode="contained"  color="#FF0000" compact={true} onPress={()=> {this.props.navigation.navigate('guestStack')}}>
           Logout
        </Button>
      </View>     

      <Divider />

    </View>
    );
  }
}

export default Settings;