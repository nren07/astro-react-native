import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, FlatList, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';

import styles from '../../app/style';

// Rotation and Shrink Button Animation
const RotateButton: React.FC = () => {
    const rotateAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;
  
    const rotate = () => {
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 0.9,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        rotateAnim.setValue(0); // Reset after rotation
      });
    };
  
    const rotateInterpolate = rotateAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
  
    return (
      <TouchableOpacity onPress={rotate}>
        <Animated.View
          style={{
            transform: [{ rotate: rotateInterpolate }, { scale: scaleAnim }],
          }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Rotate</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  export default RotateButton;