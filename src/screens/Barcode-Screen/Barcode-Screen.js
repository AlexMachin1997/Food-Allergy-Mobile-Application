// React dependencies
import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  TouchableWithoutFeedback,
  Modal,
  Image
} from "react-native";

// React-Navigation Higher-Order-Component(HOC)
import { NavigationEvents } from "react-navigation";

// Expo barcode module
import { BarCodeScanner } from "expo-barcode-scanner";

// Expo permissions, allows the camera to be used
import * as Permissions from "expo-permissions";

// Component specific styles
import Styles from "./Styles";

// Promose based HTTP Requests library
import axios from "axios";

// React-Native Vector Icons
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Custom UI components
import CustomButton from "../../Components/UI/Form/Button";

// Component images
import HappyFace from "../../assets/Happy-face.png";
import SadFace from "../../assets/Sad-face.png";

/* 
Utility classes:
- To access util classes use the exported variable e.g. fonts.[object name]
*/
import { fonts } from "../../styles/text-utils";

// Modal dialog
import { MaterialDialog } from "react-native-material-dialog";
const ModalBody = [fonts.body];

import shortid from "shortid";

export default class BarcodeScreen extends Component {
  state = {
    hasCameraPermission: null,
    scanned: false,

    name: "",
    email: "",
    phoneNumber: "",
    allergies: null,

    errorModal: false,
    error: "",

    item: {},
    isAllergicModalVisible: false,
    isAllergic: false,

    isSaveModalVisible: false,

    shoppingLists: []
  };

  componentDidMount() {
    console.log("The Barcode Screen Has Mounted");
    this.requestCameraPermission();
    this.fetchCurrentUserData();
    this.fetchSuitableItems();
  }

  /* 
  onFocus:
  - Everytime the component refocuses the:
    - Current users data is fetched
    - Current directory of items i fetched (Originally named shopping list but recently renamed to items directroy)

  - Previously the componentDidMount would only fetch the data, but when you came back to the tab the component didn't get re-rendered. 
    So the componentDidMount never ran again. To ensure data is updated the NavigationEvents higer order component was used to refetch the data.

  */
  onFocus = async () => {
    this.fetchCurrentUserData();
    this.fetchSuitableItems();
  };

  /* 
  fetchSuitableItems:
  - Lookup for a key named ItemsDirectory
  - If the key is found initalize it with values from it
  - If the key isn't found initalize an empty array
  */
  fetchSuitableItems = async () => {
    const value = await AsyncStorage.getItem("ItemsDirectory");

    if (value) {
      this.setState({
        shoppingLists: JSON.parse(value)
      });
    } else {
      this.setState({
        shoppingLists: []
      });
    }
  };

