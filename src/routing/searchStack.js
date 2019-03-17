// React dependencies
import React from 'react';

// React navigation 
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

// Custom screen
import BarcodeScreen from '../screens/barcode';
import LiveSearchScreen from '../screens/liveSearch';
import ShoppingListScreen from '../screens/shoppingList';

// Icon libaries
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesigns from 'react-native-vector-icons/AntDesign'
import FoundationIcon from 'react-native-vector-icons/Foundation';

// Icon utility
const iconSize = 25;

const SearchStack = createMaterialBottomTabNavigator({
    Barcode: {
      screen: BarcodeScreen,
      navigationOptions: {
        tabBarLabel: "Barcode Search",
        tabBarIcon: () => <AntDesigns name="barcode" size={iconSize} color="white"/>
      }
    },
    LiveSearch: {
      screen: LiveSearchScreen,
      navigationOptions: {
        tabBarLabel: "Live Search",
        tabBarIcon: () => <MaterialIcons name="search" size={iconSize} color="white"/>
      }
    },
    ShoppingList: {
      screen: ShoppingListScreen,
      navigationOptions: {
        tabBarLabel: "Shopping List",
        tabBarIcon: () => <FoundationIcon name="clipboard-notes" size={iconSize} color="white"/>
      }
    }
}, {
		initialRouteName: "Barcode",
		animationEnabled: true,
    lazy: true,
    barStyle: { backgroundColor: '#0277bd' },
    shifting: true,
    tabBarOptions: {
      scrollEnabled:true,
    },
});

export default SearchStack;