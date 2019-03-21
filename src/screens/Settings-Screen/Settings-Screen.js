// React dependencies
import React, {Component} from 'react';
import {Text, View, AsyncStorage, ScrollView} from 'react-native';
import { MaterialDialog } from 'react-native-material-dialog';

// Custom React components 
import CustomButton from '../../Components/UI/Button';


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
const ModalBody = [fonts.body]

export default class SettingsScreen extends Component {

  state = {
    accountDeletionModal: false,
    dataDeletionModal: false,
    logoutModal: false
  }

  // Setting the screens title
  static navigationOptions = {
    title: 'Settings',
  };

  deleteAccount = async () => {
    this.setState({accountDeletionModal: !this.state.accountDeletionModal});
    this.props.navigation.navigate('guestStack');
  }

  logout = async () => {
    this.setState({logoutModal: !this.state.logoutModal});
    this.props.navigation.navigate('guestStack');
  }

  deleteStorage = async () => {
    this.setState({dataDeletionModal: !this.state.dataDeletionModal});
    this.props.navigation.navigate('guestStack');
  }

  render() {

    const {logoutModal, dataDeletionModal, accountDeletionModal} = this.state;

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

           <MaterialDialog
            title="Logout"
            visible={logoutModal}
            onOk={this.logout}
            onCancel={() => this.setState({ logoutModal: !logoutModal })}>
            <Text style={ModalBody}>
              Looks like you want to logout of your account. Are you sure you want to continue?
            </Text>
          </MaterialDialog>

          <MaterialDialog
            title="Account deletion"
            visible={accountDeletionModal}
            onOk={this.deleteAccount}
            onCancel={() => this.setState({ accountDeletionModal: !accountDeletionModal })}>
            <Text style={ModalBody}>
              Looks like you want to delete your account. Are you sure you want to continue?
            </Text>
          </MaterialDialog>

          
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