import React, { Component } from 'react'
import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa1IhljkE5BGzLhx_AWLIb4uRvPDhE9tE",
  authDomain: "ryansale-b0b97.firebaseapp.com",
  projectId: "ryansale-b0b97",
  storageBucket: "ryansale-b0b97.appspot.com",
  messagingSenderId: "935213998931",
  appId: "1:935213998931:web:55d360869f98213a2937a6",
  measurementId: "G-4HQD5K086K"
};

if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

import { StyleSheet, Text, View, Image, SafeAreaView, TouchableOpacity } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'

const Stack = createStackNavigator()

export class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      loaded: false,
    }
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }

  render() {
    const { loggedIn, loaded } = this.state
    if(!loaded){
      return(
        <View style={ styles.container }>
          <Text>Loading...</Text>
        </View>

      )
    }
    
    if(!loggedIn){
      return (
          <NavigationContainer>
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen name="Landing" component={ LandingScreen } options={{ headerShown: false }}/>
          <Stack.Screen name="Register" component={ RegisterScreen } />
        </Stack.Navigator>
      </NavigationContainer>
      )
    }

    return (
      <View style={ styles.container }>
          <Text>User is logged in.</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default App