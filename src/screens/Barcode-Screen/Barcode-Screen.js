
import React, {Component} from 'react';
import {Text, View, Alert, StyleSheet, AsyncStorage} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import Styles from './Styles';
import { MaterialDialog } from 'react-native-material-dialog';
import axios from 'axios';


/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {fonts} from '../../styles/text-utils';

//Modal styles
const ModalBody = [fonts.body];

export default class BarcodeScreen extends Component {

  state = {
    hasCameraPermission: null,
    
    name: '',
    email: '',
    phoneNumber: '',
    allergies: null,
    
    errorModal: false,
    error: '',
    scanned: false
  }

 
  componentDidMount() {
    console.log("The component has mounted and is performing the tasks specified");
    this.requestCameraPermission();
    this.fetchCurrentUserData();
  }

  requestCameraPermission = async () => {

  /* 
  Destructuring status:
  - Destructuring the state and storing them in variables
  - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
  - status is destructured from the permissions response
  */
  console.log("Requesting permission to use the live camera feed");
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
    console.log(`Status ${this.state.hasCameraPermission}`);
  };

  fetchCurrentUserData = async () => {
    
    // Search localstorage for a key named userData
    const userData = await AsyncStorage.getItem('userData');

    // If the key exists then retrive from localStorage 
    if(userData) {

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
      console.log("Parsed data from AsyncStorage")
      const  data = JSON.parse(userData);
      console.log(data);

      this.setState({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber, //When there is no phone number it will show undefined, but once the user provides a valid number it will be updated.
        allergies: data.allergies,      
      })

      //Logging the values to check they are being fetched and set to the state correctly/
      console.log("Local data from AsyncStorage which is avaliable in the internal state");
      console.log(`Your name is  ${this.state.name}`);
      console.log("Your email is " + this.state.email);
      console.log("Your contact number is " + this.state.phoneNumber )
      console.log("Your current allergies are " + this.state.allergies);

    } else {

      try {    

          // Get the token from storage, wait for the promise to resolve
          const token = await AsyncStorage.getItem('userToken'); // Wait for the promise to be resolved before
          
          // API Domain name
          const API_URL = 'https://radiant-dusk-41662.herokuapp.com';
          
          // Awaiting the response from the API endpoint and set the header to have an authorization token
          const response = await axios.get(`${API_URL}/api/users/me`,{
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
          const {data} = response.data;          
          console.log("State of the data recieved from the /api/users/me request")
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
          }
          await AsyncStorage.setItem('userData',JSON.stringify(userData));          
      }
    
      catch(error) {

        /* 
        Destructuring response:
        - Destructuring the state and storing them in variables
        - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
        - Destructure the data object from the error response object so they can be refered to via varialbes
        - The only error for this endpoint can be unauthorised
        */
        const {data} = error.response; 
        console.log("Error meesage from the /api/users/me GET request")
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
  }

  /* 
  handleBarCodeRead:
  - Make API call      
  */
  handleBarCodeRead = ({data}) => {
    
    this.setState({scanned: true});

    Alert.alert(
      'Scan successful!',
      JSON.stringify(data),
      [
        {
          text: 'Continue',
          onPress: () => this.setState({scanned: false}),
          style: 'cancel'
        },
      ],
    );    

    // Axios call:
    // Insert barcode string into the request
    // Await for the call to finish
    // Then compare the current users allergies to the products allergies
    // If there are some then alert the user they are allergic to it
    // If there are no tell them the item is fine for consumption
  };

  render() {

    const { hasCameraPermission, error, errorModal, scanned} = this.state;

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
          onOk={() => this.setState({errorModal: !errorModal})}
          onCancel={() => this.setState({ errorModal: !errorModal })}>
          <Text style={ModalBody}>

            {/* error.error is the error data from the NodeJS API, if true use the message provided by the API false the user is unauthorized */}
            {error.error ? error.error : "Unauthorized access, please logout"}

          </Text>
        </MaterialDialog>

        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeRead}
          style={StyleSheet.absoluteFill}
        />
      
      </View>
    );
  }
}