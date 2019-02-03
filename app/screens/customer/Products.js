import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SearchBar, Icon } from 'react-native-elements';

import { db } from '../../utils/firebase';
import { ProductsList } from '../../components/Lists/Products';

export default class Products extends React.Component {
  state = { 
    products: [],
    searchingProduct: '' ,
    orders: []
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Produce',
    tabBarIcon: (
      <Icon 
        name='food-apple'
        type='material-community'
      />
    )
  })

  componentDidMount() {
    this.unsubProducts = db.collection('products').onSnapshot(productsSnap => {
      this.setState({ products: global.snapsToArray(productsSnap) })
    })
  }

  componentWillUnmount() {
    if (this.unsubProducts) this.unsubProducts();
  }

  _handleSearchChange = text => this.setState({ searchingProduct: text })

  _handleProductAddPress = index => this.setState({ 
    orders: [...this.state.orders, {
      ...this.state.products[index],
      amount: 1
    }] 
  })

  _handleCartPress = () => this.props.navigation.navigate('Cart', {
    orders: this.state.orders,
    onSubmit: () => this.setState({ orders: [] })
  });

  render() {
    const { searchingProduct } = this.state;
    let products = this.state.products.slice();
    if (searchingProduct !== '') {
      products = products.filter(p => 
        p.name.toLowerCase().indexOf(searchingProduct.toLowerCase()) >= 0
      );
    }
    return (
      <View style={styles.container}>
        <SearchBar 
          lightTheme={true}
          onChangeText={this._handleSearchChange}
          value={searchingProduct}
        />
        {products &&
          <ProductsList 
            data={products}
            onAddPress={this._handleProductAddPress}
          />
        }
        <TouchableOpacity style={styles.cartbutton} onPress={this._handleCartPress}>
          <Icon name='md-cart' type='ionicon' color='white' iconStyle={{marginTop:4}} size={30}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cartbutton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 54, 
    width: 54, 
    borderRadius: 27,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
