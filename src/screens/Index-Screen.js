// React Dependencies
import React, {Component} from 'react';
import {View, ActivityIndicator, AsyncStorage} from 'react-native';

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {flex} from '../styles/flex-utils';


export default class IndexScreen extends Component {

  componentDidMount(){
    this._checkAuthStatus();
  }
  
  /* 
  checkAuthStatus:
    - If true forward to the authStack
    - If false forward to the guestStack 
    - Its an async function so it will only release the thread once the task been complete
  */
  _checkAuthStatus = async () => {
      const userToken = await AsyncStorage.getItem('userToken'); // Search for a key named userToken
      this.props.navigation.navigate(userToken ? 'authStack': 'guestStack') // True go to authStack, false go to guestStack
    }

  render() {
     
    return (

      /* 
        Component overviews with resources:
        
        View:
        - Is the wrapper, it's the equivalent of a div tag in web development the only difference being React-Natives is more messy
        - For more information about this component visit https://facebook.github.io/react-native/docs/view

        ActivityIndicator
        - Shows a loading icon
        - The size is large
        - THe colour is the colour of the loading icon
        - For more information about this component visit https://facebook.github.io/react-native/docs/activityindicator
      */
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff"/>
      </View> 
    );
  }
}