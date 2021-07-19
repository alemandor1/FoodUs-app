import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import RegisterForm from '../../components/account/RegisterForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'
import { Divider } from 'react-native-elements'


export default function Register() {
  const navigation = useNavigation()
  return (
    <KeyboardAwareScrollView style={styles.fondo}>
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
          Have an Account?{' '}
        <Text style={styles.btnLogin}>
            Sign in
        </Text>
      </Text>
      <Divider style={styles.divider}/>

    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  fondo: {
    backgroundColor: 'white'
  },
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
  },
  divider: {
    backgroundColor: "#442484",
    margin: 40
}

})