import React, {Component} from 'react';
import {View, ActivityIndicator, AsyncStorage, StatusBar} from 'react-native';

class Index extends Component {

 constructor(){
     super();
 }

 componentDidMount(){
  this._checkAuthStatus();
 }

 _checkAuthStatus = async () => {
     const userToken = await AsyncStorage.getItem('userToken'); // Search for a key named userToken
     this.props.navigation.navigate(userToken ? 'authStack': 'guestStack') // True go to authStack, false go to guestStack
 }

  render() {
    return (
      <View>
       <ActivityIndicator size="large" color="#0000ff"/>
       <StatusBar barStyle="default"/>
      </View>
    );
  }
}

export default Index;