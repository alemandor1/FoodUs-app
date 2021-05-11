import React from 'react';
import { useState } from 'react';
import {Text, View, TouchableHighlight, TextInput } from 'react-native';
import firebaseService from '../../services/firebase';
import styles from './styles'
import { icons, SIZES, COLORS, FONTS } from '../../constants'

const Separator = () => (
  <View style={styles.separator} />
);

const Register = ({navigation}) => {
 const [name, setName] = useState('')
 const [user, setUser] = useState('')
 const [pass, setPass] = useState('')

 const createNewUser = async () => {
   try {
     await firebaseService.createUser(name, user, pass)
     navigation.navigate('Main_copy')
   } catch (e) {
     alert(e)
   }
 }

  return (
    <View style={styles.container}>
        <View>
        <Text style={{...FONTS.h2, textAlign: 'center', marginTop: 20}}>Registro</Text>
        <TextInput placeholder= "Nombre"
                style={styles.inputText}
                value={name}
                onChange={(e) => setName(e.nativeEvent.text)}
                />
            <TextInput placeholder= "Correo electrónico"
                style={styles.inputText}
                value={user}
                onChange={(e) => setUser(e.nativeEvent.text)}
                />
            <TextInput placeholder= "Contraseña"
                secureTextEntry={true}
                style={styles.inputText}
                value={pass}
                onChange={(e) => setPass(e.nativeEvent.text)}
                />

        </View>
      <TouchableHighlight style={[styles.buttom, styles.loginButtom]} onPress={createNewUser}>
          <Text style={styles.textButtom}>Registrarse</Text>
      </TouchableHighlight>
      <Text style={{...FONTS.body2, textAlign: 'center'}} onPress={() => navigation.navigate('Login')}>¿Ya tienes cuenta? Inicia sesión! </Text>
    </View>
  );
}

export default Register