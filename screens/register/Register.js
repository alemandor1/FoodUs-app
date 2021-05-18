import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import RegisterForm from '../../components/account/RegisterForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'

export default function Register() {
  const navigation = useNavigation()
  return (
    <KeyboardAwareScrollView>
        <Image
            source={require("../../assets/logo.png")}
            resizeMode="contain"
            style={styles.image}
        />
      <RegisterForm/>

      <Text 
          style={styles.login}
          onPress={() => navigation.navigate("Login")}
      >
          ¿Ya tienes una cuenta?{' '}
        <Text style={styles.btnLogin}>
            Inicia sesión
        </Text>
      </Text>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  image : {
    height: 150,
    width: "100%",
    marginBottom: 20
  },
  login : {
    marginTop: 15,
    marginHorizontal: 10,
    alignSelf: "center"
  },
  btnLogin : {
    color: "#442484",
    fontWeight: "bold"
  }

})