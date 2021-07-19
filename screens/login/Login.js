import React from 'react'
import {Text, View, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Divider } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import LoginForm from '../../components/account/LoginForm';

export default function Login() {
  return (
    <KeyboardAwareScrollView style={styles.fondo}>
        <Image
            source={require("../../assets/logo.png")}
            resizeMode="contain"
            style={styles.image}
        />
        <View style={styles.container}>
          <LoginForm/>
          <CreateAccount/>
        </View>
        <Divider style={styles.divider}/>
    </KeyboardAwareScrollView>
  )
}

function CreateAccount(props) {
  const navigation = useNavigation()
  return (
    <Text 
    style={styles.register}
    onPress={() => navigation.navigate("Register")}
    >
      Don't have an Account?{' '}
      <Text style={styles.btnRegister}>
        Sign up
      </Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  fondo: {
    backgroundColor: 'white'
  },
  image : {
    height: 150,
    width: "100%",
    marginBottom: 20,
  },
  container : {
    marginHorizontal: 40,
    backgroundColor: 'white',
  },
  register : {
    marginTop: 15,
    marginHorizontal: 10,
    alignSelf: "center"
  },
  btnRegister : {
    color: "#442484",
    fontWeight: "bold"
  },
  divider: {
    backgroundColor: "#442484",
    margin: 40
}

})
