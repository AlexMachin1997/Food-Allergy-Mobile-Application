// Core react dependencies
import React from 'react';
import {TouchableOpacity} from 'react-native';

// Custom screens
import AboutScreen from '../screens/about';
import SettingsScreen from '../screens/settings';
import EditProfileScreen from '../screens/editProfile';
import HelpScreen from '../screens/help';

// React navigation 
import {createStackNavigator} from 'react-navigation';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons'

// Custom utilities
import {spacing} from '../styles/spacing-utils'

const AuthStack = createStackNavigator(
  {
    About: AboutScreen,
    Settings: SettingsScreen,
    EditProfile: EditProfileScreen,
    Help: HelpScreen,
    Settings: SettingsScreen,
    Help: HelpScreen
  },
  {
    initialRouteName: 'About',
    defaultNavigationOptions: ({navigation}) => ({
      headerTitle: 'Food Allergy Assistant',
      headerStyle: {
        margin: 0
      },
      headerLeft: (
        <TouchableOpacity style={[spacing.headerLeft]}>
          <Icon name="menu" size={30}/>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={()=> {navigation.navigate('Settings')}} style={[spacing.headerRight]}>
          <Icon name="settings" size={30}/>
        </TouchableOpacity>
      ),    
    })
  }
);

export default AuthStack;