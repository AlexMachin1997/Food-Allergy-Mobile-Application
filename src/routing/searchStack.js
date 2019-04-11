// React dependencies
import React from "react";

// React navigation
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

// Custom screen
import BarcodeScreen from "../screens/Barcode-Screen/Barcode-Screen";
import LiveSearchScreen from "../screens/Live-Search-Screen/Live-Search-Screen";
import ItemsDirectoryScreen from "../screens/Item-Directory/Items-Directory";

// Icon libaries
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesigns from "react-native-vector-icons/AntDesign";
import FoundationIcon from "react-native-vector-icons/Foundation";

// Icon utility
const iconSize = 25;

/* 
SearchStack:
- Creates a stack which can be traversered via props when active
- When this stack is in use a bottom tab navigator is create with the createMaterialBottomTabNavigator method

Route Config:
- Screens are defined
- Each screen has an asssociated icon, for example barcode for barcode search

Tab config:
- An inital tab is specified
- Animations are enabled
- Lazy is set to true
- BarStyle sets the backgroundColour which is currently blue
- Shifting allows the navigation icon and label to only appear when the tab is active
- Scroll is enabled, but it doesn't work
- Default header title for the stack is defiend.
- Additonal configuration for the tab navigator can be found here https://reactnavigation.org/docs/en/material-bottom-tab-navigator.html
*/

export default (SearchStack = createMaterialBottomTabNavigator(
  {
    Barcode: {
      screen: BarcodeScreen,
      navigationOptions: {
        tabBarLabel: "Barcode Search",
        tabBarIcon: () => (
          <AntDesigns name="barcode" size={iconSize} color="white" />
        )
      }
    },
    Feed: {
      screen: LiveSearchScreen,
      navigationOptions: {
        tabBarLabel: "Live Search",
        tabBarIcon: () => (
          <MaterialIcons name="search" size={iconSize} color="white" />
        )
      }
    },
    ItemsDirectory: {
      screen: ItemsDirectoryScreen,
      navigationOptions: {
        tabBarLabel: "Item Directory",
        tabBarIcon: () => (
          <FoundationIcon
            name="clipboard-notes"
            size={iconSize}
            color="white"
          />
        )
      }
    }
  },
  {
    initialRouteName: "Barcode",
    animationEnabled: true,
    lazy: true,
    barStyle: { backgroundColor: "#0277bd" },
    shifting: true,
    tabBarOptions: {
      scrollEnabled: true
    },
    navigationOptions: {
      headerTitle: "Search feeds"
    }
  }
));
