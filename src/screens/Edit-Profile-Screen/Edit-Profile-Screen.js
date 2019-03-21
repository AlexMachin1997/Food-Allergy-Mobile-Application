// React dependencies
import React, {Component} from 'react';

// Custom React components
import EditProfile from '../../Components/Forms/Edit-User/Edit-Profile';
import EditAllergies from '../../Components/Forms/Edit-User/Edit-Allergies';
import Confirmation from '../../Components/Forms/Edit-User/Confirmation';

export default class EditProfileScreen extends Component {

  state = {
    step: 1,
    name: 'Alex James Machin',
    email: 'alexmachin1997@gmail.com',
    phoneNumber: '07713758383',
    allergies: ["Wheat", "Peanuts", "Nuts"]
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