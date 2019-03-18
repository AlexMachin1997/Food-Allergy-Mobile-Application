// React dependencies
import React from 'react';
import {SafeAreaView, View, ScrollView, Text, Image} from 'react-native';

// React navigation 
import {DrawerItems} from 'react-navigation';


// Assets
import AppIcon from '../../assets/Icon.png';

const CustomDrawer = (props) => (
    <SafeAreaView style={{flex: 1}}>
        <View style={{height: 150, backgroundColor: 'white',  alignItems: 'center', justifyContent: 'center'}}>
            <Image source={AppIcon} style={{height: 120, width: 120, borderRadius: 0}}/>
        </View>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
    </SafeAreaView>
);

export default CustomDrawer;