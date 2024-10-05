import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, FlatList, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';

import styles from '../../app/style';
import { TextInput } from 'react-native-gesture-handler';
// Slide-In Animation for List Items
interface SlideInItemProps {
    item: string;
    index: number;
  }

const SlideInItem: React.FC<SlideInItemProps> = ({ item, index }) => {
    const slideAnim = useRef(new Animated.Value(-100)).current;
  
    useEffect(() => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        delay: index * 300,
        useNativeDriver: true,
      }).start();
    }, [slideAnim, index]);
  
    return (
      <Animated.View style={{ ...styles.itemContainer, transform: [{ translateX: slideAnim }] }}>
        <Text style={styles.itemText}>{item}</Text>
      </Animated.View>
    );
  };

  export default SlideInItem;