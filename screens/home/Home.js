import React from 'react';
import {Text, View, TouchableOpacity, Image, Button, SafeAreaView } from 'react-native';
import styles from './styles'

const Separator = () => (
  <View style={styles.separator} />
);

const Home = ({navigation}) => {
   
    return (
      <SafeAreaView style={styles.container}>
        <View >
           <Image 
            style={styles.cabecera}
            source={require("../../assets/comida-login.jpg")}
          />
          </View>

          <View>
          <Image
            style={styles.logo}
            source={require("../../assets/logo.png")}
          />
          <Separator />
          <Button
            title="Iniciar sesión"
            color="#B64C41"
            onPress={() => navigation.navigate('Login')}
         />
        </View>
        <Separator />
        <View>
          <Button
            title="Registrarse"
            color="#B64C41"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </SafeAreaView>
     );
   }
   
   export default Home
