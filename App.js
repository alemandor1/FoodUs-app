import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import Home from './screens/home/Home';
import { useFonts } from 'expo-font';
import Tabs from './navigation/tabs'
import { LogBox } from 'react-native'
import Profile from './screens/profile/Profile';
import Recipe from './screens/recipe/Recipe';
import HistoryList from './screens/recipe/HistoryList';

LogBox.ignoreAllLogs()

const Stack = createStackNavigator()

const App = () => {

  const [loaded] = useFonts({
    "Roboto-Black" : require('./assets/fonts/Roboto-Black.ttf'),
    "Roboto-Bold" : require('./assets/fonts/Roboto-Bold.ttf'),
    "Roboto-Regular" : require('./assets/fonts/Roboto-Regular.ttf'),

  })
  
  if(!loaded){
    return null;
  }

  return (
    <NavigationContainer initialRouteName="Home">
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Main" component={Tabs}/>
        <Stack.Screen name="Recipe" component={Recipe}/>
        <Stack.Screen name="Favourites" component={Tabs}/>
        <Stack.Screen name="Account" component={Tabs}/>
        <Stack.Screen name="FoodList" component={Tabs}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="HistoryList" component={HistoryList}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
