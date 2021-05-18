import React from 'react';
import {Text, View, Image } from 'react-native';
import styles from './styles'

import { Button } from 'react-native-elements';

const Home = ({navigation}) => {
   
    return (

       <View style={styles.container}>
           <Image 
          style={{width:420, height:180,}}
          source={require("../../assets/comida-login.jpg")}
          />
          
           <Image
          style={styles.logo}
          source={require("../../assets/logo.png")}/>

            <Button
                title="Iniciar sesión"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => navigation.navigate('Login')}
            />

            <Button
                title="Registrarse"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => navigation.navigate('Register')}
            />
        </View>
     );
   }
   
   export default Home
