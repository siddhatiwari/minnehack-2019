import React from 'react';
import { FlatList } from 'react-native';

import { Item } from './Item';

const Products = ({ data, onAddPress, showPlus }) => (
  <FlatList 
    renderItem={({ item, index }) => (
      <Item 
        showPlus={showPlus}
        item={item}
        onAddPress={() => onAddPress(index)}
      />
    )}
    data={data}
    keyExtractor={({ item, index }) => index}
  />
);

Products.defaultProps = {
  showPlus: true
}

export default Products;
