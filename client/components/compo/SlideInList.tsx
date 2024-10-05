import React from 'react';
import { FlatList, ViewStyle, TextStyle } from 'react-native';
import SlideInItem from './SlideInItemProps';

interface SlideInListProps {
  data: Array<any>; // You can replace `any` with a specific type based on your data structure
  style?: ViewStyle; // Optional style prop
}

const SlideInList: React.FC<SlideInListProps> = (props) => {
  return (
    <FlatList
      data={props.data} // Ensure you're passing data correctly
      renderItem={({ item, index }) => <SlideInItem item={item} index={index} />}
      keyExtractor={(item, index) => index.toString()} // Use index as a key if items do not have a unique identifier
      style={props.style} // Optionally apply styles from props
    />
  );
};

export default SlideInList;
