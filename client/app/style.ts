
import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

const styles = StyleSheet.create({
    gradientContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 40,  // Reduced padding
      borderRadius: 20,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      width: '90%',  // Set specific width
      height: 'auto',  // Let height adjust automatically
    } as ViewStyle,
    itemContainer: {
      padding:5,
      marginVertical:10,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      borderRadius: 5,
      width:"100%",
      alignSelf:"flex-start",
      borderColor: 'red',
    } as ViewStyle,
    itemText: {
      fontSize: 20,
      color: '#000',
    } as TextStyle,
    itemInput:{
      fontSize: 15,
      padding:5,
      color: '#000',
      borderColor:"black",
      borderWidth:0.2,
      marginVertical:4,
      borderRadius: 2
    },
    button: {
      padding: 7,
      backgroundColor: '#ff6b8c',
      borderRadius:10,
    } as ViewStyle,
    buttonText: {
      fontSize: 20,
      color: 'white',
    } as TextStyle,
    errorText: {
      color: "red",
      marginBottom: 10,
    }as TextStyle
  });

  export default styles;