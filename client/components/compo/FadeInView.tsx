import React, { useRef, useEffect } from 'react';
import { Animated, ViewStyle } from 'react-native';
import styles from '@/app/style';

// Fade-In Animation for the entire container
interface FadeInViewProps {
  style?: ViewStyle;
  children: React.ReactNode;
}

const FadeInView: React.FC<FadeInViewProps> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1, // Final opacity: 1 (fully visible)
      duration: 3000, // 3 seconds for fade-in
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind animated opacity to the container
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default FadeInView;
