// React dependencies
import React from 'react';
import {TouchableOpacity} from 'react-native';

// React navigation 
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

// Custom screens
import SettingsScreen from '../screens/settings';
import EditProfileScreen from '../screens/editProfile';
import HelpScreen from '../screens/help';
import CustomDrawer from '../Components/CustomDrawer';


// Icons
import Icon from 'react-native-vector-icons/MaterialIcons'

// Custom utilities
import {spacing} from '../styles/spacing-utils'

const AuthStackRoutes = createStackNavigator(
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
        <TouchableOpacity onPress={() => {navigation.toggleDrawer()}} style={[spacing.smallLeft]}>
          <Icon name="menu" size={30}/>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={()=> {navigation.navigate('Settings')}} style={[spacing.smallRight]}>
          <Icon name="settings" size={30}/>
        </TouchableOpacity>
      ),    
    })
  }
);

const AuthStack = createDrawerNavigator({
  screen: AuthStackRoutes
}, {
 contentComponent: CustomDrawer
});

export default AuthStack;