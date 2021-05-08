import React, { useState } from 'react';
import {View, Text} from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import styles from './styles'
import {FONTS } from '../../constants'
import { isEmpty } from 'lodash'

import { validateEmail } from '../../services/helpers'
import { loginWithEmailAndPassword } from '../../services/actions'
import Loading from '../Loading'
import { useNavigation } from '@react-navigation/native'


export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState(defaultFormValues())
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation()

  const onChange = (e, type) => {
      setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

  const doLogin = async() => {
    if (!validateData()) {
        return;
    }

    setLoading(true)
    const result = await loginWithEmailAndPassword(formData.email, formData.password)
    setLoading(false)

    if (!result.statusResponse) {
        setErrorEmail(result.error)
        setErrorPassword(result.error)
        return
    }

    navigation.navigate("account")
    }

    const validateData = () => {
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true

        if(!validateEmail(formData.email)) {
            setErrorEmail("Debes de ingresar un email válido.")
            isValid = false
        }

        if (isEmpty(formData.password)) {
            setErrorPassword("Debes de ingresar tu contraseña.")
            isValid = false
        }

        return isValid
    }

  return (
    <View style={styles.container}>
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
            <Button
                title="Iniciar Sesión"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doLogin()}
            />

      <Text style={{...FONTS.body2, textAlign: 'center'}} onPress={() => navigation.navigate('Register')}>¿No tienes cuenta?
      <Text style={{fontWeight: "bold"}}> Regístrate</Text>
      </Text>

      <Loading isVisible={loading} text="Iniciando Sesión..."/>
    </View>
  );
}

    const defaultFormValues = () => {
    return { email: "", password: "" }
    }