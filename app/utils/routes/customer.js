import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { Products, Cart, Orders } from '../../screens/customer';

const ProductsStack = createStackNavigator({
  Products: {
    screen: Products
  }
})

const OrdersStack = createStackNavigator({
  Orders: {
    screen: Orders
  }
})

const TabBar = createBottomTabNavigator({
  Products: {
    screen: ProductsStack,
  },
  Orders: {
    screen: OrdersStack
  }
}, 
{
  tabBarOptions: {
    activeTintColor: 'green'
  },
  initialRouteName: 'Products',
  headerMode: 'screen'
})

const CartStack = createStackNavigator({
  Cart: {
    screen: Cart
  }
},
{
  mode: 'modal',
})

const AppStack = createStackNavigator({
  Main: TabBar,
  Cart: CartStack
},
{
  mode: 'modal',
  headerMode: 'none'
})

export default AppStack;
//export default createAppContainer(AppStack);
