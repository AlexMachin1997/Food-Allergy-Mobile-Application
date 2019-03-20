//React dependencies
import React from 'react'

// User-Interface Libaries
import {Button} from 'react-native-paper';

export default CustomButton = (props) => {
    return (

        /* 
          Button (react-native paper):
          - This is a custom stateless button with custom props from the premade Button component provided by React-Native-Paper
          - For more information about this component visit https://callstack.github.io/react-native-paper/Buttons.html       
        */
        <Button mode={props.mode} compact={props.compact} color={props.colour} style={props.styling} onPress={props.onClick} accessibilityLabel={props.label} disabled={props.disabled}>
        {props.text} 
        </Button>  
    )
}