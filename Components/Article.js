import React, { Component } from 'react'
import PropTypes from 'prop-types' //consider using this!
import { StyleSheet, Dimensions, SafeAreaView, Button, Text, TextInput, Linking, Image, TouchableOpacity } from 'react-native'
// import { FontAwesome } from '@expo/vector-icons';
import { Keyboard } from 'react-native';
// import { Metrics, Colors } from '../Themes';
import { material } from 'react-native-typography';

const { width, height } = Dimensions.get('window')

export default function Article(props) {
  let propsUrl = props.image;
  return (
    <SafeAreaView style={[styles.container, styles.marginBox]}>

      <Text style={[styles.font18, material.display3, styles.headline]}>{props.title}</Text>

      <Text style={[styles.font12, material.body2, styles.fontGray]}>{props.article} </Text>

      <Text style={[styles.fontBold, styles.font12, material.caption, styles.background]}>{props.byline} </Text>

      <Image style={[styles.image, styles.marginBox]} source={{ uri: props.image }} />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 10,
    width: 0.9 * width,
    margin: 8,
  },
  textInput: {
    alignItems: "flex-start",
    height: 0.03 * height,
    width: 0.75 * width,
    color: 'black',
  },
  font10: {
    fontSize: 10,
  },
  font12: {
    fontSize: 12,
  },
  font18: {
    fontSize: 18,
  },
  fontBold: {
    fontWeight: 'bold',
  },
  headline: {
    color: "#094067",
  },
  fontGray: {
    color: '#5f67cb',
  },
  background: {
    color: "#ef4565",
  },
  image: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    width: 600,
    height: 200,
  },
  marginBox: {
    marginVertical: 10,
  },
});