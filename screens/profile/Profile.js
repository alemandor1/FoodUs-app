import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'
//import Toast from 'react-native-easy-toast'

import { closeSession, getCurrentUser } from '../../utils/actions';
import Loading from '../../components/Loading';
import InfoUser from '../../components/account/InfoUser';
import AccountOptions from '../../components/account/AccountOptions';

export default function Profile() {
    const toastRef = useRef()
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(null)
    const [reloadUser, setReloadUser] = useState(false)

    useEffect(() => {
        setUser(getCurrentUser())
        setReloadUser(false)
    }, [reloadUser])

    return (
        <View style={styles.container}>
            {
                user && (
                    <View style={{paddingTop: "20%"}}>
                        <InfoUser
                            user={user}
                            setLoading={setLoading}
                            setLoadingText={setLoadingText}
                        />
                        <AccountOptions
                        user={user}
                        setReloadUser={setReloadUser}
                        />
                    </View>
                    )
            }
            <Button
                title="Volver"
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionTitle}
                onPress={() => navigation.navigate("Configuration")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        minHeight: "100%",
        backgroundColor: 'white'
    },
    btnCloseSession : {
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: "#F4F5A9",
        borderTopWidth: 1,
        borderTopColor: "#F4F5A9",
        borderBottomWidth: 1,
        borderBottomColor: "#F4F5A9",
        paddingVertical: 10,
        width: "50%",
        alignSelf: "center"
    },
    btnCloseSessionTitle : {
        color: "#000000"
    }
})