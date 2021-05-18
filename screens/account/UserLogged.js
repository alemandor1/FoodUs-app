import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function UserLogged() {
    const navigation = useNavigation()

    return (
        <View>
                <Text>UserLogged...</Text>
        </View>
    )
}

const styles = StyleSheet.create({})