import React, { useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import { Avatar } from 'react-native-elements'

import { updateProfile, uploadImage } from '../../utils/actions'
import { loadImageFromGallery } from '../../utils/helpers'

export default function InfoUser({ user, setLoading, setLoadingText }) {
    const [photoUrl, setPhotoUrl] = useState(user.photoURL)

    const changePhoto = async() => {
        const result = await loadImageFromGallery([1, 1])
        if (!result.status) {
            return
        }
        setLoadingText("Updating image...")
        setLoading(true)
        const resultUploadImage = await uploadImage(result.image, "avatars", user.uid)
        if (!resultUploadImage.statusResponse) {
            setLoading(false)
            Alert.alert("An error occurred while storing the profile picture.")
            return
        }
        const resultUpdateProfie = await updateProfile({ photoURL: resultUploadImage.url })
        setLoading(false)
        if (resultUpdateProfie.statusResponse) {
            setPhotoUrl(resultUploadImage.url)
        } else {
            Alert.alert("An error occurred while updating the profile picture.")
        }
    }

    return (
        <View style={styles.container}>
            <Avatar
                rounded
                size="large"
                onPress={changePhoto}
                source={
                    photoUrl 
                        ? { uri: photoUrl }
                        : require("../../assets/avatar-default.jpg")
                }
            />
            <View style={styles.infoUser}>
                <Text style={styles.displayName}>
                    {
                        user.displayName ? user.displayName : "Anonymous"
                    }
                </Text>
                <Text>{user.email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: 'white',
        paddingVertical: 30
    },
    infoUser: {
        marginLeft: 20
    },
    displayName: {
        fontWeight: "bold",
        paddingBottom: 5
    }
})