import React from 'react';
import { StyleSheet, Text, Image, View, TouchableHighlight, Dimensions, TextInput, SafeAreaView } from 'react-native';
import { material } from 'react-native-typography';
import Fact from '../Components/Fact';

import firestore from '../firebase';
import firebase from 'firebase';

const { width, height } = Dimensions.get('window')

export default class Register extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={material.body2}>Fascinate</Text>
          <Text style={[material.caption, { fontSize: 10 }]}>Register</Text>
        </View>
      )
    };
  };

  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    errorMessage: "",
  }

  constructor(props) {
    super(props);
  }

  register = async () => {
    email = this.state.email;
    password = this.state.password;
    await firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      this.setState({ errorMessage });
    });
    name = this.state.firstName;
    const collRef = firestore.collection(name);
    this.props.navigation.navigate('Home', {
      name: name,
    });
  }

  onChangeFirstName = firstName => {
    this.setState({ firstName });
  }

  onChangeLastName = lastName => {
    this.setState({ lastName });
  }

  onChangeEmail = email => {
    this.setState({ email });
  }

  onChangePassword = password => {
    this.setState({ password });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image style={[styles.image, styles.marginBox]} source={{ uri: "https://fascinatepublicationorg.files.wordpress.com/2016/09/magnum-thin-3.jpg" }} />
        <Text style={[styles.text, styles.marginBox, material.display1, styles.textColor]}>First Name</Text>
        <TextInput
          style={[styles.textInput, styles.marginBox]}
          onChangeText={text => this.onChangeFirstName(text)}
          value={this.state.firstName}
          defaultValue={""}
        />
        <Text style={[styles.text, styles.marginBox, material.display1, styles.textColor]}>Last Name</Text>
        <TextInput
          style={[styles.textInput, styles.marginBox]}
          onChangeText={text => this.onChangeLastName(text)}
          value={this.state.lastName}
          defaultValue={""}
        />
        <Text style={[styles.text, styles.marginBox, material.display1, styles.textColor]}>Email</Text>
        <TextInput
          style={[styles.textInput, styles.marginBox]}
          onChangeText={text => this.onChangeEmail(text)}
          value={this.state.email}
          defaultValue={""}
        />
        <Text style={[styles.text, styles.marginBox, material.display1, styles.textColor]}>Password</Text>
        <TextInput
          style={[styles.textInput, styles.marginBox]}
          onChangeText={text => this.onChangePassword(text)}
          value={this.state.password}
          defaultValue={""}
        />
        <Text style={[styles.text, styles.marginBox, material.display1, styles.red]}>{this.state.errorMessage}</Text>
        <TouchableHighlight onPress={this.register} style={[styles.button, styles.marginBox]}>
          <Text color="green"> Register </Text>
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
    justifyContent: 'center',
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
    flex: 0.6,
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
