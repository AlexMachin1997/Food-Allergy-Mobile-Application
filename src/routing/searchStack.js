// React dependencies
import React from "react";

// React navigation
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

// Custom screen
import BarcodeScreen from "../screens/Barcode-Screen/Barcode-Screen";
import ItemsDirectoryScreen from "../screens/Item-Directory/Items-Directory";

// Icon libaries
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
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];

      // ShoppingLists tab, when the route equals routeName set the headerTitle equal to the specified title
      if (routeName == "Barcode") {
        return {
          headerTitle: "Barcode scanner"
        };
      }

      // TrackItems tab, when the route equals routeName set the headerTitle equal to the specified title
      if (routeName == "ItemsDirectory") {
        return {
          headerTitle: "Items Directory"
        };
      }
    },
    initialRouteName: "Barcode",
    animationEnabled: true,
    lazy: true,
    barStyle: { backgroundColor: "#0277bd" },
    shifting: true,
    tabBarOptions: {
      scrollEnabled: true
    }
  }
));
