//React dependencies
import React, {Component} from 'react';

// Custom React components
import ProfileSetup from '../Components/Forms/New-User/Profile-setup';
import AllergySetup from '../Components/Forms/New-User/Allergy-Setup';
import Confirmation from '../Components/Forms/New-User/Confirmation';

export default class RegisterScreen extends Component {
    state = {
      step: 1,
      name: '',
      email: '',
      password: '',
      allergies: []
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
    title: 'Register',
  };

  /* 
  goToLogin:
  - Goes to the login page
  - Required as this.prop.navigation.navigate cannot be accessed from the confirmation screen as its not on the stack technically
  */
  goToLogin = () => {
   this.props.navigation.navigate('login');
  }

  render() {

       /* 
       Object Destructuring:
        - Destructuring the state and storing them in variables
        - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment 
       */
       const {step, name, email, password, allergies} = this.state;
       const values = {name, email, password, allergies}

       /* 
       Form switching functionality:
       - Step is a variable from destruction of the state object
       - As step increments through user interaction the switch will conditionally show the neccessary components defined below
       - Each component has various props passed in:
           - ProfileSetup has access to the goForward handleChange and values, but not goBack as there is nothing to go back to.
           - AllergySetup and Confirmation both get access to the entire state
       */

       switch (step) {
           case 1: 
               return (
                   <ProfileSetup 
                       forward={this.goForward}
                       handleChange={this.handleChange}
                       values={values}
                   />
               )

           case 2: 
               return (
                   <AllergySetup
                       forward={this.goForward}
                       back={this.goBack}
                       handleChange={this.handleChange}
                       values={values}  
                   />
               )

           case 3:
               return (
                   <Confirmation
                       forward={this.goForward}
                       back={this.goBack}
                       values={values}
                       goToLogin={this.goToLogin}
                   />
               )      
       }
  }
}