  /* 
  requestCameraPermission
  - Asks for permission
  - Sets the state equal to the response form the modal buttons
  */
  requestCameraPermission = async () => {
    /* 
    Destructuring status:
    - Destructuring the state and storing them in variables
    - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
    - Status is destructured from the permissions response
    */
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  /* 
  fetchCurrentUserData:
  - Look for a key named userData

  userData:
  - If the key exists set the state equal to the response from AsyncStorage

  !userData:
  - Perform a network request to /apiusers/me 
  - Set the state equal to the response
  - Save response into AsyncStorage, saves repeat network requests
  - Whilst saving the data stringy the data, AsyncStorage only accepts a string value  
  - Any errors the error modal will be shown by setting the errorModal to true and setting the error value equal to the error provided by the API
  */
  fetchCurrentUserData = async () => {
    const userData = await AsyncStorage.getItem("userData");

    if (userData) {
      console.log("Parsed data from AsyncStorage:");
      const data = JSON.parse(userData);
      console.log(data);

      this.setState({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber, //When there is no phone number it will show undefined, but once the user provides a valid number it will be updated.
        allergies: data.allergies
      });
    } else {
      try {
        // JWT token
        const token = await AsyncStorage.getItem("userToken");

        // NodeJS API domain name, it was provided by Heroku upon creation
        const API_URL = "https://radiant-dusk-41662.herokuapp.com";

        // Send a request to /api/users/me , set the Authorization value equal to the token
        const response = await axios.get(`${API_URL}/api/users/me`, {
          headers: {
            Authorization: token
          }
        });

        /* 
        Destructuring response:
        - Destructuring the state and storing them in variables
        - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
        - Destructuring the data from the API  
        */
        const { data } = response.data;
        console.log("Data from /api/users.me");
        console.log(data);

        this.setState({
          name: data.name,
          email: data.email,
          phoneNumber: data.phone,
          allergies: data.allergies
        });

        console.log("Saving data to AsyncStorage");
        const userData = {
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          allergies: data.allergies
        };

        await AsyncStorage.setItem("userData", JSON.stringify(userData));
      } catch (error) {
        /* 
        Destructuring response:
        - Destructuring the state and storing them in variables
        - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
        - Destructure the data object from the error response object so they can be refered to via varialbes
        - The only error for this endpoint can be unauthorised
        */
        const { data } = error.response;
        console.log("Error meesage from the /api/users/me GET request");
        console.log(`Response Message: ${data}`);

        this.setState({
          error: data, // Could use data.error but when the users token is invalid no message would be shown (Look for the solution in the error modal)
          errorModal: !this.state.errorModal
        });

        // Return false to prevent the request from continuting. Not sure if axios handles this or not.
        return false;
      }
    }
  };

  /* 
  handleBarCodeRead:
  - Destructure the data object from the scan (barcode data, used to find the item from the API or AsyncStorage)
  - Sets scanned to true and sets the isAllergicModalVisible to true
  
  Item:
  - If the item exists in AsyncStorage retrive it from there
  - Parse the data, it's technically a string. To convert it into data use JSON.parse(data goes here)
  - Set the state equal to the parsed object

  !Item
  - Send  a network request to the API
  - Check for an error. When an error occurs show the error message in the moda, return false to prevent an further execution

  No errors:
  - Deterine if the user is allergic to the item scanned
  - See notes where the functionality is performed for more information 
  */

  handleBarCodeRead = async ({ data }) => {
    this.setState({
      scanned: true,
      isAllergicModalVisible: true
    });

    const API_URL =
      "http://supermarketownbrandguide.co.uk/api/newfeed.php?json=";
    const API_KEY = "ticrk41z75yq98u7isqz";

    const Item = await AsyncStorage.getItem(data);

    if (Item) {
      // Parse the data from AsyncStorage
      const parsedData = JSON.parse(Item);
      this.setState({
        item: parsedData
      });
    } else {
      // Send get request to API endpoint and log the response
      const response = await axios.get(
        `${API_URL}barcode&q=${data}&apikey=${API_KEY}`
      );

      /* 
      error handling:

      - Checks for an error object in the response
      
      - This is due to the nasty API being used for the food source. Basically when an invalid barcode is returned instead of throwing say a 404 or a 505 it shows the resposne
        as 200. 200 HTTP status code means its valid, this is incorrect and instead of wrapping it in a try catch you have to check for error object in the data of the response.
        This is out of my control for the moment, though if I was to build by own API it would at least throw correct response codes 
      
      - When response.data.error is true set the error state equal to response.data.error to extract the message. This will alow for it to be shown in the modal

      - To prevent the thread continuing a return statement is used to prevent further execution.
      
      - When the error is no error 
      */

      if (response.data.error) {
        this.setState({
          error: response.data.error
        });

        // Return false to prevent the request from continuting. Not sure if axios handles this or not.
        return false;
      } else {
        this.setState({
          item: response.data
        });

        /* 
        Destructuring status:
        - Destructuring the state and storing them in variables
        - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
        - The item is destructured from the state
        */

        // Save the data from the respone into AsyncStorage
        const { item } = this.state;
        await AsyncStorage.setItem(data, JSON.stringify(item));
      }
    }

    /* 
    Destructuring status:
    - Destructuring the state and storing them in variables
    - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
    - The item is destructured from the state
    */
    const { item } = this.state;
    const productAllergies = item.properties.contains;
    console.log(`The products allergies are:`);
    console.log(productAllergies);

    /* 
    Destructuring status:
    - Destructuring the state and storing them in variables
    - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
    - allergies is destructured from the state
    */
    const { allergies } = this.state;
    console.log(`The users allergies are:`);
    console.log(allergies);

    /* 
    result:    
    - When a value from the users allergies is in the productAllergies it returns true.
    - When a value from the users allergies isn't in the procuctAllergies it returns false
    - After the result has been relased from the thread isAllergic state is set to the response from result
    - Log a message to show if the response is true or false (Used to check the response)

    For information about some() checkout https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    For more infromation about inlcudes() checkout https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes 
    */
    const result = await allergies.some(allergy =>
      productAllergies.includes(allergy)
    );
    this.setState({
      isAllergic: result
    });
  };

  addedItemToItemDirectory = async () => {
    // Get the current data
    const currentDirectroy = [...this.state.shoppingLists];

    // Get the scanned item
    const currentItem = { ...this.state.item };

    // Create the object which will be added to the array
    const shoppingListItem = {
      id: shortid.generate(),
      name: currentItem.title,
      properties: currentItem.properties.contains
    };

    // Push the object to the shopping lists
    currentDirectroy.push(shoppingListItem);

    await AsyncStorage.setItem(
      "ItemsDirectory",
      JSON.stringify(currentDirectroy)
    );

    this.setState({
      isSaveModalVisible: true
    });
  };

  render() {
    const {
      hasCameraPermission,
      scanned,
      error,
      errorModal,
      isAllergicModalVisible,
      isAllergic,
      isSaveModalVisible
    } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }

    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      /* 
        Component overviews with resources:

        NavigationEvents
        - onDidFocus is prop which takes a function, this is where the data which needs to be updated will go
        - For more information about this component

        View:
        - Is the wrapper, it's the equivalent of a div tag in web development the only difference being React-Natives is more messy
        - For more information about this component visit https://facebook.github.io/react-native/docs/view
                  
        MaterialDialog:
        - Custom dialog component
        - This could be replaced by the Alert.alert() but the material dialog is more cleaner and easier to read as opposed to the 
        - For more information about this component visit https://github.com/hectahertz/react-native-material-dialog
    
        BarcodeScanner:
        - Component from the expo lib, it provides barcode functionality (Don't reinvent the wheel, particuallry for a project like this)
        - Accepts a number of props, the only props used are onBarcodeScanned and style
          - onBarcodeScanned accepts a function
          - style accepts stylesheet styling

        Modal:
        - Provides a temporary screen overlay to show data
        - Shows conditionally based on the state , it's only shown when the state is updated
        - For more information about the component visit  https://facebook.github.io/react-native/docs/modal
      */

      <View style={Styles.container}>
        <NavigationEvents onDidFocus={this.onFocus} />

        {/* Error dialog */}
        <MaterialDialog
          title="Error"
          visible={errorModal}
          onOk={() => this.setState({ errorModal: !errorModal })}
          onCancel={() => this.setState({ errorModal: !errorModal })}
        >
          <Text style={ModalBody}>
            {/* error.error is the error data from the NodeJS API, if true use the message provided by the API false the user is unauthorized */}
            {error.error ? error.error : "Unauthorized access, please logout"}
          </Text>
        </MaterialDialog>

        {/* Error dialog */}
        <MaterialDialog
          title="Success"
          visible={isSaveModalVisible}
          onOk={() => {
            this.setState({
              isSaveModalVisible: !isSaveModalVisible,
              error: "",
              scanned: false,
              isAllergicModalVisible: !isAllergicModalVisible
            });
          }}
          onCancel={() => this.setState({ errorModal: !errorModal })}
        >
          <Text style={ModalBody}>
            Your item has now been saved to your items directory. You can now
            view it in the item current directory.
          </Text>
        </MaterialDialog>

        <Modal
          animationType="slide"
          transparent={false}
          visible={isAllergicModalVisible}
        >
          <View style={{ flex: 1 }}>
            <View style={{ position: "absolute", right: 0 }}>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.setState({
                    isAllergicModalVisible: !isAllergicModalVisible,
                    scanned: false,
                    error: ""
                  })
                }
              >
                <MaterialCommunityIcons name="close-circle-outline" size={60} />
              </TouchableWithoutFeedback>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                {error ? (
                  <Text style={[fonts.title3]}> {error}</Text>
                ) : (
                  <Text style={[fonts.title3]}>{this.state.item.title}</Text>
                )}
              </View>

              {error ? null : (
                <View>
                  <Image
                    source={isAllergic ? SadFace : HappyFace}
                    style={{ width: 200, height: 200 }}
                  />
                </View>
              )}

              {error ? null : (
                <View>
                  <CustomButton
                    text="Add to shopping list"
                    mode="contained"
                    compact={true}
                    colour="#0277bd"
                    onClick={this.addedItemToItemDirectory}
                    label="Add to your shopping list"
                    disabled={isAllergic}
                    style={{ padding: 50 }}
                  />
                </View>
              )}
            </View>
          </View>
        </Modal>

        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeRead}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }
}
