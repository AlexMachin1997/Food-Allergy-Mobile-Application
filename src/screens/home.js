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
const homeButton = [buttons.HomeButtons, buttons.large];


// Home component
class Home extends Component { 

  static navigationOptions = {
    headerMode: 'none',
    header: null
  }

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
       
        Button (react-native paper):
        - Pre-made material button
        - Accepts a number of props, though for this project only mode, compact, style, color, onPress and accessabiltyLabel were used
        - For more information about this component visit https://callstack.github.io/react-native-paper/button.html       
      */
         
      <ScrollView contentContainerStyle={[flex.alignItemsCenter, flex.justifyContentCenter, flex.grow]}>
        <View>
          <Text style={[colours.black, fonts.title1]}>Food Allergy Assistant</Text>
        </View>

        <View>
          <Image source={AppIcon} style={images.HomeScreenIcon}/>
        </View>

        <View style={{marginBottom: 10}}>
         <Button mode="contained" compact={true} style={homeButton} color="#0277bd" onPress={()=> {this.props.navigation.navigate('login')}} accessibilityLabel="Login with an existing account">
           Login
          </Button>
        </View>

        <View>
          <Button mode="contained" compact={true} style={homeButton} color="#0277bd" onPress={()=> {this.props.navigation.navigate('register')}} accessibilityLabel="Sign up for a free account">
           Sign up
          </Button>
        </View>
      </ScrollView>
    );
  }
}

export default Home;