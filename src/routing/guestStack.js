import HomeScreen from '../screens/home'
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import {createStackNavigator} from 'react-navigation'

const guestStack = createStackNavigator({
    home: HomeScreen,
    login: LoginScreen,
    register: RegisterScreen
  },
  {
    initialRouteName: 'home'
});

export default guestStack;