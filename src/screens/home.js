// React dependencies
import React, {Component} from 'react';
import {Text, View, Image, ScrollView } from 'react-native';

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {buttons} from '../styles/buttons-utils';
import {flex} from '../styles/flex-utils';
import {fonts, colours} from '../styles/text-utils';
import {images} from '../styles/image-utils';

// Assets
import AppIcon from '../assets/Icon.png';

// User-Interface Libaries
import { Button} from 'react-native-paper';

// Generic utils
const button = [buttons.HomeButtons, buttons.large];


// Home component
class Home extends Component { 
  render() {
    return (
      /* 
      ScrollView:
      - To center a child item within a ScrollView component you need flexFrow set to 1
      */
      <ScrollView contentContainerStyle={[flex.alignItemsCenter, flex.justifyContentCenter, flex.grow]}>
        <View>
          <Text style={[colours.black, fonts.title1]}>Food Allergy Assistant</Text>
        </View>

        <View>
          <Image source={AppIcon} style={images.HomeScreenIcon}/>
        </View>

        <View style={{marginBottom: 10}}>
         <Button mode="contained" compact={true} style={button} color="#0277bd" onPress={()=> {this.props.navigation.navigate('Login')}} accessibilityLabel="Login with an existing account">
           Login
          </Button>
        </View>

        <View>
          <Button mode="contained" compact={true} style={button} color="#0277bd" onPress={()=> {this.props.navigation.navigate('Register')}} accessibilityLabel="Sign up for a free account">
           Sign up
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export default Home;