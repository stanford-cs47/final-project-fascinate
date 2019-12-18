// Attempted to utilize API from MyScriptJS for note-taking, but did not work :(

// import React, { Component } from 'react';
// import * as MyScriptJS from 'myscript'
// import { StyleSheet, Text, View } from 'react-native';
// import { material } from 'react-native-typography';

// class NoteApp extends React.Component {

//     state = {
//     }

//     constructor(props) {
//         super(props);
//     }


//     componentDidMount() {
//       this.editor = MyScriptJS.register(this.refs.editor, {
//         recognitionParams: {
//           type: 'TEXT',
//           protocol: 'WEBSOCKET',
//           apiVersion: 'V4',
//           server: {
//             scheme: 'https',
//             host: 'webdemoapi.myscript.com',
//             applicationKey: '1463c06b-251c-47b8-ad0b-ba05b9a3bd01',
//             hmacKey: '60ca101a-5e6d-4159-abc5-2efcbecce059',
//           },
//         },
//       });
//       console.log(typeof(editor))
//       window.addEventListener("resize", () => {this.editor.resize()});
//     }

//   render() {
//     return (
//       <View> {this.editor} </View>
//     );
//   }
// }

// export default NoteApp;