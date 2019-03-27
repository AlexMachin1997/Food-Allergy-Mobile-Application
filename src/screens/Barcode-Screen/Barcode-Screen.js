
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
    error: ''
    
  }

 
  componentDidMount() {
    this.requestCameraPermission();
    this.fetchCurrentUserData();
  }

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  fetchCurrentUserData = async () => {
    
    // Search localstorage for a key named
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
      console.log("Your name is " + this.state.name);
      console.log("Your email is " + this.state.email);
      console.log("Your contact number is " + this.state.phoneNumber )
      console.log("Your current allergies are " + this.state.allergies);

    } else {

      // Navigation 
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
    
          //Destructure data from the response object
          const {data} = response.data;
          
          // Logs data from API endpoint 
          console.log(data);
    
          // Updating the state - the data from the network request 
          this.setState({
            name: data.name,
            email: data.email,
            phoneNumber: data.phone,
            allergies: data.allergies
          });

          // Raw data to be stored in AsyncStorage
          const userData = {
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
            allergies: data.allergies
          }

          // setItem(key, data)
          await AsyncStorage.setItem('userData',JSON.stringify(userData));          
      }
    
      catch(error) {
    
        // Error object contains a data object. Within that object is a response e.g. unauthorized
        const {data} = error.response; 

        // Data from the response
        console.log(`Response Message: ${data}`);

        /* 
        error state is set to the data message
        errorModal is set to the opposite value of the current state
        */
        this.setState({
          error: data, // Could use data.error but when the users token is invalid no message would be shown (Look for the solution in the error modal)
          errorModal: !this.state.errorModal
        });
      }
    }
  }



  /* 
  _handleBarCodeRead:
  - Make API call      
  */
  _handleBarCodeRead = ({data}) => {
    Alert.alert(
      'Scan successful!',
      JSON.stringify(data)
    );



    // Axios call:
    // Insert barcode string into the request
    // Await for the call to finish
    // Then compare the current users allergies to the products allergies
    // If there are some then alert the user they are allergic to it
    // If there are no tell them the item is fine for consumption
  };


  render() {

    const { hasCameraPermission, error, errorModal} = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={Styles.container}>
       
        {/* Error dialog */}
        <MaterialDialog
          title="Error"
          visible={errorModal}
          onOk={() => this.setState({errorModal: !errorModal})}
          onCancel={() => this.setState({ errorModal: !errorModal })}>
          <Text style={ModalBody}>
            {error.error ? error.error : "Unauthorized access, please logout"}
          </Text>
        </MaterialDialog>

       <BarCodeScanner
        onBarCodeScanned={this._handleBarCodeRead}
        style={StyleSheet.absoluteFill}
        />
      
      </View>
    );
  }
}