import React, { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const DateInput: React.FC = () => {
  const [date, setDate] = useState<string>("");

  // Handle input change and enforce YYYY-MM-DD format
  const handleChange = (input: string) => {
    // Replace non-digit characters
    const formattedDate = input.replace(/\D/g, "");

    // Format to YYYY-MM-DD
    const year = formattedDate.slice(0, 4);
    const month = formattedDate.slice(4, 6);
    const day = formattedDate.slice(6, 8);

    let result = "";
    if (year) result += year;
    if (month) result += `-${month}`;
    if (day) result += `-${day}`;

    setDate(result);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Date (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        value={date}
        onChangeText={handleChange}
        maxLength={10} // YYYY-MM-DD is 10 characters long
      />
      <Text style={styles.output}>Entered Date: {date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  output: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default DateInput;
