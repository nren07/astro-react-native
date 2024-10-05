import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Button, Alert } from "react-native";
import styles from "../style";
import InputForm from "@/components/compo/InputForm";
import Kundli from "@/components/compo/Kundli";

const Index: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<{ [key: string]: any } | null>(null);

  const handleReset = () => {
    setSubmittedData(null); // Reset submitted data
  };
  return (
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.gradientContainer}>
      {submittedData ? (
        <View style={styles.container}>
          <Kundli {...submittedData} />
          <Button title="Back to Form" onPress={handleReset} />
        </View>
      ) : (
        <InputForm onSubmit={setSubmittedData} />
      )}
    </LinearGradient>
  );
};

export default Index;
