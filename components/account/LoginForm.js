import React, { useState } from 'react'
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'
import { isEmpty } from 'lodash';

import { validateEmail } from '../../utils/helpers';
import { loginWithEmailAndPassword } from '../../utils/actions';
import Loading from '../Loading';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text})
    }

    const doLogin = async() => {
        if (!validateData()) {
            return;
        }

        setLoading(true)
        const result = await loginWithEmailAndPassword(formData.email, formData.password)
        setLoading(false)

        if(!result.statusResponse){
            setErrorEmail(result.error)
            setErrorPassword(result.error)
            return
        }

    navigation.navigate("Account")
    }

    const validateData = () => {
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true
    
        if(!validateEmail(formData.email)) {
          setErrorEmail("You must enter a valid email.")
          isValid = false
        }

        if(isEmpty(formData.password)){
            setErrorPassword("You must enter your password.")
            isValid = false

        }
    
        return isValid
      }

    return (
        <View style={styles.container}>
                <Input
                    containerStyle={styles.input}
                    placeholder="Enter your email..."
                    onChange={(e) => onChange(e, "email")}
                    keyboardType="email-address"
                    errorMessage={errorEmail}
                    defaultValue={formData.email}
            />
            <Input
                    containerStyle={styles.input}
                    placeholder="Enter your password..."
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
                title="Login"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => doLogin()}
            />
            <Loading isVisible={loading} text="Logging in..."/>
        </View>
    )
}

const defaultFormValues = () => {
    return { email: "", password: ""}
  }

const styles = StyleSheet.create({
    container : {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    input: {
        width: "100%"
    },
    icon : {
        color: "#c1c1c1"
    },
    btnContainer:{
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "#442484" 
    }
})