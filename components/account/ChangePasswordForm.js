import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty, size } from 'lodash'

import { reauthenticate, updatePassword } from '../../utils/actions'

export default function ChangePasswordForm({ setShowModal }) {
    const [newPassword, setNewPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if (!validateForm()){
            return
        }

        setLoading(true)
        const resultReauthenticate = await reauthenticate(currentPassword)

        if(!resultReauthenticate.statusResponse){
            setLoading(false)
            setErrorCurrentPassword("Incorrect password.")
            return
        }

        const resultUpdatePassword = await updatePassword(newPassword)
        setLoading(false)

        if(!resultUpdatePassword.statusResponse){
            setErrorNewPassword("There was a problem changing the password, please try again later.")
            return
        }
        
        setShowModal(false)
    }

    const validateForm = () => {
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)
        let isValid = true

        if(isEmpty(currentPassword)){
            setErrorCurrentPassword("You must enter your current password.")
            isValid = false
        }

        if(size(newPassword) < 6){
            setErrorNewPassword("You must enter a new password with at least 6 characters.")
            isValid = false
        }

        if(size(confirmPassword) < 6){
            setErrorConfirmPassword("You must enter a confirmation of your password with at least 6 characters.")
            isValid = false
        }

        if(newPassword !== confirmPassword){
            setErrorNewPassword("The new password and confirmation are not the same.")
            setErrorConfirmPassword("The new password and confirmation are not the same.")

            isValid = false
        }

        if(newPassword == currentPassword){
            setErrorCurrentPassword("You must enter a different password than the current one.")
            setErrorNewPassword("The new password and confirmation are not the same.")
            setErrorConfirmPassword("The new password and confirmation are not the same.")


            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.view}>
            <Input
                placeholder="Enter your current password..."
                containerStyle={styles.input}
                defaultValue={currentPassword}
                onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
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
            <Input
                placeholder="Enter your new password..."
                containerStyle={styles.input}
                defaultValue={newPassword}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
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
            <Input
                placeholder="Enter your new password confirmation..."
                containerStyle={styles.input}
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
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
                title="Change Password"
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