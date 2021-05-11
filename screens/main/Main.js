import React from 'react';
import { useEffect, useState } from 'react';
import {Text, View } from 'react-native';
//import firebaseService from '../../utils/firebase';
import styles from './styles'

const Main = () => {
  const [name, setName] = useState('')
  useEffect(() => {
   (
     async () => {
       try {
         const userData = await firebaseService.getUser()
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