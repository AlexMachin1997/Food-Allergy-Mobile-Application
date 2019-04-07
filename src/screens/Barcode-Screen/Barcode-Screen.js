// React dependencies
import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight,
  Modal,
  Image
} from "react-native";

// Expo dependencies
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Permissions from "expo-permissions";

// Component specific styles
import Styles from "./Styles";

// Promose based HTTP Requests library
import axios from "axios";

// React-Native Vector Icons
import Octicons from "react-native-vector-icons/Octicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Custom UI components
import CustomButton from "../../Components/UI/Button";

// Component images
import HappyFace from "../../assets/Happy-face.png";
import SadFace from "../../assets/Sad-face.png";

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import { fonts } from "../../styles/text-utils";

// Modal dialog
import { MaterialDialog } from "react-native-material-dialog";
const ModalBody = [fonts.body];

export default class BarcodeScreen extends Component {
  state = {
    hasCameraPermission: null,
    name: "",
    email: "",
    phoneNumber: "",
    allergies: null,
    errorModal: false,
    error: "",
    scanned: false,
    isAllergic: false,
    item: {},
    isAllergicModalVisible: false
  };

  componentDidMount() {
    console.log("The Barcode Screen Has Mounted");
    this.requestCameraPermission();
    this.fetchCurrentUserData();
  }

  requestCameraPermission = async () => {
    /* 
  Destructuring status:
  - Destructuring the state and storing them in variables
  - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
  - Status is destructured from the permissions response
  */
    console.log("Requesting permission to use the live camera feed");
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
    console.log(`Status: ${this.state.hasCameraPermission}`);
  };

  fetchCurrentUserData = async () => {
    // Search localstorage for a key named userData
    const userData = await AsyncStorage.getItem("userData");

    // If the key exists then retrive from localStorage
    if (userData) {
      /* 
      Parsing data into an object:
      
      - When the data is fetched from storage it's not an object isntead its this:
      {"name":"Alex Machin","email":"alexmachin1997@gmail.com","allergies":[]}

      - To parse the data JSON.parse() was used to convert the data into a raw object like this:
      Object
        allergies: []
        email: "alexmachin1997@gmail.com"
        name: "Alex Machin"
      __proto__: Object

      - After parsing the data it is then switch  

      for more information about JSON.parse visit https://www.w3schools.com/js/js_json_parse.asp 
      */
      console.log("Parsed data from AsyncStorage");
      const data = JSON.parse(userData);
      console.log(data);

      this.setState({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber, //When there is no phone number it will show undefined, but once the user provides a valid number it will be updated.
        allergies: data.allergies
      });

      //Logging the values to check they are being fetched and set to the state correctly/
      console.log(
        "Local data from AsyncStorage which is avaliable in the internal state"
      );
      console.log("Your name is " + this.state.name);
      console.log("Your email is " + this.state.email);
      console.log("Your contact number is " + this.state.phoneNumber);
      console.log("Your current allergies are " + this.state.allergies);
    } else {
      try {
        // Get the token from storage, wait for the promise to resolve
        const token = await AsyncStorage.getItem("userToken"); // Wait for the promise to be resolved before

        // API Domain name
        const API_URL = "https://radiant-dusk-41662.herokuapp.com";

        // Awaiting the response from the API endpoint and set the header to have an authorization token
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
        console.log(
          "State of the data recieved from the /api/users/me request"
        );
        console.log(data);

        /* 
          Updating the user data states:
          - Setting the state equal to the response from the data
          - When the data is fetched from the API endpoint for the first time, this will be used
          - Any other requests the data will be recieved from AsyncStorage
          */
        console.log("Updating the user data states");
        this.setState({
          name: data.name,
          email: data.email,
          phoneNumber: data.phone,
          allergies: data.allergies
        });

        /* 
          Saving data to AsyncStorage:
          - AsyncStorage only accepts a string, so the data needs to be stringified
          - More info here https://facebook.github.io/react-native/docs/asyncstorage
          */
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

        /* 
        Updating the error state:
        error state is set to the data message
        errorModal is set to the opposite value of the current state
        */
        console.log("The error state has been updated");
        this.setState({
          error: data, // Could use data.error but when the users token is invalid no message would be shown (Look for the solution in the error modal)
          errorModal: !this.state.errorModal
        });

        // Return false to prevent the request from continuting. Not sure if axios handles this or not.
        return false;
      }
    }
  };

  /* */
  handleBarCodeRead = async ({ data }) => {
    this.setState({
      scanned: true,
      isAllergicModalVisible: true
    });

    const API_URL =
      "http://supermarketownbrandguide.co.uk/api/newfeed.php?json=";
    const API_KEY = "ticrk41z75yq98u7isqz";

    // Finds the item based on the reponse provided by expo
    const Item = await AsyncStorage.getItem(data);

    // Look in AsyncStorage based on the key provided
    if (Item) {
      // Parse the data from AsyncStorage
      const parsedData = JSON.parse(Item);
      this.setState({
        item: parsedData
      });

      /* 
      Destructuring status:
      - Destructuring the state and storing them in variables
      - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
      - Status is destructured from the permissions response
      */
      const { item } = this.state;
      console.log(
        `The item from AsyncStorage has now been set to the local state :`
      );
      console.log(item);
    } else {
      console.log("A network request is being performed");

      // Send get request to API endpoint and log the response
      const response = await axios.get(
        `${API_URL}barcode&q=${data}&apikey=${API_KEY}`
      );
      console.log(`The data from the response is:`);
      console.log(response.data);
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
        // Update the error state with error from the API endpoint
        this.setState({
          error: response.data.error
        });
        console.log(`An error has occured for this request: ${error}`);

        // Display the error
        /* 
        Destructuring status:
        - Destructuring the state and storing them in variables
        - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
        - Status is destructured from the permissions response
        */
        const { error } = this.state;
        console.log(`The error state has been updated to ${error}`);
        return false;
      } else {
        /* 
        Destructuring status:
        - Destructuring the state and storing them in variables
        - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
        - The item is destructured from the state
        */
        this.setState({
          item: response.data
        });

        const { item } = this.state;
        console.log(`The new item state is`);
        console.log(this.state.item);

        // AsyncStorage.setItem(key,'data') - data needs to be a string
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

    const { isAllergic } = this.state;
    console.log(`Are you allergic: ${isAllergic}`);
  };

  render() {
    const {
      hasCameraPermission,
      error,
      errorModal,
      scanned,
      isAllergic
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
      */

      <View style={Styles.container}>
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

        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.isAllergicModalVisible}
        >
          <View style={{ flex: 1 }}>
            <View style={{ position: "absolute", right: 0 }}>
              <TouchableHighlight
                onPress={() =>
                  this.setState({
                    isAllergicModalVisible: !this.state.isAllergicModalVisible,
                    scanned: false,
                    error: ""
                  })
                }
              >
                <MaterialCommunityIcons name="close-circle-outline" size={60} />
              </TouchableHighlight>
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
