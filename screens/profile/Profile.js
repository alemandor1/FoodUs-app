import React from 'react';
import {Text, View } from 'react-native';
import { closeSession } from '../../services/actions'
import styles from './styles'
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'

const Profile = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <Text>Esta es la vista del perfil</Text>

      <Button
          title="Cerrar sesión"
          onPress={() => {
            closeSession()
            navigation.navigate("Home")}}
      />
    </View>
  );
}

export default Profile