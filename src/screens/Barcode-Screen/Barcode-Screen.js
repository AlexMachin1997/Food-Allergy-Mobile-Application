import React, {Component} from 'react';
import {Text, View, Alert, StyleSheet} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import Styles from './Styles';

export default class BarcodeScreen extends Component {

  state = {
    hasCameraPermission: null
  }

 
  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };


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

    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={Styles.container}>
       <BarCodeScanner
        onBarCodeScanned={this._handleBarCodeRead}
        style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }
}
