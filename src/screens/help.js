// React dependencies
import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {buttons} from '../styles/buttons-utils';
import {flex} from '../styles/flex-utils';
import {fonts, colours} from '../styles/text-utils';
import {images} from '../styles/image-utils';
import {spacing} from '../styles/spacing-utils';

import {Button, Divider} from 'react-native-paper';

const section = [spacing.smallTop, spacing.smallBottom]
const heading = [fonts.headline]
const body = [fonts.body]

const DividerStyling = {height:1, marginTop:10};


class Help extends Component {
  constructor(props){
    super(props);
    this.state = {
      Section1: false,
      Section2: false,
      Section3: false,
      Section4: false,
      Section5: false  
    }
  }

  /* 
  Toggle function:
  - Takes 1 param, name
  - Name is the identifier for the stste which is being changed, for example Section1
  - The state is then reversed by using the   
  */
  handleToggle = (name) => {
    this.setState({
      [name]: !this.state[name] 
    });
  }  

  // Sets the title within the header
  static navigationOptions = {
    title: 'Questions and answers',
  };


  
  render() {

    // Object destructuring https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    const {Section1, Section2, Section3, Section4, Section5} = this.state;
    
    return (
      <ScrollView contentContainerStyle={[spacing.ContainerSpacing, flex.grow]}>
        <View style={{marginBottom: 50}}>

          <View style={section}>
            <Text style={heading}>Can I delete my user account and saved items ?</Text>
            
            {Section1 ?
              <Text style={body}>
                Yes, you can use the applications settings to delete your account and all data you have saved in your devices internal storage.
              </Text>
              :null
            }
                        
            <Button mode="contained" color="#0277bd" onPress={()=> this.handleToggle('Section1')} accessibilityLabel="Login with an existing account">
              {!Section1 ? "Show" : "Hide"}
            </Button>
          </View>

          <Divider style={DividerStyling}/>

          <View style={section}>
            <Text style={heading}>Why is my email required ? </Text>

            {Section2 ?
              <Text style={body}>
                Your email is required incase we need to contact users, for example when you forget your password when you need to reset it.
              </Text>
              : null
            }

            <Button mode="contained" color="#0277bd" onPress={()=> this.handleToggle('Section2')} accessibilityLabel="Login with an existing account">
              {!Section2 ? "Show" : "Hide"}
            </Button>
          </View>

          <Divider style={DividerStyling}/>

          <View style={section}>
            <Text style={heading}>Why can't I find some foods ?</Text>

            {Section3 ?
              <Text style={body}>
                Due to the application being heavily dependent on a third-party service not all foods will be available, this is because the API in use is relatively new. This may be replaced with a custom API in the future, but for now a third-party API is used
              </Text>
              : null
            }

            <Button mode="contained" color="#0277bd" onPress={()=> this.handleToggle('Section3')} accessibilityLabel="Login with an existing account">
              {!Section3 ? "Show" : "Hide"}
            </Button>
          </View>

          <Divider style={DividerStyling}/>

          <View style={section}>
            <Text style={heading}>Why was I required to sign up for a free account ?</Text>
            
            {Section4 ? 
              <Text style={body}>
                As one of the core features of the application requires access to information such as allergies you were required to create a basic profile.
              </Text>
              :null
            }
      
            <Button mode="contained" color="#0277bd" onPress={()=> this.handleToggle('Section4')} accessibilityLabel="Login with an existing account">
              {!Section4 ? "Show" : "Hide"}
            </Button>

          </View>


          <Divider/>

          <View style={section}>
            <Text style={heading}>How can I add items which are suitable to my shopping list</Text>

            {Section5 ? 
              <Text style={body}> 
                Within the search tabs when you either scan a suitable items or click an add button it will be stored locally.
              </Text>:null
            }
      
            <Button mode="contained" color="#0277bd" onPress={()=> this.handleToggle('Section5')} accessibilityLabel="Login with an existing account">
              {!Section5 ? "Show" : "Hide"}
            </Button>

          </View>
        
        </View>
      </ScrollView>
    );
  }
}

export default Help;