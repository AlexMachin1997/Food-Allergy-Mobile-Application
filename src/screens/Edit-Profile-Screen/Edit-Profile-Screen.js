// React dependencies
import React, { Component } from "react";
import { AsyncStorage, ActivityIndicator, View } from "react-native";

// Custom React components
import EditProfile from "../../Components/Forms/Edit-User/Edit-Profile";
import EditAllergies from "../../Components/Forms/Allergies";
import Confirmation from "../../Components/Forms/Edit-User/Confirmation";
import Spinner from "../../Components/UI/Spinner";

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import { flex } from "../../styles/flex-utils";

export default class EditProfileScreen extends Component {
  state = {
    step: 1,
    name: "",
    email: "",
    phoneNumber: null,
    allergies: [],
    avaliableAllergies: [],
    errorModal: false,
    error: "",
    loading: true
  };

  // Sets the title within the header
  static navigationOptions = {
    title: "Edit Profile"
  };

  componentDidMount() {
    console.log("The Edit Profile Screen Has Mounted");
    this.getMyData();
  }

  getMyData = async () => {
    // Search localstorage for a key named
    const userData = await AsyncStorage.getItem("userData");
    const avaliableAllergies = await AsyncStorage.getItem("avaliableAllergies");

    /* 
    Parsing data into an object:
    
    - When the data is fetched from storage it's not an object isntead its this (FYI Its not a raw object):
    {"name":"Alex Machin","email":"alexmachin1997@gmail.com","allergies":[]}

    - To parse the data JSON.parse() was used to convert the data into a raw object like this:
      Object
        allergies: []
        email: "alexmachin1997@gmail.com"
        name: "Alex Machin"
      __proto__: Object

    - After parsing the data it is then set to the state s othe component can access it  

    for more information about JSON.parse visit https://www.w3schools.com/js/js_json_parse.asp 
    */

    console.log("Parsed data from AsyncStorage");

    const data = JSON.parse(userData); //Parses user data
    const allergyData = JSON.parse(avaliableAllergies); // Parses the avaliableAllergies

    console.log("Your user data is:");
    console.log(data);

    console.log("The avaliable allergies are:");
    console.log(allergyData);

    this.setState({
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      allergies: data.allergies,
      avaliableAllergies: allergyData,
      loading: false
    });

    //Logging the values to check they are being fetched and set to the state correctly
    console.log(
      "Local data from AsyncStorage which is avaliable in the internal state"
    );
    console.log("Your name is " + this.state.name);
    console.log("Your email is " + this.state.email);
    console.log("Your contact number is " + this.state.phoneNumber);
    console.log("Your current allergies are " + this.state.allergies);
    console.log("The avaliable allergies are " + this.state.avaliableAllergies);
  };

  /*
  goForward:
  - Destructing step number
  - +1 to the current step number. For example your on step 1, click the goBack button it will change to 2 rendering the component associated with that number.
  */
  goForward = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  /*
  goBack:
  - Destructing step number
  - -1 to the current step number. For example your on step 2, click the goBack button it will change to 1 rendering the component associated with that number.
  */
  goBack = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  /* 
  handleChange:
  - Takes two params an id and value 
  - the id is the destrcutred variable named which is referenced via a string
  - value is the value of the input field the function is being used on
  -Sets the inputs own internal state equal to the state provided
  */
  handleChange = (id, value) => {
    this.setState({
      [id]: value
    });
  };

  /* 
  goToSearch:
  - Goes to the search tabs
  - Required as this.prop.navigation.navigate cannot be accessed from the confirmation screen as its not on the stack technically
  */
  goToSearch = () => {
    this.props.navigation.navigate("search");
  };

  /* 
  addAllergy:
  - Takes the prevstate of allergies and spreads (copies it)
  - After copying the state the element clicked which is identified by this.state.avaliableAllergies[id] is added to the users allergies
  - The element copied into the array is then removed
  */
  addAllergy = id => {
    this.setState(prevState => ({
      allergies: [...prevState.allergies, this.state.avaliableAllergies[id]],
      avaliableAllergies: [
        ...prevState.avaliableAllergies.slice(0, id),
        ...prevState.avaliableAllergies.slice(id + 1)
      ]
    }));
  };

  /* 
  removeAllergy:
  - Takes the prevstate of avaliableAllergies and spreads (copies it)
  - After copying the state the element clicked which is identified by this.state.allergies[id] is added to the users allergies
  - The element copied into the array is then removed
  */
  removeAllergy = id => {
    this.setState(prevState => ({
      avaliableAllergies: [
        ...prevState.avaliableAllergies,
        this.state.allergies[id]
      ],

      allergies: [
        ...prevState.allergies.slice(0, id),
        ...prevState.allergies.slice(id + 1)
      ]
    }));
  };

  render() {
    /* 
    Object Destructuring:
    - Destructuring the state and storing them in variables
    - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
    */
    const {
      step,
      name,
      email,
      phoneNumber,
      allergies,
      avaliableAllergies,
      loading
    } = this.state;

    const values = { name, email, phoneNumber, allergies, avaliableAllergies };

    // If any of the values are empty return a loading spinner
    if (loading) {
      return <Spinner />;
    }

    switch (step) {
      case 1:
        return (
          <EditProfile
            forward={this.goForward}
            handleChange={this.handleChange}
            values={values}
          />
        );

      case 2:
        return (
          <EditAllergies
            forward={this.goForward}
            back={this.goBack}
            handleChange={this.handleChange}
            values={values}
            addAllery={this.addAllergy}
            removeAllergy={this.removeAllergy}
          />
        );

      case 3:
        return (
          <Confirmation
            back={this.goBack}
            values={values}
            goToSearch={this.goToSearch}
          />
        );
    }
  }
}
