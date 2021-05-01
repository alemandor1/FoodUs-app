import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white'
    },
   
    logo:{
      width: 100,
      height: 100,
      alignSelf:"center",
      marginTop: 20
    },

    separator: {
      marginVertical: 8,
      borderBottomColor: '#FFFFFF',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },

    cabecera: {
      width: 200,
      height: 100,
    }

  });

export default styles