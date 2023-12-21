import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userDataJson = await AsyncStorage.getItem(username);
      if (!userDataJson) {
        Alert.alert('Benutzername existiert nicht.');
        return;
      }

      const userData = JSON.parse(userDataJson);
      if (userData.password !== password) {
        Alert.alert('Falsches Passwort.');
        return;
      }

      navigation.navigate('Main', { username: username });
    } catch (e) {
      Alert.alert('Anmeldefehler', 'Es ist ein Fehler beim Anmelden aufgetreten.');
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
        onPress={handleLogin}
      >
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
      >
        <Text>Noch kein Konto? Registrieren</Text>
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
    backgroundColor: 'lightblue',
    padding: 10,
    marginTop: 20,
  },
});

export default LoginScreen;
