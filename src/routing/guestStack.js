// React navigation 
import {createStackNavigator} from 'react-navigation'

// React-Navigation screens 
import HomeScreen from '../screens/Home-Screen/Home-Screen'
import LoginScreen from '../screens/Login-Screen/Login-Screen';
import RegisterScreen from '../screens/Register-Screen/Register-Screen';

/* 
GuestSack:
- Creates a stack which can be traversered via props when active
- This particular stack is only avaliable if a user is not authenticated

Screens avaliable:
- Home
- Login
- Register

Stack config:
- The intial route is set to home
- Nothing else is needed as there is no menu when the user isn't authenticated
*/
export default GuestStack = createStackNavigator({
    home: HomeScreen,
    login: LoginScreen,
    register: RegisterScreen
  },
  {
    initialRouteName: 'home'
});