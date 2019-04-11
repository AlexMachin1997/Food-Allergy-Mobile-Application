import React from 'react';
import {TextInput} from 'react-native'

export default CustomInput = (props) => {
    return (

         /* 
          Component overview with resource:
          
          TextInput:
          - Is a text input field with numerous props to use, its the equivalent of input tag in web development 
          - For additional information about the props allowed visist https://facebook.github.io/react-native/docs/textinput

        */         
        <TextInput
            placeholder={props.placeholder}
            value={props.value}
            onChangeText = {props.onChange}
            secureTextEntry={props.isSecure}
            style={props.style}
            multiline={props.isMultiline}
            keyboardType={props.keyboardType}
      />   
    )
}