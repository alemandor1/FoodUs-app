import React from 'react';
import { useState } from 'react';
import {Text, View, TouchableHighlight, TextInput } from 'react-native';
import firebaseService from '../../services/firebase';
import styles from './styles'
import { icons, SIZES, COLORS, FONTS } from '../../constants'

const Separator = () => (
  <View style={styles.separator} />
);

const Login = ({navigation}) => {
 const [user, setUser] = useState('')
 const [pass, setPass] = useState('')

 const onPressLogin = async () => {
     try {
        await firebaseService.login(user, pass)
        navigation.navigate('Main')
     } catch (e) {
        alert(e)
    }
 }

  return (
    <View style={styles.container}>
        <View>
        <Text style={{...FONTS.h2, textAlign: 'center', marginTop: 20}}>Inicio de sesión</Text>
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
      <TouchableHighlight style={[styles.button, styles.loginButton]} onPress={onPressLogin}>
          <Text style={styles.textButton}>Iniciar sesión</Text>
      </TouchableHighlight>
      <Text style={{...FONTS.body2, textAlign: 'center'}} onPress={() => navigation.navigate('Register')}>¿No tienes cuenta? Regístrate</Text>
    </View>
  );
}

export default Login