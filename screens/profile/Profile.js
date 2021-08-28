import React, { useState, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements';

import { getCurrentUser } from '../../utils/actions';
import InfoUser from '../../components/account/InfoUser';
import AccountOptions from '../../components/account/AccountOptions';

export default function Profile({navigation}) {

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
                testID="buttonReturn"
                title="Return"
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