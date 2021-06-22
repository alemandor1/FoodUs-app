import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, ScrollView, Image, View } from 'react-native'
import Loading from '../../components/Loading'
import { getCurrentUser } from '../../utils/actions'
import { useFocusEffect } from '@react-navigation/native'

import UserGuest from './UserGuest'
import Main_copy from '../main/Main_copy'

export default function Account() {
    const [login, setLogin] = useState(null)

    useFocusEffect (
        useCallback (() => {
            const user = getCurrentUser()
            user ? setLogin(true) : setLogin(false)
        }, [])
    )

    if (login == null){
        return <Loading isVisible={true} text="Cargando..."/>
    }

    return login ? <Main_copy/> : <UserGuest/>
}

const styles = StyleSheet.create({})