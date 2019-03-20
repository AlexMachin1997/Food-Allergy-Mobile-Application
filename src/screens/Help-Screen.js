// React dependencies
import React, {Component} from 'react';
import {Text, View, ScrollView} from 'react-native';

// User-Interface Libaries
import {Divider} from 'react-native-paper';

// Custom React components
import CustomButton from '../Components/UI/Button';

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {flex} from '../styles/flex-utils';
import {fonts} from '../styles/text-utils';
import {spacing} from '../styles/spacing-utils';

// Sections
const section = [spacing.smallTop, spacing.smallBottom]

// Headings
const heading = [fonts.headline]

// Body 
const body = [fonts.body];

// Dividers
const DividerStyling = {height:1, marginTop:10};

export default class HelpScreen extends Component {

  state = {
    Section1: false,
    Section2: false,
    Section3: false,
    Section4: false,
    Section5: false  
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
    
      /* 
        Component overviews with resources:

        ScrollView:
        - Allows content to be scrolled in the event the content exceeds the screen height.
        - Often in very rare cases content will overflow the screen but not actually enable the functionlaity. To solve this add an additional view to the bottom with a fixed hieght
        - For more information about this component visit https://facebook.github.io/react-native/docs/scrollview#docsNav

        View:
        - Is the wrapper, it's the equivalent of a div tag in web development the only difference being React-Natives is more messy
        - For more information about this component visit https://facebook.github.io/react-native/docs/view
                
        Text:
        - Renders a string of text, its the equivalent of a p tag in web development
        - For more information about this component visit https://facebook.github.io/react-native/docs/text 
        
        CustomButton
        - Check the component for more information
      */
    
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
                        
            <CustomButton 
              text={!Section1 ? "Show" : "Hide"}
              mode="contained" 
              compact={true} 
              colour="#0277bd" 
              onClick={()=> this.handleToggle('Section1')} 
              label="Toggle section 1"
            />
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

            <CustomButton 
              text={!Section2 ? "Show" : "Hide"}
              mode="contained" 
              compact={true} 
              colour="#0277bd" 
              onClick={()=> this.handleToggle('Section2')} 
              label="Toggle section 2"
            />
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

            <CustomButton 
              text={!Section3 ? "Show" : "Hide"}
              mode="contained" 
              compact={true} 
              colour="#0277bd" 
              onClick={()=> this.handleToggle('Section3')} 
              label="Toggle section 3"
            />  
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
      
            <CustomButton 
              text={!Section4 ? "Show" : "Hide"}
              mode="contained" 
              compact={true} 
              colour="#0277bd" 
              onClick={()=> this.handleToggle('Section4')} 
              label="Toggle section 4"
            />

          </View>


          <Divider/>

          <View style={section}>
            <Text style={heading}>How can I add items which are suitable to my shopping list</Text>

            {Section5 ? 
              <Text style={body}> 
                Within the search tabs when you either scan a suitable items or click an add button it will be stored locally.
              </Text>:null
            }

            <CustomButton 
              text={!Section5 ? "Show" : "Hide"}
              mode="contained" 
              compact={true} 
              colour="#0277bd" 
              onClick={()=> this.handleToggle('Section5')} 
              label="Toggle section 5"
            />
          </View>
        
        </View>
      </ScrollView>
    );
  }
}