import { StyleSheet } from 'react-native'
import { human } from 'react-native-typography'

export const fonts = StyleSheet.create({
  largeTitle: {
    ...human.largeTitle
  },
  title1: {
    ...human.title1
  },
  title2: {
    ...human.title2
  },
  title3: {
    ...human.title3
  },
  headline: {
    ...human.headline
  },
  body: {
    ...human.body
  },
  callout: {
    ...human.callout
  },
  subhead: {
    ...human.subhead
  },
  footnote: {
    ...human.footnote
  },
  caption1: {
    ...human.caption1
  },
  caption2: {
    ...human.caption2
  }
});

export const colours = StyleSheet.create({
  red: {
      color: '#f44336'
  },
  white: {
     color: 'white'
  },
  green:{ 
      color: '#a5d6a7'
  },
  blue: {
      color: '#0277bd'
  }
});


export const align = StyleSheet.create({
  right: {
    textAlign: 'right'
  },
  left: {
    textAlign: 'left'
  },
  center: {
    textAlign: 'center'
  }
})

