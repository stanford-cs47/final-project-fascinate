import React from 'react';
import { StyleSheet, Text, Image, View, Button, Dimensions, TouchableHighlight, TextInput, SafeAreaView } from 'react-native';
import { material } from 'react-native-typography';
import Fact from '../Components/Fact';
import NoteApp from '../Components/NoteApp';
import * as Google from 'expo-google-app-auth';
import { AuthSession } from 'expo';

import firestore from '../firebase';
import firebase from 'firebase';

const { width, height } = Dimensions.get('window')

const config = {
  expoClientId: "546887755757-tvh7ggaisbqp5mug7u599j4fcdhjvrqs.apps.googleusercontent.com",
  iosClientId: "546887755757-e8j57hodi5a90oks5r729c08vq9iivvo.apps.googleusercontent.com",
  androidClientId: "546887755757-gr0lf7r25ou08d08ovtqdm90kvpcktpo.apps.googleusercontent.com",
};

export default class LoginWGoogle extends React.Component {

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

    const { type, accessToken, user } = await Google.logInAsync(config);

    if (type === 'success') {
      // Then you can use the Google REST API
      let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
    console.log(type);
    console.log(accessToken);
    console.log(user);
    let redirectUrl = AuthSession.getRedirectUrl();
    console.log(redirectUrl);
    let googleWebAppId = "546887755757-tvh7ggaisbqp5mug7u599j4fcdhjvrqs.apps.googleusercontent.com";
    let result = await AuthSession.startAsync({
      authUrl:
        `https://accounts.google.com/o/oauth2/v2/auth?` +
        `&client_id=${googleWebAppId}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}` +
        `&response_type=code` +
        `&access_type=offline` +
        `&scope=profile`,
    });
    console.log(user.givenName);
    console.log(result);
    if (user.email.includes("@stanford.edu")) {
      this.props.navigation.navigate('Home', {
        name: user.givenName,
        // user: user,
        // result: result,
      });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={[styles.image, styles.marginBox]} source={{ uri: "https://fascinatepublicationorg.files.wordpress.com/2016/09/magnum-thin-3.jpg" }} />
        <TouchableHighlight onPress={this.guest} style={[styles.button, styles.marginBox]}>
          <Text color="green"> Login With Your Stanford Account! </Text>
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
