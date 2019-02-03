import React from 'react';
import { FlatList } from 'react-native';

import { Item } from './Item';

const Orders = ({ data, onAddPress }) => (
  <FlatList 
    renderItem={({ item, index }) => (
      <Item 
        item={item}
        onAddPress={() => onAddPress(index)}
      />
    )}
    data={data}
    keyExtractor={({ item, index }) => index}
  />
);

export default Orders;
