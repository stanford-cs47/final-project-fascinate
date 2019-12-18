import React from 'react';
import { Alert, StyleSheet, Text, TextInput, Button, Image, View, Dimensions, FlatList, SafeAreaView } from 'react-native';
import { Keyboard } from 'react-native';
import { material } from 'react-native-typography';

import Article from '../Components/Article';

import firestore from '../firebase';
import firebase from 'firebase';

const { width, height } = Dimensions.get('window')

export default class Articles extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    return {
      headerTitle: (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={material.body2}>Fascinate</Text>
          <Text style={[material.caption, { fontSize: 10 }]}>All Articles!</Text>
        </View>
      )
    };
  };

  state = {
    loading: true,
    articles: [],
  }

  getArticleContent = () => {
    const { articles, loading } = this.state;

    let contentDisplayed = null;

    if (loading) {
      contentDisplayed =
        <ActivityIndicator
          style={styles.ActivityIndicator}
          size="large" color="black" />;
    } else {
      contentDisplayed = <News articles={articles} />;
    }

    return (
      <View style={{ flex: 1 }}>
        {contentDisplayed}
      </View>
    )
  }

  updateArticlesState = docData => {
    var tempArticles = this.state.articles;
    tempArticles.push(docData);
    this.setState({ articles: tempArticles });
    // console.log(this.state.articles);
  }

  updateFunction = () => {
    const collRef = firestore.collection("articles");
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
    const { articles, loading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Image style={[styles.image, styles.marginBox]} source={{ uri: "https://fascinatepublicationorg.files.wordpress.com/2016/09/magnum-thin-3.jpg" }} />

        <FlatList
          data={this.state.articles}
          renderItem={({ item }) =>
            <Article
              byline={item.byline}
              article={item.article}
              title={item.title}
              image={item.image}
            />
          }
          keyExtractor={(item) => {
            return item.title
          }}
        />
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
  red: {
    color: "red",
  },
});