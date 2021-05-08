import React, { useState } from 'react';
import {Text, View } from 'react-native';
import styles from './styles'
import {FONTS } from '../../constants'
import { Button, Icon, Input } from 'react-native-elements'
import { size } from 'lodash'

import { validateEmail } from '../../services/helpers'
import {getCurrentUser, registerUser } from '../../services/actions'
import Loading from '../Loading'
import { useNavigation } from '@react-navigation/native'

export default function Register()  {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(defaultFormValues())
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [errorConfirm, setErrorConfirm] = useState("")
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    const doRegisterUser = async() => {
      if (!validateData()) {
          return;
      }

      setLoading(true)
      const result = await registerUser(formData.email, formData.password)
      if (!result.statusResponse) {
          setLoading(false)
          setErrorEmail(result.error)
          return
      }

      const token = await getToken()
      const resultUser = await addDocumentWithId("users", { token }, getCurrentUser().uid)
      if (!resultUser.statusResponse) {
          setLoading(false)
          setErrorEmail(result.error)
          return
      }       

      setLoading(false)
      navigation.navigate("Main")
  }

  const validateData = () => {
      setErrorConfirm("")
      setErrorEmail("")
      setErrorPassword("")
      let isValid = true

      if(!validateEmail(formData.email)) {
          setErrorEmail("Debes de ingresar un email válido.")
          isValid = false
      }

      if(size(formData.password) < 6) {
          setErrorPassword("Debes ingresar una contraseña de al menos seis carácteres.")
          isValid = false
      }

      if(size(formData.confirm) < 6) {
          setErrorConfirm("Debes ingresar una confirmación de contraseña de al menos seis carácteres.")
          isValid = false
      }

      if(formData.password !== formData.confirm) {
          setErrorPassword("La contraseña y la confirmación no son iguales.")
          setErrorConfirm("La contraseña y la confirmación no son iguales.")
          isValid = false
      }

      return isValid
  }

  return (
    <View style={styles.container}>
        <View>
        <Text style={{...FONTS.h2, textAlign: 'center', marginTop: 20}}>Registro</Text>
        <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu email..."
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Ingresa tu contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPassword}
                defaultValue={formData.password}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                containerStyle={styles.input}
                placeholder="Confirma tu contraseña..."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "confirm")}
                errorMessage={errorConfirm}
                defaultValue={formData.confirm}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
                />

        </View>

        <Button
                title="Registrarse"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doRegisterUser()}
            />

        <Loading isVisible={loading} text="Creando cuenta..."/>

      <Text style={{...FONTS.body2, textAlign: 'center'}} onPress={() => navigation.navigate('Login')}>¿Ya tienes cuenta?
      <Text style={{fontWeight: "bold"}}> Inicia sesión!</Text>
      </Text>
    </View>
  );
}

const defaultFormValues = () => {
  return { email: "", password: "", confirm: "" }
}
