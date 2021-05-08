import React from 'react';
import { useEffect, useState } from 'react';
import {Text, View } from 'react-native';
import {getUser } from '../../services/actions'
import styles from './styles'

const Main = () => {
  const [name, setName] = useState('')
  useEffect(() => {
   (
     async () => {
       try {
         const userData = await getUser()
         setName(userData)
       } catch (e) {
         alert(e)
       }
     }
     )()
  }, [])
  return (
    <View style={styles.container}>
      <Text>{`Bienvenido ${name}!!!`}</Text>
    </View>
  );
}

export default Main