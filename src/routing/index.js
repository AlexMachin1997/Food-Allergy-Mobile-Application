/* 
 React-Navigation:
 - Dependencies are imported via destructuring
 - Application stacks imported 
 - Routes are conditionally shown based on the AuthLoading checks.
 - The AppContainer is exported and imported into /screens/index.js (Starting point for routes)

 Additional resources:
 - createSwitchNavigator docs can be found here https://reactnavigation.org/docs/en/app-containers.html#docsNav
 - createSwitchNavigator can be found here https://reactnavigation.org/docs/en/switch-navigator.html
 - An authflow example can be found here https://reactnavigation.org/docs/en/auth-flow.html 
*/
import {createAppContainer, createSwitchNavigator } from 'react-navigation'

import AuthStack from './AuthStack';
import GuestStack from './GuestStack';
import AuthLoading from '../screens/Index-Screen'

const SwitchNavigator = createSwitchNavigator(
  {
    authLoading: AuthLoading,
    guestStack: GuestStack,
    authStack: AuthStack
  },
  {
    initialRouteName: 'guestStack'
  }
)

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;