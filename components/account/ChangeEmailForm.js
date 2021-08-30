import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty } from 'lodash'

import { validateEmail } from '../../utils/helpers'
import { reauthenticate, updateEmail } from '../../utils/actions'

export default function ChangeEmailForm({ email, setShowModal, setReloadUser }) {
    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if (!validateForm()){
            return
        }

        setLoading(true)
        const resultReauthenticate = await reauthenticate(password)

        if(!resultReauthenticate.statusResponse){
            setLoading(false)
            setErrorPassword("Incorrect password.")
            return
        }

        const resultUpdateEmail = await updateEmail(newEmail)
        setLoading(false)

        if(!resultUpdateEmail.statusResponse){
            setErrorEmail("It cannot be changed by this email, it is already in use by another user.")
            return
        }
        
        setReloadUser(true)
        setShowModal(false) 
    }

    const validateForm = () => {
        setErrorEmail(null)
        setErrorPassword(null)
        let isValid = true

        if(!validateEmail(newEmail)){
            setErrorEmail("You must enter a valid email.")
            isValid = false
        }

        if(newEmail == email){
            setErrorEmail("You must enter a different email than the current one.")
            isValid = false
        }

        if(isEmpty(password)){
            setErrorPassword("You must enter your password.")
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Enter the new email..."
                containerStyle={styles.input}
                defaultValue={email}
                keyboardType="email-address"
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                rightIcon={{
                    type: "material-community",
                    name: "email",
                    color: "#c2c2c2"
                }}
            />
            <Input
                placeholder="Enter your password..."
                containerStyle={styles.input}
                defaultValue={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Icon
                        type= "material-community"
                        name={ setShowPassword ? "eye-off-outline" : "eye-outline" }
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Change Email"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    btnContainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#442484"
    }
})