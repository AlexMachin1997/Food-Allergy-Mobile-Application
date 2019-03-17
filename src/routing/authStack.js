// React dependencies
import React from 'react';
import {TouchableOpacity} from 'react-native';

// React navigation 
import {createStackNavigator} from 'react-navigation';

// Custom screens
import SettingsScreen from '../screens/settings';
import EditProfileScreen from '../screens/editProfile';
import HelpScreen from '../screens/help';

// Icons
import Icon from 'react-native-vector-icons/MaterialIcons'

// Custom utilities
import {spacing} from '../styles/spacing-utils'

const AuthStack = createStackNavigator(
  {
    Settings: SettingsScreen,
    EditProfile: EditProfileScreen,
    Help: HelpScreen,
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Help',
    defaultNavigationOptions: ({navigation}) => ({
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