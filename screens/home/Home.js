import React from 'react';
import {Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles'

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
         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
             <Text style={styles.textButtom}>Iniciar sesión</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
             <Text style={styles.textButtom}>Registrarse</Text>
         </TouchableOpacity>
       </View>
     );
   }
   
   export default Home
