// container_style.js
import { StyleSheet } from 'react-native';

const containerStyle = StyleSheet.create({
  centerContainer: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBE4E2',
    width: '100%',
  },
  moveToRightContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    paddingHorizontal: 16,
    
  },
  centerButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    height:30,
    paddingHorizontal: 16,
    
  },
});
export default containerStyle;
