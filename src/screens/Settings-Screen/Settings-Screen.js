// React dependencies
import React, {Component} from 'react';
import {Text, View, AsyncStorage, ScrollView} from 'react-native';
import { MaterialDialog } from 'react-native-material-dialog';

// Custom React components 
import CustomButton from '../../Components/UI/Button';

import axios from 'axios';

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {fonts} from '../../styles/text-utils';
import {spacing} from '../../styles/spacing-utils';
import {buttons} from '../../styles/buttons-utils';

// User-Interface Libaries
import {Divider} from 'react-native-paper';

// Action 
const Action = {marginBottom: 5, marginTop: 5};
const ActionTitle = [fonts.title3]
const ActionBody = [fonts.callout];
const ActionButton = [buttons.large];

// Divider
const DividerStyling = {height:1, marginTop:10};

//Modal 
const ModalBody = [fonts.body];

export default class SettingsScreen extends Component {

  state = {
    accountDeletionModal: false,
    dataDeletionModal: false,
    logoutModal: false,

    errorModal: false,
    successModal: false,

    error: "",
    success: "",
  }

  componentDidMount() {
    console.log("The Setting Screen Has Mounted");
  }

  // Setting the screens title
  static navigationOptions = {
    title: 'Settings',
  };

  deleteAccount = async () => {

    try {

      // Hide the accountDeletionModal
      this.setState({ accountDeletionModal: !this.state.accountDeletionModal })

      // Authorization token
      const token = await AsyncStorage.getItem('userToken'); // Wait for the promise to be resolved
      const API_URL = 'https://radiant-dusk-41662.herokuapp.com';

      // Awaiting the response from the API endpoint and set the header to have an authorization token
      const response = await axios.delete(`${API_URL}/api/users`,{
        headers: {
          "Authorization": token
        }
      });

      /* 
      Destructuring status:
      - Destructuring the state and storing them in variables
      - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
      - Destructuring the data object from the response
      */
      const {data} = response;
      console.log(data.message);
        
      this.setState({
        success: data.message,
        successModal: !this.state.successModal
      })

      console.log("The success state has been updated");
    }

    catch(error) {
        const {data} = error.response; 
        //console.log(data.message);

        this.setState({
          error: data,
          errorModal: !this.state.errorModal
        });

        console.log("The error state has been updated");


        return false;
    }
  }

  /* 
  deleteStorage:
  - Hide the dataDeletionModal
  - Delete the shoppingListItems (Not avaliable yet)
  - No need to redirect as the user is only deleting storage
  */
  deleteStorage = async () => {
    this.setState({dataDeletionModal: !this.state.dataDeletionModal}); // Hide modal again
    //await AsyncStorage.removeItem('shoppingListItems'); //Remove the data referenced in shoppingListItems. This won't remove the login token.
  }


  /* 
  goHome:
  - Navigate to the guestStack
  - Remove the users accss token  
  - Hide the successModal
  */
  goHome() {
    this.props.navigation.navigate('guestStack'); // After deleting an account go to the guestStack
    AsyncStorage.removeItem('userToken')
    this.setState({ successModal: !this.state.successModal })
  }


  render() {
    
     /* 
      Destructuring response:
      - Destructuring the state and storing them in variables
      - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
      - Destructuring the state to access them via variables
    */
    const {logoutModal, dataDeletionModal, accountDeletionModal, error, errorModal, success, successModal} = this.state;

    return (

      /* 
        Component overviews with resources:

        ScrollView:
        - Allows content to be scrolled in the event the content exceeds the screen height.
        - Often in very rare cases content will overflow the screen but not actually enable the functionlaity. To solve this add an additional view to the bottom with a fixed hieght
        - For more information about this component visit https://facebook.github.io/react-native/docs/scrollview

        View:
        - Is the wrapper, it's the equivalent of a div tag in web development the only difference being React-Natives is more messy
        - For more information about this component visit https://facebook.github.io/react-native/docs/view
                  
        Text:
        - Renders a string of text, its the equivalent of a p tag in web development
        - For more information about this component visit https://facebook.github.io/react-native/docs/text 
      */

      <ScrollView contentContainerStyle={[spacing.ContainerSpacing]}>
        <View>

          {/* Error dialog */}
          <MaterialDialog
            title="Error"
            visible={errorModal}
            onOk={() => this.setState({errorModal: !errorModal})}
            onCancel={() => this.setState({ errorModal: !errorModal })}>
            <Text style={ModalBody}>
              {error.error ? error.error : "Unauthorized, please logout"}
            </Text>
          </MaterialDialog>

          {/* Success dialog */}
          <MaterialDialog
            title="Success"
            visible={successModal}
            onOk={() => this.goHome()}
            onCancel={() => this.setState({ successModal: !successModal })}>
            <Text style={ModalBody}>
              {success}
            </Text>
          </MaterialDialog>


          {/* Account deletion dialog */}
          <MaterialDialog
            title="Account deletion"
            visible={accountDeletionModal}
            onOk={this.deleteAccount}
            onCancel={() => this.setState({ accountDeletionModal: !accountDeletionModal })}>
            <Text style={ModalBody}>
              Looks like you want to delete your account. Are you sure you want to continue?
            </Text>
          </MaterialDialog>

          {/* Logout dialog */}
          <MaterialDialog
            title="Logout"
            visible={logoutModal}
            onOk={() => this.goHome()}
            onCancel={() => this.setState({ logoutModal: !logoutModal })}>
            <Text style={ModalBody}>
              Looks like you want to logout of your account. Are you sure you want to continue?
            </Text>
          </MaterialDialog>

          {/* Local data deletion dialog */}
          <MaterialDialog
            title="Data deletion"
            visible={dataDeletionModal}
            onOk={this.deleteStorage}
            onCancel={() => this.setState({ dataDeletionModal: !dataDeletionModal })}>
            <Text style={ModalBody}>
            Looks like you want to remove all of your application data. Are you sure you want to continue?
            </Text>
          </MaterialDialog>

          <View style={Action}>
            <Text style={ActionTitle}>Account deletion</Text>
            <Text style={ActionBody}>Permanently delete your account and all of it's content</Text>
            <CustomButton 
             text="Delete account"
             mode="contained" 
             compact={true}
             styling={ActionButton} 
             colour="#FF0000" 
             onClick={() => this.setState({accountDeletionModal: !accountDeletionModal})} 
             label="Delete your account"
            />
          </View>     

          <Divider style={DividerStyling} />

          <View style={Action}>
            <Text style={ActionTitle}>Delete contents</Text>
            <Text style={ActionBody}>Permanently delete all your application contents </Text>
            <CustomButton 
             text="Delete data"
             mode="contained" 
             compact={true}
             styling={ActionButton} 
             colour="#FF0000" 
             onClick={() => this.setState({dataDeletionModal: !dataDeletionModal})} 
             label="Delete the data saved within your devices internal storage"
            />
          </View>

          <Divider style={DividerStyling} />

          <View style={Action}>
            <Text style={ActionTitle}>Logout</Text>
            <Text style={ActionBody}>End your current session, you will be redirected </Text>
            <CustomButton 
             text="Logout"
             mode="contained" 
             compact={true}
             styling={ActionButton} 
             colour="#FF0000" 
             onClick={() => this.setState({logoutModal: !logoutModal})} 
             label="Go to the homepage and end your current session"
            />
          </View>     

          <Divider style={DividerStyling} />

          <View style={{height: 50}}></View>

        </View>
      </ScrollView>
    );
  }
}