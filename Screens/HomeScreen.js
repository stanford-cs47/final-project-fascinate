import React from 'react';
import { StyleSheet, Text, Dimensions, View, Button, Image, SafeAreaView, FlatList } from 'react-native';
import { material } from 'react-native-typography';
import Fact from '../Components/Fact';
import firestore from '../firebase';
import firebase from 'firebase';
import Article from '../Components/Article';

const { width, height } = Dimensions.get('window')



export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={material.body2}>{navigation.getParam('name', 'admin')}'s Account</Text>
          <Text style={[material.caption, { fontSize: 10 }]}>Home</Text>
        </View>
      )
    };
  };

  state = {
    articles: [],
  }

  addArticle = () => {
    const { navigation } = this.props;
    this.props.navigation.navigate('NewArticle', {
      name: navigation.state.params.name,
    });
  }

  allArticles = () => {
    const { navigation } = this.props;
    this.props.navigation.navigate('Articles', {
      name: navigation.state.params.name,
    });
  }

  myArticles = () => {
    const { navigation } = this.props;
    this.props.navigation.navigate('MyArticles', {
      name: navigation.state.params.name,
    });
  }

  logout = () => {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
    this.props.navigation.navigate('Login', {
    });
  }

  updateArticlesState = docData => {
    var tempArticles = this.state.articles;
    tempArticles.push(docData);
    this.setState({ articles: tempArticles });
    console.log(this.state.articles);
  }

  updateFunction = () => {
    const { navigation } = this.props;
    const collRef = firestore.collection(navigation.state.params.name);
    let query = collRef.get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id, '=>', doc.data());
          this.updateArticlesState(doc.data());
        });
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });

  }
  componentDidMount() {
    this.updateFunction();
  }

  render() {
    const { navigation } = this.props;
    console.log(navigation);
    return (
      <SafeAreaView style={styles.container}>
        <Image style={[styles.image, styles.marginBox]} source={{ uri: "https://fascinatepublicationorg.files.wordpress.com/2016/09/magnum-thin-3.jpg" }} />
        <Text style={[material.display1, styles.factColor]}> Fact of the day!</Text>
        <Fact/>
        <Button onPress={this.addArticle} title="Add an Article" />
        <Button onPress={this.allArticles} title="All Articles" />
        <Button onPress={this.myArticles} title="My Articles" />
        <Button onPress={this.logout} title="Log out" />
        <View style = {styles.hugeMarginBox}/>
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
  articleView: {
    flex: 10,
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
  hugeMarginBox: {
    flex: 5,
  },
  articleColor: {
    color: "#ef4565",
  },
  factColor: {
    color: "#094607",
  },
});
