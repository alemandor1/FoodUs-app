import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
      marginHorizontal: 10,
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
      flex:1,
      paddingHorizontal:50,
      paddingVertical:13,
      backgroundColor: 'red'
    },
    textButtom:{
      textAlign: 'center',
      color:'#fff',
      fontSize:18
    },
    logo:{
      width: 100,
      height: 100,
      alignSelf:"center",
      marginTop: 20
    }
  });

export default styles