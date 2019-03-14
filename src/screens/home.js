// React dependencies
import React, {Component} from 'react';
import {Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';

/* 
Util classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {buttons} from '../styles/buttons-utils';
import {flex} from '../styles/flex-utils';
import {fonts, textColour} from '../styles/text-utils';
import {images} from '../styles/image-utils';
import {background} from '../styles/background-utils';

// Assets
import AppIcon from '../assets/Icon.png';

// Paper chase UI lib
import { Button} from 'react-native-paper';



// Home component
class Home extends Component { 
  render() {
    return (
      <View style={[flex.enableFlex, flex.alignItemsCenter, flex.justifyContentCenter, flex.column]}>
        <View>
          <Text style={[textColour.black, fonts.title1]}>Food Allergy Assistant</Text>
        </View>

        <View >
          <Image source={AppIcon} style={images.HomeScreenIcon}/>
        </View>

        <View style={{marginBottom: 10}}>
         <Button mode="contained"  style={buttons.HomeButtons} color="#0277bd" onPress={()=> {this.props.navigation.navigate('Login')}}>
           Login
          </Button>
        </View>

        <View>
          <Button mode="contained" style={buttons.HomeButtons} color="#0277bd" onPress={()=> {this.props.navigation.navigate('Register')}}>
           Sign up
          </Button>
        </View>
      </View>
    );
  }
}

export default Home;