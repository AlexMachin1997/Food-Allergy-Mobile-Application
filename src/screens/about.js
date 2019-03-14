// React dependencies
import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import CommunityMaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'


/* 
Util classes:
- To access util classes use the exported variable.
- Since the utils are objects you will need to access the properties like flex.justifyContentCenter or background.blue
*/
import {buttons} from '../styles/buttons-utils';
import {flex} from '../styles/flex-utils';
import {fonts, colours} from '../styles/text-utils';
import {spacing} from '../styles/spacing-utils';
import {background} from '../styles/background-utils';
import {images} from '../styles/image-utils';

// Component properties
const iconSize = 55;
const headings = fonts.title2;
const bodyText = fonts.body;

const bodyTextSpacing = spacing.smallBottom;
const centerHeadings = flex.alignItemsCenter;
const flexRow = flex.row;

import {Button} from 'react-native-paper';


class About extends Component {
  render() {
    return (
      <View style={[flex.enableFlex, flex.column, flex.justifyContentSpaceEvenly, spacing.ContainerSpacing]}>

        <View style={centerHeadings}>
          <Text style={headings}>
            About Food Allergy Assistant
          </Text>
        </View>

        <View>
          <Text style={[bodyText,bodyTextSpacing]}>
            Food allergy assistant was built with one objective in mind, to allow allergens to shop without worrying about their allergies.
          </Text>

          <Text style={[bodyText, bodyTextSpacing]}>
            If your suffering from allergies then Food Allergy Assistant has got covered. Have a look at some of the most benefical features below.
          </Text>        
        </View>

        <View style={centerHeadings}>
            <Text style={headings}>
              Features outline
            </Text>
        </View>

          <View style={flexRow}>
            <View>
              <MaterialIcon name="shopping-cart" size={iconSize} color='#009688'/>
            </View>

            <View style={flex.justifyContentCenter}>
              <Text style={bodyText}>
              Maintain a shopping list with all the items you want.
              </Text>
            </View>
          </View>

          <View style={flexRow}>
            <View>
              <MaterialIcon name="search" size={iconSize} color="#03a9f4"/>
            </View>

            <View style={flex.justifyContentCenter}>
              <Text style={bodyText}>
              Search for items via a barcode reader or live search.
              </Text>
            </View>
          </View>

          <View style={flexRow}>
            <View style={images.rotate25Degrees}>
              <CommunityMaterialIcon name="bell" size={iconSize} color='#ffeb3b'/>
            </View>

            <View style={flex.justifyContentCenter}>
              <Text style={bodyText}>
                Get alerted when you find an item that's not suitable for you.
              </Text>
            </View>
          </View>

          <View style={[flex.alignItemsCenter, flex.justifyContentCenter, spacing.mediumTop]}>
            <Button mode="contained" style={buttons.HomeButtons} color="#0277bd" onPress={()=> {this.props.navigation.navigate('')}}>
              Start searching
            </Button>
          </View>       
      </View>
    );
  }
}

export default About;