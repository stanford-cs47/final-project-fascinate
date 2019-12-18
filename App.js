/*
* Utilized https://www.happyhues.co/palettes/3 for color scheme
*/
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Login from './Screens/Login'
import LoginWGoogle from './Screens/LoginWGoogle'
import SignIn from './Screens/SignIn'
import Guest from './Screens/Guest'
import HomeScreen from './Screens/HomeScreen'
import ArticleScreen from './Screens/Articles'
// import NotesScreen from './Screens/Notes'
import NewArticle from './Screens/NewArticle'
import MyArticles from './Screens/MyArticles.js'

// const ArticleNavigator = createBottomTabNavigator({
//   MainArticle: {screen: ArticleScreen},
//   Notes: {screen: NotesScreen},
// },
// {
//   headerMode: 'float',
//   initialRouteName: 'MainArticle',
// })

const LoginNavigator = createBottomTabNavigator({
  Login: { screen: Login },
  "Sign in": { screen: SignIn },
  "Login With Google": { screen: LoginWGoogle },
  Guest: { screen: Guest },
})

const HomeStack = createStackNavigator({
  Login: { screen: LoginNavigator },
  Home: { screen: HomeScreen },
  Articles: { screen: ArticleScreen },
  MyArticles: { screen: MyArticles },
  NewArticle: { screen: NewArticle },
},

  {
    headerMode: 'float',
    initialRouteName: 'Login',
  })

const AppContainer = createAppContainer(HomeStack);

export default AppContainer;