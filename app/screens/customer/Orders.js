import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import { db } from '../../utils/firebase';
import { OrdersList } from '../../components/Lists/Orders';

class Orders extends React.Component {
  state = { orders: [] }

  static navigationOptions = ({ navigation }) => ({
    title: 'Orders',
  })

  componentDidMount() {
    this.unsubOrders = 
      db.collection('orders')
        .where('uid', '==', '_TESTUID_')
        //.orderBy('date')
        .onSnapshot(ordersSnap => {
          this.setState({ orders: global.snapsToArray(ordersSnap) })
        })
  }

  componentWillUnmount() {
    if (this.unsubOrders) this.unsubOrders()
  }

  render() {
    const { orders } = this.state;
    return (
      <View style={styles.container}>
        <OrdersList
          data={orders}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Orders;
