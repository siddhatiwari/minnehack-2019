import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Customer from './customer';
import Farmer from './farmer';

import { Login, Reset, Signup } from '../../screens/login';

const LoginStack = createStackNavigator({
  Login: {
    screen: Login
  },
  Reset: {
    screen: Reset
  },
  Signup: {
    screen: Signup
  }
},
{
  headerMode: 'none'
})

const MainApp = createStackNavigator({
  Login: {
    screen: LoginStack
  },
  Customer: {
    screen: Customer
  },
  Farmer: {
    screen: Farmer
  }
},
{
  headerMode: 'none',
  mode: 'modal',
  initialRouteName: 'Login',
})

export default createAppContainer(MainApp);
