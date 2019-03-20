//React dependencies
import React from 'react'
import {Text, View, Image} from 'react-native'

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {fonts, align} from '../../styles/text-utils';
import {spacing} from '../../styles/spacing-utils';

export default Confirmation = (props) => {
    return (
        <React.Fragment>
            <View>
              <Image source={props.icon} style={{width: 300, height: 300}}/>
            </View>
            
            <View style={[spacing.ContainerSpacing]}>
                <Text style={[align.center, fonts.title3]}>
                  {props.text}
                </Text>
            </View>
        </React.Fragment>
    )
}

