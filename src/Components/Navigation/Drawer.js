// React dependencies
import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  AsyncStorage
} from "react-native";

// Custom and pre-made React components
import Link from "./Link";
import AppIcon from "../../assets/Icon.png";
import ActionModal from "../UI/Modals/ActionModal";

export default class CustomDrawer extends Component {
  state = {
    logoutModal: false
  };

  async goHome() {
    // Go to the guestStack
    this.props.navigation.navigate("guestStack");

    // Hide the success modal after going to the guestStack
    this.setState({ logoutModal: !this.state.logoutModal });

    // Remove the users token. To access the home a JWT can't be present with AsyncStorae
    await AsyncStorage.removeItem("userToken");
  }

  render() {
    /*
    Destructuring response:
    - Destructuring the state and storing them in variables
    - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 

    - Destructure the state to access them as indvidual variables
    - Destructure navigate to access the navigate method from React-Navigation props
    */
    const { logoutModal } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ActionModal
          title="Log out"
          visible={logoutModal}
          onOk={() => this.goHome()}
          onCancel={() => this.setState({ logoutModal: !logoutModal })}
          onDismiss={() => this.setState({ logoutModal: !logoutModal })}
          text="Looks like you want to log out of your account. Are you sure you want
            to continue?"
        />

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
              action={async () =>
                await this.setState({ logoutModal: !logoutModal })
              }
              icon="exit-to-app"
              text="Log out"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
