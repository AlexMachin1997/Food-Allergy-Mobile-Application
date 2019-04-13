// Reat dependencies
import React from "react";

/* 
Utility classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import { fonts } from "../../../styles/text-utils";

// Premade React components
import CustomButton from "../Button";

const ModalBody = [fonts.body];

import { Paragraph, Dialog, Portal } from "react-native-paper";

export default props => {
  return (
    <Portal>
      <Dialog visible={props.visible} onDismiss={props.onDismiss}>
        <Dialog.Title>{props.title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={ModalBody}>{props.text}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <CustomButton
            text="Ok"
            mode="text "
            compact={true}
            colour="green"
            onClick={props.onOk}
            label="Ok your action"
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
