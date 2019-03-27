// React dependencies
import React from 'react';
import {TouchableOpacity} from 'react-native';

// React navigation 
import {createStackNavigator, createDrawerNavigator} from 'react-navigation';

// Custom screens and stacks
import SettingsScreen from '../screens/Settings-Screen/Settings-Screen';
import EditProfileScreen from '../screens/Edit-Profile-Screen/Edit-Profile-Screen';
import HelpScreen from '../screens/Help-Screen/Help-Screen';
import CustomDrawer from '../Components/Drawer/CustomDrawer';
import SearchStack from './SearchStack';

// Icons
// MaterialIcons
import Icon from 'react-native-vector-icons/MaterialIcons'
const MaterialIconSize = 30;

// Custom utilities
import {spacing} from '../styles/spacing-utils'

/* 
AuthStackRoutes:
- Creates a stack which can be traversered via props when active
- This particular stack is only avaliable if a user is authenticated
- Contains a drawer toggler and settings icon, both of which are wrapped in a touchable opacitiy
- This stack is referenced in a drawer to access routes, but it's currently not setup

Screens avaliable:
- SettingsScreen
- EditProfileScreen
- HelpScreen

Stack config:
- Inital route is set
- The headerLeft triggers the navigation drawer (Currently displays nothing other than a plain component with the apps icon)
- The headerRight triggers the settings screen to appear.
- To access these actions outside of the screens the navigation object and defaultNavigation options are leveraged. 
- Both headerLeft and headerRight are wrapped in touchable opacity to allow onPress actions to be defined
*/
const AuthStackRoutes = createStackNavigator(
  {
    search: SearchStack,
    settings: SettingsScreen,
    edit: EditProfileScreen,
    help: HelpScreen,
  },
  {
    initialRouteName: 'search',
    defaultNavigationOptions: ({navigation}) => ({
      headerLeft: (
        <TouchableOpacity onPress={() => {navigation.toggleDrawer()}} style={[spacing.smallLeft]}>
          <Icon name="menu" size={MaterialIconSize}/>
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity onPress={()=> {navigation.navigate('settings')}} style={[spacing.smallRight]}>
          <Icon name="settings" size={MaterialIconSize}/>
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