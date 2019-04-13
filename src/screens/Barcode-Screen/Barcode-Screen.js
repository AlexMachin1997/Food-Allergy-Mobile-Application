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

// ReactJS premade and custom components
import CustomButton from "../../Components/UI/Button";
import Loading from "../../Components/UI/Spinner";

import ResponseModal from "../../Components/UI/Modals/ResponseModal";
import ActionModal from "../../Components/UI/Modals/ActionModal";

// Component images
import HappyFace from "../../assets/Happy-face.png";
import SadFace from "../../assets/Sad-face.png";

/* 
Utility classes:
- To access util classes use the exported variable e.g. fonts.[object name]
*/
import { fonts, align } from "../../styles/text-utils";

// Generates a random unique ID
import shortid from "shortid";

const headings = [fonts.title3, align.center];

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

  async componentDidMount() {
    await console.log("The Barcode Screen Has Mounted");
    await this.requestCameraPermission();
    await this.fetchCurrentUserData();
    await this.fetchSuitableItems();
    await console.log("componentDidMount state");
    await console.log(this.state.shoppingLists);
  }

  onFocus = async () => {
    // Fetch the current users data when focus is true (React-Navigation Higher-Order-Component)
    await this.fetchCurrentUserData();

    // Fetch there current items directory when focus is true (React-Navigation Higher-Order-Component)
    await this.fetchSuitableItems();

    await console.log("Onfocus state");
    await console.log(this.state.shoppingLists);
  };

  fetchSuitableItems = async () => {
    // Perform a AsyncStorage based on the key provided
    const value = await AsyncStorage.getItem("ItemsDirectory");

    // When values exist parse it, else initalize an empty state
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

  fetchCurrentUserData = async () => {
    // Fetch the users data (This would need altering if there was multiple profile support)
    const userData = await AsyncStorage.getItem("userData");

    // When userData is true parse it, else perform a network request
    if (userData) {
      const data = JSON.parse(userData);

      this.setState({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        allergies: data.allergies
      });
    } else {
      try {
        // Perform an AsnycStorage request for the userToken/JWT token
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

        // Creating the user data object
        const userData = {
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          allergies: data.allergies
        };

        // Save the userData object into AsyncStorage
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

  handleBarCodeRead = async ({ data }) => {
    // scanned allows the reader to stop reading data
    this.setState({
      scanned: true,
      isAllergicModalVisible: true
    });

    const API_URL =
      "http://supermarketownbrandguide.co.uk/api/newfeed.php?json=";
    const API_KEY = "ticrk41z75yq98u7isqz";

    // Find the item based on the data object (Barcode returned from the expo barcode scanner)
    const Item = await AsyncStorage.getItem(data);

    // Check the item is true, if it's true use AsyncStorage values else perfrom an API request
    if (Item) {
      /* 
      Item:
      - Prase the data from AsyncStorage
      - Set the item object qual to the parsed Data from AsyncStorage
      - JSON.parse() is needed because AsyncStorage only stores a single value
      */
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

      - Checks for an error object in the data object inside of the response
      
      - This is due to the nasty API being used for the food source. Basically when an invalid barcode is returned instead of throwing say a 404 or a 505 it shows the resposne
        as 200. 200 HTTP status code means its valid, this is incorrect and instead of wrapping it in a try catch you have to check for error object in the data of the response.
        This is out of my control for the moment, though if I was to build by own API it would at least throw correct response codes 
      
      - When response.data.error is true set the error state equal to response.data.error to extract the message. This will alow for it to be shown in the modal

      - To prevent the thread continuing a return statement is used to prevent further execution.
      
      - When the error is no error save it to AsyncStorage, the next time the item is queried AsyncStorage will be used
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
    // Create the object which will be added to the array
    let shoppingListItem = {
      id: shortid.generate(),
      name: this.state.item.title,
      properties: this.state.item.properties.contains
    };

    /*
    Callback approach:
    - Instead of initalising a seperately variable and then pushing the variable is intalized in the callback
    - Await for the set to be set (IMPORTANT)
    - Without waiting the state wouldn't update in time.
    */
    await this.setState(({ shoppingLists }) => ({
      shoppingLists: [shoppingListItem, ...shoppingLists]
    }));

    //Save the updated currentDirectory to the ItemsDirectroy key value
    await AsyncStorage.setItem(
      "ItemsDirectory",
      JSON.stringify(this.state.shoppingLists)
    );

    this.setState({
      isSaveModalVisible: true,
      isAllergicModalVisible: false
    });
  };

  modalHandler = async () => {
    await this.setState(({ isSaveModalVisible }) => ({
      isSaveModalVisible: !isSaveModalVisible,
      error: "",
      scanned: false
    }));
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
      return <Loading />;
    }

    if (hasCameraPermission === false) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginRight: 10,
            marginLeft: 10
          }}
        >
          <View>
            <Text style={[fonts.title3]}>
              Looks like you don't want your camera to be access. Why not try
              live search ?
            </Text>
          </View>

          <View>
            <CustomButton
              text="Go to Live Search"
              mode="contained"
              compact={true}
              styling={{ marginTop: 30 }}
              colour="#0277bd"
              onClick={() => this.props.navigation.navigate("Feed")}
              label="Navigate to the live search screen"
              disabled={false}
              style={{ padding: 50 }}
            />
          </View>
        </View>
      );
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

        <ResponseModal
          title="Error"
          visible={errorModal}
          onOk={() => this.setState({ errorModal: !errorModal })}
          onDismiss={() => this.setState({ errorModal: !errorModal })}
          text={
            error.error ? error.error : "Unauthorized access, please logout"
          }
        />

        <ResponseModal
          title="Success"
          visible={isSaveModalVisible}
          onOk={() => this.modalHandler()}
          onDismiss={() => this.modalHandler()}
          text="Your item has now been saved to your items directory."
        />

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isAllergicModalVisible}
        >
          <View style={{ flex: 1 }}>
            <View style={{ position: "absolute", right: 0 }}>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.setState({
                    isAllergicModalVisible: !this.state.isAllergicModalVisible,
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
                  <Text style={headings}> {error}</Text>
                ) : (
                  <Text style={headings}>{this.state.item.title}</Text>
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
                    //onClick={()=> this.handleToggle('Section1')}
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
