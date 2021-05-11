import React from 'react'
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation()

    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Image
                source={require("../../assets/logo.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <Button
                buttonStyle={styles.button}
                title="Ver tu perfil"
                onPress={() => navigation.navigate('Login')}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal: 30
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 10    },
    button: {
        backgroundColor: "#442484"
    }
})