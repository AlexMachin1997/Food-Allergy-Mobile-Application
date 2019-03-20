import React from 'react';
import {View} from 'react-native';
import CustomButton from './Button';

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {buttons} from '../../styles/buttons-utils';
import {flex} from '../../styles/flex-utils';
import {spacing} from '../../styles/spacing-utils';

//Shared styling for all forms
import styles from '../Forms/styles';

// Sections 
const ConfirmationButtonsSection = [flex.row, flex.alignItemsCenter, flex.justifyContentCenter,spacing.mediumLeft];
const ConfirmationButtonSection = [flex.flex];

const ConfirmationButtons = [buttons.large, styles.ConfirmButtons];


export default ConfirmationAction = (props) => {
    return (
        <View style={ConfirmationButtonsSection}>           
            <View style={ConfirmationButtonSection}>
                <CustomButton 
                    text="Go back" 
                    mode="contained" 
                    compact={true} 
                    colour="#0277bd" 
                    styling={ConfirmationButtons} 
                    onClick={props.goBack} 
                    label="Go back to the previous form"
                    disabled={false}
                />
            </View>     

            <View style={ConfirmationButtonSection}>
                <CustomButton 
                    text="Send" 
                    mode="contained" 
                    compact={true} 
                    colour="#0277bd" 
                    styling={ConfirmationButtons} 
                    onClick={props.action} 
                    label="Submit"
                    disabled={false}
                />
        </View>
      </View>
    )
}