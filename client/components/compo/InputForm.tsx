import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, Alert} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "@/app/style";
import NetInfo from "@react-native-community/netinfo";

// Define the type for submitData
interface SubmitData {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  timezone: number;
  observation_point: string;
  ayanamsha: string;
  gender: string;
  name: string;
}
interface InputFormProps {
    onSubmit: (data: SubmitData) => void;
  }
  

const InputForm: React.FC<InputFormProps> = ({ onSubmit }) =>{
  const [name, setName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [timeOfBirth, setTimeOfBirth] = useState<string>("");
  const [placeOfBirth, setPlaceOfBirth] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitData, setSubmitData] = useState<SubmitData | null>(null);
  const [KundliData,setKundliData]=useState<{ [key: string]: any }>({});

  const handleDateChange = (input: string) => {
    const formattedDate = input.replace(/\D/g, "");
    const year = formattedDate.slice(0, 4);
    const month = formattedDate.slice(4, 6);
    const day = formattedDate.slice(6, 8);
    const formattedResult = [year, month, day].filter(Boolean).join("-");

    setDob(formattedResult);
  };

  const handleTimeChange = (input: string) => {
    const formattedTime = input.replace(/\D/g, "");
    const hours = formattedTime.slice(0, 2);
    const minutes = formattedTime.slice(2, 4);
    const formattedResult = [hours, minutes].filter(Boolean).join(":");

    if (hours && Number(hours) > 23) {
      setErrors((prev) => ({ ...prev, timeOfBirth: "Hours must be between 00 and 23." }));
    } else if (minutes && Number(minutes) > 59) {
      setErrors((prev) => ({ ...prev, timeOfBirth: "Minutes must be between 00 and 59." }));
    } else {
      setErrors((prev) => ({ ...prev, timeOfBirth: "" })); // Clear error if valid
    }

    setTimeOfBirth(formattedResult);
  };

  const validateForm = useCallback(() => {
    const newErrors: { [key: string]: string } = {};
    if (!name) newErrors.name = "Name is required.";
    if (!dob || !/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      newErrors.dob = "Invalid date format (YYYY-MM-DD).";
    } else {
      const inputDate = new Date(dob);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set time to midnight to compare only dates
      if (inputDate > today) {
        newErrors.dob = "Date cannot be in the future.";
      }
    }
    if (!timeOfBirth || !/^\d{2}:\d{2}$/.test(timeOfBirth)) newErrors.timeOfBirth = "Invalid time format (HH:MM).";
    if (!placeOfBirth) newErrors.placeOfBirth = "Place of birth is required.";
    if (!gender) newErrors.gender = "Gender is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, dob, timeOfBirth, placeOfBirth, gender]);

  const handleSubmit = useCallback(() => {
    if (validateForm()) {
      const requestData = {
        year: parseInt(dob.slice(0, 4)),
        month: parseInt(dob.slice(5, 7)),
        date: parseInt(dob.slice(8, 10)),
        hours: parseInt(timeOfBirth.slice(0, 2)),
        minutes: parseInt(timeOfBirth.slice(3, 5)),
        seconds: 0,
        timezone: 5.5, // Adjust as needed
        observation_point: 'topocentric',
        ayanamsha: 'lahiri',
        gender: gender,
        name: name,
      };
      setSubmitData(requestData);
    }
  }, [validateForm, name, dob, timeOfBirth, placeOfBirth, gender]);

  useEffect(()=>{
    NetInfo.fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
  },[])
  useEffect(() => {
    const submitToApi = async () => {
      if (submitData) {
          const response = fetch("http://192.168.145.130:5000/fetchLocation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({...submitData,placeOfBirth}),
          }).then(response=>{
              return response.json();
          }).then(data=>{
            // Reset form fields
            setName("");
            setDob("");
            setTimeOfBirth("");
            setPlaceOfBirth("");
            setGender("");
            setErrors({});
            setSubmitData(null);   
            Alert.alert(
                "Kundli Information",
                JSON.stringify(data, null, 2),
                [{ text: "OK" }]
              );
          }).catch(error=>{
            Alert.alert(error);
          })
      }
    };

    submitToApi();
  }, [submitData]);

  return (
    <View style={styles.container}>
    <Text style={styles.itemText}>Kundli Generation Form</Text>
    <View style={styles.itemContainer}>
      <TextInput
        style={styles.itemInput}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        style={styles.itemInput}
        placeholder="DOB (YYYY-MM-DD)"
        value={dob}
        onChangeText={handleDateChange}
        maxLength={10} // YYYY-MM-DD is 10 characters long
      />
      {errors.dob && <Text style={styles.errorText}>{errors.dob}</Text>}

      <TextInput
        style={styles.itemInput}
        placeholder="Time of Birth (HH:MM)"
        value={timeOfBirth}
        onChangeText={handleTimeChange}
        maxLength={5} // HH:MM is 5 characters long
      />
      {errors.timeOfBirth && <Text style={styles.errorText}>{errors.timeOfBirth}</Text>}

      <TextInput
        style={styles.itemInput}
        placeholder="Place of Birth"
        value={placeOfBirth}
        onChangeText={setPlaceOfBirth}
      />
      {errors.placeOfBirth && <Text style={styles.errorText}>{errors.placeOfBirth}</Text>}

      <TextInput
        style={styles.itemInput}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      {errors.gender && <Text style={styles.errorText}>{errors.gender}</Text>}
    </View>
    
    <View style={styles.button}>
      <Text style={styles.buttonText} onPress={handleSubmit}>Submit</Text>
    </View>
    </View>
  );
};

export default InputForm;
