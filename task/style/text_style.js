// text_style.js
import { StyleSheet } from 'react-native';

const textStyle = StyleSheet.create({
  textBoldMedium: {
    fontSize: 16,
    color: 'black',
    fontWeight:'bold',
    margin: 5,
    textAlign: 'center'
    
  },
  textBoldLarge: {
    fontSize: 21,
    color: 'black',
    fontWeight:'bold',
    margin: 5,
  },
  textsmall: {
    fontSize: 13,
    color: 'black',
    margin: 5,
  },
  textNormal: {
    fontSize: 18,
    color: 'black',
    margin: 5,
  },
  textLarge: {
    fontSize: 22,
    color: 'black',
    margin: 5,
  },
  textStyleForFilter: {
    fontSize: 18,
    color: 'tomato',
    margin: 5,
    paddingRight:20,
    textAlign:'right'
  },
});

export default textStyle;
