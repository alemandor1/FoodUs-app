import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, ListItem, Icon } from 'react-native-elements';
import { map } from 'lodash';

import { closeSession, getCurrentUser } from '../../utils/actions';
import InfoUser from '../../components/account/InfoUser';

export default function Configuration({navigation}) {

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(getCurrentUser())
    }, [])

    const generateOptions = () => {
        return [
            {
                title: "User settings",
                iconNameLeft: "settings",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => navigation.navigate('Profile')
            },
            {
                title: "Recipe history",
                iconNameLeft: "history", 
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => navigation.navigate('HistoryList')
            },
            {
                title: "Shopping list",
                iconNameLeft: "shopping-cart", 
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => navigation.navigate('ShoppingList')
            },
            {
                title: "Help",
                iconNameLeft: "help", 
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => navigation.navigate('Help')
            }
        ]
    }

    const menuOptions = generateOptions();

    return (
        <View style={styles.container} testID="list">
            {
                user && (
                    <View style={{paddingTop: "20%"}}>
                        <InfoUser
                            user={user}
                            setLoading={setLoading}
                            setLoadingText={setLoadingText}
                        />
                        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
                    >
                        <Icon
                            type="material-comunity"
                            name={menu.iconNameLeft}
                            color={menu.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-comunity"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        />
                    </ListItem>
                ))
            }
        </View>
                    </View>
                    )
            }
            <Button
                testID="buttonLogOut"
                title="Log out"
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionTitle}
                onPress={() => {
                    closeSession()
                    navigation.navigate("Home")
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        minHeight: "100%",
        backgroundColor: "#FFFFFF"
    },
    btnCloseSession : {
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: "#F94F62",
        borderTopWidth: 1,
        borderTopColor: "#F6051F",
        borderBottomWidth: 1,
        borderBottomColor: "#F6051F",
        paddingVertical: 10,
        width: "50%",
        alignSelf: "center"
    },
    btnCloseSessionTitle : {
        color: "#FFFFFF"
    },
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#a7bfd3"
    }
})