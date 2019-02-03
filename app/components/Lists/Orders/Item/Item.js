import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

class Item extends React.PureComponent {
  render() {
    const { order } = this.props;
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.image}/>
          <Text style={styles.title}>{order.items.reduce(((acc, p, i) => acc + p.name + (i < order.items.length - 1 ? ', ' : '')), '')}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    paddingLeft: 24,
    paddingRight: 24,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 19,
  },
  image: {
    height: 50, 
    width: 50, 
    borderRadius: 25, 
    backgroundColor: 'green',
    marginRight: 15
  },
  addButton: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'green'
  }
});


export default Item;

