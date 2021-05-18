import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { Button } from 'react-native-elements';

export default function Home () {
    const navigation = useNavigation()
    return (

       <View style={styles.container}>
            <Image 
                style={styles.cabecera}
                source={require("../../assets/comida-login.jpg")}
            />
          
            <Image
                style={styles.logo}
                source={require("../../assets/logo.png")}
            />

            <Button
                title="Iniciar sesión"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => navigation.navigate('Login')}
            />

            <Button
                title="Registrarse"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => navigation.navigate('Register')}
            />
        </View>
     );
   }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    cabecera: {
        width:"100%",
        height: "25%",
    },
    logo:{
      width: 100,
      height: 100,
      alignSelf:"center",
      marginTop: 20
    },
    btnContainer:{
      marginTop: 20,
      width: "70%",
      alignSelf: "center"
  },
    btn: {
      backgroundColor: "#C64755"
  }
  });