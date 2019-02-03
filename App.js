import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import './app/utils/firebase';
//import Customer from './app/utils/routes/customer';
import { Products } from './app/screens/customer';
//import Farmer from './app/utils/routes/farmer';

import MainApp from './app/utils/routes/login';

global.snapsToArray = snaps => {
  let data = [];
  snaps.forEach(docSnap => { data.push(docSnap.data()) })
  return data;
}

export default MainApp;

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Customer />
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
