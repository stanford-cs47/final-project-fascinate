import React from 'react';
import { StyleSheet, Text, Dimensions, Image, View, Button, Platform, TextInput, SafeAreaView } from 'react-native';
import { material } from 'react-native-typography';
import firestore from '../firebase';
import firebase from 'firebase';
import * as Google from 'expo-google-app-auth';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const { width, height } = Dimensions.get('window')


export default class NewArticle extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={material.body2}>{navigation.getParam('name', 'admin')}'s Account</Text>
          <Text style={[material.caption, { fontSize: 10 }]}>Add an Article!</Text>
        </View>
      )
    };
  };

  state = {
    title: "",
    article: "",
    image: null,
  }

  constructor(props) {
    super(props);
  }

  onChangeTitle = title => {
    this.setState({ title });
  }

  onChangeArticle = article => {
    this.setState({ article });
  }


  upload = async () => {
    const { navigation } = this.props;
    // var storageRef = firebase.storage().ref();

    // storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
    //   console.log('Uploaded', snapshot.totalBytes, 'bytes.');
      
    //   let db = firebase.firestore();
    //   let dbRef = db.collection("images").doc(file.name);
      
    //   let setData = dbRef.set({
    //       downloadURl: this.state.image
    //   }).then( () => {
    //       console.log("Data stored in Firestore!");
    //   });
    // });
      
    // var imageRef = storageRef.child('images/' + this.state.title + '.jpg');

    const collRef = firestore.collection(navigation.state.params.name);
    let blob = new Blob([this.state.image], {type: 'image/png'});
    console.log(blob);
    await collRef.add({
      title: this.state.title,
      article: this.state.article,
      byline: navigation.state.params.name,
      image: this.state.image,
    });
    // this.uploadImage(collRef, this.state.image);

    const collRef2 = firestore.collection("articles");
    await collRef2.add({
      title: this.state.title,
      article: this.state.article,
      byline: navigation.state.params.name,
      image: this.state.image,
    });
    // this.uploadImage(collRef2, this.state.image);

    this.props.navigation.navigate('Home', {
      name: navigation.state.params.name,
    });
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  render() {
    const { navigation } = this.props;
    let { image } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Image style={[styles.image, styles.marginBox]} source={{ uri: "https://fascinatepublicationorg.files.wordpress.com/2016/09/magnum-thin-3.jpg" }} />
        <Text style={[styles.text, styles.marginBox, material.display1]}>Title</Text>
        <TextInput
          style={[styles.textInput, styles.marginBox]}
          onChangeText={text => this.onChangeTitle(text)}
          value={this.state.title}
          defaultValue={""}
        />
        <Text style={[styles.text, styles.marginBox, material.display1]}>Article</Text>
        <TextInput
          style={[styles.textInput2, styles.marginBox]}
          onChangeText={text => this.onChangeArticle(text)}
          multiline={true}
          value={this.state.article}
          defaultValue={""}
        />
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <Button onPress={this.upload} color="green" title="Upload" />
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
  textInput: {
    alignItems: "flex-start",
    flex: 0.25,
    height: 0.3 * height,
    width: 0.75 * width,
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
  },
  textInput2: {
    alignItems: "flex-start",
    flex: 2,
    height: 0.3 * height,
    width: 0.75 * width,
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
  },
  marginBox: {
    marginVertical: 10,
  }
});
