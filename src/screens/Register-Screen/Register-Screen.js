//React dependencies
import React, {Component} from 'react';
import {AsyncStorage, FlatList} from 'react-native'

// Custom React components
import ProfileSetup from '../../Components/Forms/New-User/Profile-setup';
import AllergySetup from '../../Components/UI/Allergies';
import Confirmation from '../../Components/Forms/New-User/Confirmation';

export default class RegisterScreen extends Component {

    state = {
        step: 1,
        name: '',
        email: '',
        password: '',
        allergies: [],
        avaliableAllergies: []
    }
    
    // Sets the title within the header
    static navigationOptions = {
        title: 'Register',
    };

    componentDidMount() {
        console.log("The Register Screen Has Mounted");
        this.loadAllergies();
     }
    
    loadAllergies = async () => {
        
        // Look for a key in AsyncStorage named avaliableAllergies
        const avaliableAllergies = await AsyncStorage.getItem('avaliableAllergies');
    
        if(avaliableAllergies) {
            
            // When the promise resolves as true
            console.log("Allergies already exist, no need to load them again");
            
            this.setState({
                avaliableAllergies: JSON.parse(avaliableAllergies)
            })
            
            console.log("State has been updated");
            console.log(this.state.avaliableAllergies);
        
        } else {
            
            // When it doesn't exist inialize the avaliableAllergies
            console.log('Allergies not avaliable, they are going to be installed');
            const AllergiesArray = ["milk","eggs","wheat","peanuts","walnuts","brazil nuts", "almonds","hazelnuts","fish","nuts","gluten","sesame"];
            console.log(AllergiesArray)

            console.log("Allergies have successfully been saved to AsyncStorage");            
            await AsyncStorage.setItem('avaliableAllergies', JSON.stringify(AllergiesArray));

            this.setState({
                avaliableAllergies: AllergiesArray
            })
            console.log("State has been updated");
            console.log(this.state.avaliableAllergies);
        }  
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
    
    /* 
    goToLogin:
    - Goes to the login page
    - Required as this.prop.navigation.navigate cannot be accessed from the confirmation screen as its not on the stack technically
    */
    goToLogin = () => {
        console.log("Going to the login screen");
        this.props.navigation.navigate('login');
    }

    /* 
    addAllergy:
    - Takes the prevstate of allergies and spreads (copies it)
    - After copying the state the element clicked which is identified by this.state.avaliableAllergies[id] is added to the users allergies
    - The element copied into the array is then removed
    */
    addAllergy = id => {
        
        this.setState(prevState => ({
          allergies: [
            ...prevState.allergies,
            this.state.avaliableAllergies[id]
          ],
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
        Destructuring status:
        - Destructuring the state and storing them in variables
        - More info : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment     
        - Destructuring the state so they can be refered to via indvidual variables
        - Destructuring the values so they can be refered to via indvidual variables
        */
        const {step, name, email, password, allergies, avaliableAllergies} = this.state;
        const values = {name, email, password, allergies, avaliableAllergies};

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
                        addAllery={this.addAllergy}
                        removeAllergy={this.removeAllergy}
                    />
                )

            case 3:
                return (
                    <Confirmation
                        back={this.goBack}
                        values={values}
                        goToLogin={this.goToLogin}
                    />
                )      
        }
    }
}