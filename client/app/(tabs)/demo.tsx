import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, FlatList, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FadeInView from '../../components/compo/FadeInView';
import SlideInList from '../../components/compo/SlideInList';
import RotateButton from '../../components/compo/RotateButton';
import styles from '../style';


// Main App
const Demo: React.FC = () => {
  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientContainer}>
      {/* Fade-In for the entire container */}
      <FadeInView style={styles.container}>
        {/* Slide-In List */}
        <SlideInList data={["item 1","item 2"]} />
        {/* Rotation & Shrink Button */}
        <RotateButton />
      </FadeInView>
    </LinearGradient>
  );
};



export default Demo;
