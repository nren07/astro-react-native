import React from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '@/app/style';

const Kundli: React.FC<{ [key: string]: any }> = (props) => {
  console.log('Received props:', props);

  return (
    <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.gradientContainer}>
      <View style={styles.itemContainer}>
        {Object.entries(props).map(([key, value]) => (
          <View key={key} style={{ marginVertical: 5 }}> 
            <Text style={styles.itemText}>{`${key}: ${value}`}</Text>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
};

export default Kundli;
