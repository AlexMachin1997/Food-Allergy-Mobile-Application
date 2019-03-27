// React dependencies
import React, {Component} from 'react';
import {AsyncStorage, ActivityIndicator, View} from 'react-native';
import axios from 'axios'

// Custom React components
import EditProfile from '../../Components/Forms/Edit-User/Edit-Profile';
import EditAllergies from '../../Components/Forms/Edit-User/Edit-Allergies';
import Confirmation from '../../Components/Forms/Edit-User/Confirmation';

export default class EditProfileScreen extends Component {

  state = {
    step: 1,
    name: '',
    email: '',
    phoneNumber: null,
    allergies: null,

    errorModal: false,
    error: ''
  }

  componentDidMount() {
    this.getMyData();
  }

  
  getMyData = async () => {
   
    // Search localstorage for a key named
    const userData = await AsyncStorage.getItem('userData');

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

      - After parsing the data it is then set to the state s othe component can access it  

      for more information about JSON.parse visit https://www.w3schools.com/js/js_json_parse.asp 
      */
    
      console.log("Parsed data from AsyncStorage")
      const  data = JSON.parse(userData);
      console.log(data);

      this.setState({
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        allergies: data.allergies,      
      })

      //Logging the values to check they are being fetched and set to the state correctly/
      console.log("Local data from AsyncStorage which is avaliable in the internal state");
      console.log("Your name is " + this.state.name);
      console.log("Your email is " + this.state.email);
      console.log("Your contact number is " + this.state.phoneNumber);
      console.log("Your current allergies are " + this.state.allergies);
  }
   
  /*
  goForward:
  - Destructing step number
  - +1 to the current step number. For example your on step 1, click the goBack button it will change to 2 rendering the component associated with that number.
  */    
  goForward = () => {
    const {step} = this.state;
    this.setState({
        step: step + 1
    })
  }

  /*
  goBack:
  - Destructing step number
  - -1 to the current step number. For example your on step 2, click the goBack button it will change to 1 rendering the component associated with that number.
  */
  goBack = () => {
    const {step} = this.state;
    this.setState({
        step: step - 1
    })
  }

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
    })
  }

  // Sets the title within the header
  static navigationOptions = {
    title: 'Edit Profile',
  };

  /* 
  goToSearch:
  - Goes to the login page
  - Required as this.prop.navigation.navigate cannot be accessed from the confirmation screen as its not on the stack technically
  */
  goToSearch = () => {
    this.props.navigation.navigate('search');
  }

  render() {
  
    /* 
    Object Destructuring:
    - Destructuring the state and storing them in variables
    - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
    */
    const {step, name, email, phoneNumber, allergies} = this.state;
    const values = {name, email, phoneNumber, allergies};


    if(!name, !email, !phoneNumber, !allergies) {
      return (
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff"/>
       </View>
      )       
    }


    switch(step) {
      
      case 1: 
        return (
          <EditProfile 
            forward={this.goForward}
            handleChange={this.handleChange}
            values={values}
          />
        ) 
      
      case 2:
        return (
          <EditAllergies
            forward={this.goForward}
            back={this.goBack}
            handleChange={this.handleChange}
            value={values}
          />
        )

      case 3: 
          return (
            <Confirmation
              back={this.goBack}
              values={values}
              goToSearch={this.goToSearch}
            /> 
          )
    }
  }
}