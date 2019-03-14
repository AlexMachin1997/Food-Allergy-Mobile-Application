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
const paragraphs = fonts.callout;
const captions = fonts.caption1;
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
          <Text style={paragraphs}>
            Food allergy assistant was built with one objective in sight, to allow allergens to shop without worrying about their allergies.
          </Text>

          <Text style={paragraphs}>
            If you suffer from an allergy and want piece of mind then this is the right application for you.
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
              <Text style={captions}>
              Maintain a shopping list with all the items you want. (Requires you to be authenticated for suitability rating)
              </Text>
            </View>
          </View>

          <View style={flexRow}>
            <View>
              <MaterialIcon name="search" size={iconSize} color="#03a9f4"/>
            </View>

            <View style={flex.justifyContentCenter}>
              <Text style={captions}>
              Search for items via a barcode reader or live search
              </Text>
            </View>
          </View>

          <View style={flexRow}>
            <View style={images.rotate25Degrees}>
              <CommunityMaterialIcon name="bell" size={iconSize} color='#ffeb3b'/>
            </View>

            <View style={flex.justifyContentCenter}>
              <Text style={captions}>
                Get alerted when you find an item that's not suitable for you (Requires you to be authenticated)
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