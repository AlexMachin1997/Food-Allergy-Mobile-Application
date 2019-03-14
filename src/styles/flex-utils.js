import { StyleSheet } from 'react-native'

export const flex = StyleSheet.create({
    
    enableFlex: {
        flex: 1
    },

    column: {
        flexDirection: 'column'
    },

    flexBasis: {
        flexBasis: 0
    },

    row: {
        flexDirection: 'row'
    },

    //align-items: flex-start | flex-end | center | baseline | stretch
    alignItemsStart: {
        alignItems: 'flex-start',
    },
    alignItemsCenter: {
        alignItems: 'center',
    },
    alignItemsEnd: {
        alignItems: 'flex-end',
    },
    alignItemsBaseline: {
        alignItems: 'baseline'
    },
    alignItemsStrech: {
        alignItems: 'stretch'
    },

    //justify-content: flex-start | flex-end | center | space-between | space-around | space-evenly
    justifyContetStart: {
        justifyContent: 'flex-start'
    },
    justifyContetEnd: {
        justifyContent: 'flex-end'
    },
    justifyContentCenter : {
        justifyContent: 'center'
    },
    justifyContentSpaceBetween: {
        justifyContent: 'space-between'
    },
    justifyContentSpaceAround: {
        justifyContent: 'space-around'
    },
    justifyContentSpaceEvenly: {
        justifyContent: 'space-evenly'
    },

    //align-self: auto | flex-start | flex-end | center | baseline | stretch
    alignSelfAuto: {
        alignSelf: 'auto'
    },
    alignSelfStart: {
        alignSelf: 'flex-start'

    },
     alignSelfEnd: {
        alignSelf: 'flex-end'
    }, 
    alignSelfCenter: {
        alignSelf: 'center'
    }, 
    alignSelfBaseline: {
        alignSelf: 'baseline'
    },
    alignSelfBaseline: {
        alignSelf: 'stretch'
    }
});
