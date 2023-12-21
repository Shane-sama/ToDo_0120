import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const userData = await AsyncStorage.getItem(username);
      if (userData) {
        Alert.alert('Benutzername existiert bereits.');
        return;
      }

      await AsyncStorage.setItem(username, JSON.stringify({ password, todos: [] }));
      Alert.alert('Registrierung erfolgreich!', 'Sie können sich jetzt anmelden.');
      navigation.navigate('Login');
    } catch (e) {
      Alert.alert('Registrierungsfehler', 'Es ist ein Fehler bei der Registrierung aufgetreten.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 20,
    width: '80%',
  },
  button: {
    backgroundColor: 'lightgreen',
    padding: 10,
    marginTop: 20,
  },
});

export default RegisterScreen;
