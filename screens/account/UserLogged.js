import React from 'react'
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native'
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'

import { closeSession } from '../../utils/actions';


export default function UserLogged() {
    const navigation = useNavigation()

    return (
        <View>
                <Text>UserLogged...</Text>
                <Button
                    title="Cerrar sesión"
                    onPress={() => {
                        closeSession()
                        navigation.navigate("Home")
                    }}
                />
        </View>
    )
}

const styles = StyleSheet.create({})