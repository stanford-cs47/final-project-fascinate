import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { material } from 'react-native-typography';

export default class Fact extends React.Component {

  state = {
    fact: "",
  }

  constructor(props) {
    super(props);
    this.loadData();  
  }

  loadData = async () => {
    /**
     * Use the fetch function to get data from the
     * facts APIs.
     */
    try {
      addresses = ["https://uselessfacts.jsph.pl/random.json?language=en", "http://numbersapi.com/random/trivia?json"];
      const response = await fetch(addresses[Math.floor(Math.random() * addresses.length)]);
      const responseJSON = await response.json();
      const fact = await responseJSON.text;
      this.setState({ fact });
      console.log(fact)
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[material.body2, styles.marginBox, styles.textColor]}> {this.state.fact} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "green",
  },
  marginBox: {
    marginHorizontal: 10,
  },
  image: {
    flexDirection: "row",
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    width: 80,
    height: 80,
    marginLeft: 75,
  },
  textColor: {
    color: "#094067",
  },
});
