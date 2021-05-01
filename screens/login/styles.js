import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    inputText: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      paddingHorizontal: 20,
      color: 'black',
      backgroundColor: 'white'
    },
    button: {
      paddingVertical: 20,
      borderWidth: 1,
      borderColor: '#ccc', 
      marginTop: 10,
    },
    textButton:{
      textAlign: 'center'
    },
    loginButton:{
      backgroundColor: 'green'
    }, 
    separator: {
      marginVertical: 8,
      borderBottomColor: '#FFFFFF',
      borderBottomWidth: StyleSheet.hairlineWidth,
    }
  });

export default styles