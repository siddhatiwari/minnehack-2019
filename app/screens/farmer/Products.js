import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

import { db } from '../../utils/firebase';
import { ProductsList }  from '../../components/Lists/Products';

class Products extends React.Component {
  state = { 
    products: [],
    showAddProductModal: false,
    produceName: ''
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Your Produce',
  })

  componentDidMount() {
    this.unsubProjects = 
      db.collection('products')
        .where('farmerId', '==', '_TESTFARMER_')
        .orderBy('name')
        .onSnapshot(ordersSnap => {
          this.setState({ products: global.snapsToArray(ordersSnap) })
        })
  }

  componentWillUnmount() {
    if (this.unsubProjects) this.unsubProjects();
  }

  _handleAddProductPress = () => {
    this.setState({ showAddProductModal: true })
    // db.collection('products').add({
    //   farmerId: '_TESTFARMER_',
    //   name: 'banana'
    // })
  }
  _handleAddProductSubmit = () => {

  }
  _handleAddProductCancel = () => this.setState({ showAddProductModal: false, produceName: '' })

  _handleProduceNameChange = text => this.setState({ produceName: text })

  render() {
    const { products, showAddProductModal, produceName } = this.state;
    return(
      <View style={styles.container}>
        <ProductsList data={products} showPlus={false}/>
        <Modal 
          animationType='fade'
          transparent={true}
          visible={showAddProductModal}
          onRequestClose={() => {}}>
          <TouchableOpacity 
            style={styles.background} 
            activeOpacity={1} 
            onPress={this._handleAddProductCancel}>
            <TouchableWithoutFeedback>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Add Produce</Text>
                <TextInput
                  style={styles.produceInput}
                  value={produceName}
                  placeholder='Produce name'
                  onChangeText={this._handleProduceNameChange}
                />  
                <TouchableOpacity 
                  style={styles.addSubmit}
                  onPress={() => {
                    const { produceName } = this.state;
                    this.setState({ showAddProductModal: false })
                    db.collection('products').add({
                      name: produceName,
                      farmerId: '_TESTFARMER_'
                    })
                  }}
                  >
                  <Text style={styles.submitText}>ADD</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
        <TouchableOpacity style={styles.addProduct} onPress={this._handleAddProductPress}>
          <Icon name='plus' type='font-awesome' color='white' iconStyle={{marginTop:4}} size={30}/>
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
  addProduct: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 54,
    width: 54,
    borderRadius: 27,
    backgroundColor: 'green',
    alignItems:'center',
    justifyContent:'center'
  },
  background: {
    flex:1,
    backgroundColor:'rgba(0, 0, 0, .75)',
    alignItems:'center',
    justifyContent:'center'
  },
  card: {
    height: 300,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    justifyContent:'space-between'
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '500'
  },
  addSubmit: {
    backgroundColor: 'green',
    borderRadius: 4,
    padding: 15,
    alignItems:'center',
    justifyContent:'center'
  },
  submitText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600'
  },
  produceInput: {
    fontSize: 15
  }
});


export default Products;
