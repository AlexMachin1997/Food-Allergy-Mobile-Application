import HomeScreen from '../screens/home'
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import {createStackNavigator} from 'react-navigation'

const guestStack = createStackNavigator({
    Home: HomeScreen,
    Login: LoginScreen,
    Register: RegisterScreen
  },
  {
    initialRouteName: 'Login'
});

export default guestStack;