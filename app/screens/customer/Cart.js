import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase';

import { db } from '../../utils/firebase';
import { CartItems } from '../../components/Lists/CartItems';

class Cart extends React.Component {
  constructor(props) {
    super(props)
    const navProps = props.navigation.state.params;
    this.state = {
      orders: navProps.orders,
      onSubmit: navProps.onSubmit
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Cart',
    headerLeft: (
      <Icon 
        name='close'
        type='material-community'
        iconStyle={{marginLeft:16}}
        onPress={() => navigation.pop()}
      />
    )
  })

  _handleSubmitPress = () => {
    const { orders, onSubmit } = this.state;
    db.collection('orders').add({
      uid: '_TESTUID_',
      date: firebase.firestore.FieldValue.serverTimestamp(),
      items: orders,
    });
    onSubmit();
    this.props.navigation.pop();
  }

  render() {
    const { orders } = this.state;
    return (
      <View style={styles.container}>
        <CartItems 
          data={orders}
        />
        <TouchableOpacity 
          style={[styles.completeButton, { opacity: orders.length === 0 ? 0.5 : 1 }]} 
          onPress={this._handleSubmitPress}
          disabled={orders.length === 0}
        >
          <Text style={styles.completeText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  completeButton: {
    height: 70,
    width: '100%',
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },
  completeText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600'
  }
});


export default Cart;
