import React from "react";
import { View } from "react-native";
import CustomButton from "./Button";

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import { flex } from "../../styles/flex-utils";

// Sections
const ConfirmationButtonsSection = [flex.justifyContentSpaceAround, flex.row];

const ConfirmationButtons = {
  padding: 10,
  margin: 5,
  width: 120
};

export default (ConfirmationAction = props => {
  return (
    <View style={ConfirmationButtonsSection}>
      <View>
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

      <View>
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
  );
});
