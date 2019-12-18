import React from 'react';
import { StyleSheet, Text, Image, View, Button, Dimensions, TouchableHighlight, TextInput, SafeAreaView } from 'react-native';
import { material } from 'react-native-typography';

import firestore from '../firebase';
import firebase from 'firebase';

const { width, height } = Dimensions.get('window')

export default class Guest extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={material.body2}>Fascinate</Text>
          <Text style={[material.caption, { fontSize: 10 }]}>Guest</Text>
        </View>
      )
    };
  };

  constructor(props) {
    super(props);
  }

  guest = async () => {
    name = "Guest";
    this.props.navigation.navigate('Home', {
      name: name,
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Image style={[styles.image, styles.marginBox]} source={{ uri: "https://fascinatepublicationorg.files.wordpress.com/2016/09/magnum-thin-3.jpg" }} />
        <TouchableHighlight onPress={this.guest} style={[styles.button, styles.marginBox]}>
          <Text color="green"> Browse as Guest </Text>
        </TouchableHighlight>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    flexDirection: "column",
    backgroundColor: '#b0eeee',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
  },
  image: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center",
    width: 320,
    height: 64,
  },
  text: {
    alignItems: "flex-start",
    flex: 1,
    height: 0.03 * height,
    width: 0.75 * width,
  },
  textColor: {
    color: "#5f6c7b",
  },
  textInput: {
    alignItems: "flex-start",
    flex: 0.25,
    height: 0.3 * height,
    width: 0.75 * width,
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#3da9fc',
    padding: 10,
    borderRadius: 10,
  },
  marginBox: {
    marginVertical: 10,
  },
  red: {
    color: "red",
  },
});
