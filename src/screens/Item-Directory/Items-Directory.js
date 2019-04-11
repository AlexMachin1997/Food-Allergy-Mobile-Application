import React, { Component } from "react";
import { ScrollView, Text, View, AsyncStorage } from "react-native";
import Card from "../../Components/UI/Cards/Food-Card";
import { Searchbar } from "react-native-paper";
import { NavigationEvents } from "react-navigation";

export default class ShoppingListScreen extends Component {
  state = {
    shoppingLists: [],
    name: "",
    email: "",
    phoneNumber: "",
    allergies: [],
    term: ""
  };

  async componentDidMount() {
    console.log("The Items Directory Has Mounted");
    await this.fetchCurrentUserData();
    await this.fetchCurrentDirectory();
  }

  onFocus = async () => {
    await this.fetchCurrentUserData();
    await this.fetchCurrentDirectory();
  };

  fetchCurrentUserData = async () => {
    // Search localstorage for a key named userData
    const userData = await AsyncStorage.getItem("userData");

    // Display
    console.log("Parsed data from AsyncStorage");
    const data = JSON.parse(userData);
    console.log(data);

    this.setState({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber, //When there is no phone number it will show undefined, but once the user provides a valid number it will be updated.
      allergies: data.allergies
    });
  };

  fetchCurrentDirectory = async () => {
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

    console.log(this.state.shoppingLists);
  };

  handleDelete = async id => {
    // Copy the state
    const currentList = [...this.state.shoppingLists];

    // Return the items which don't equal the id
    const filteredList = currentList.filter(item => item.id !== id);

    // Update the state to cause a re-render
    this.setState({
      shoppingLists: filteredList
    });

    // Store values in AsyncStorage
    await AsyncStorage.setItem("ItemsDirectory", JSON.stringify(filteredList));
  };

  static navigationOptions = {
    title: "Shopping list"
  };

  render() {
    return (
      <ScrollView>
        <NavigationEvents onDidFocus={this.onFocus} />

        <View
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            marginBottom: 3
          }}
        >
          <Searchbar
            placeholder="Start filtering"
            value={this.state.term}
            onChangeText={value =>
              this.setState({
                term: value
              })
            }
          />
        </View>

        {this.state.shoppingLists

          // Only returns values which are valid
          // -1 would mean its not within the array, so we only return when its greater than or equal to 0
          .filter(item => {
            return (
              item.name
                .toLowerCase()
                .indexOf(this.state.term.toLocaleLowerCase()) >= 0
            );
          })

          .map((data, index) => {
            const usersAllergies = this.state.allergies;
            const productAllergies = data.properties;

            return (
              <Card
                key={index}
                name={data.name}
                isAllergic={usersAllergies.some(allergy =>
                  productAllergies.includes(allergy)
                )}
                onDelete={() => this.handleDelete(data.id)}
              />
            );
          })}
      </ScrollView>
    );
  }
}
