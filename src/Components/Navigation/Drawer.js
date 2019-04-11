// React dependencies
import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  AsyncStorage
} from "react-native";

// Modal
import { MaterialDialog } from "react-native-material-dialog";
const ModalBody = [fonts.body];

// Navigation components and assets
import Link from "./Link";
import AppIcon from "../../assets/Icon.png";

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import { fonts } from "../../styles/text-utils";

export default class CustomDrawer extends Component {
  state = {
    logoutModal: false,
    success: "",
    successModal: false
  };

  /* 
  goHome:
  - Navigate to the guestStack
  - Remove the users accss token  
  - Hide the successModal
  */
  goHome() {
    this.props.navigation.navigate("guestStack"); // After deleting an account go to the guestStack
    AsyncStorage.removeItem("userToken");
    this.setState({ successModal: !this.state.successModal });
  }

  render() {
    const { logoutModal, successModal, success } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {/* Success dialog */}
        <MaterialDialog
          title="Success"
          visible={successModal}
          onOk={() => this.goHome()}
          onCancel={() => this.setState({ successModal: !successModal })}
        >
          <Text style={ModalBody}>{success}</Text>
        </MaterialDialog>

        {/* Logout dialog */}
        <MaterialDialog
          title="Logout"
          visible={logoutModal}
          onOk={() => this.goHome()}
          onCancel={() => this.setState({ logoutModal: !logoutModal })}
        >
          <Text style={ModalBody}>
            Looks like you want to logout of your account. Are you sure you want
            to continue?
          </Text>
        </MaterialDialog>

        <View
          style={{
            height: 150,
            backgroundColor: "white",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
            marginBottom: 20
          }}
        >
          <Image
            source={AppIcon}
            style={{ height: 120, width: 120, borderRadius: 0 }}
          />
        </View>

        <ScrollView>
          <View>
            <Link
              action={() => navigate("search")}
              icon="search"
              text="Search for foods"
            />
            <Link
              action={() => navigate("edit")}
              icon="person"
              text="Edit profile"
            />

            <Link
              action={() => navigate("settings")}
              icon="settings"
              text="Settings"
            />

            <Link
              action={() => navigate("help")}
              icon="help-outline"
              text="Q&A section"
            />

            <Link
              action={() => this.setState({ logoutModal: !logoutModal })}
              icon="exit-to-app"
              text="Logout"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
