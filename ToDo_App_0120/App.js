import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const MainScreen = ({ navigation, todos, setTodos, setCurrentUser, route }) => {
  useEffect(() => {
    if (route.params?.username) {
      setCurrentUser(route.params.username);
      loadTodos(route.params.username);
    }
  }, [route.params?.username]);

  const loadTodos = async (username) => {
    let userDataJson = await AsyncStorage.getItem(username);
    let userData = userDataJson ? JSON.parse(userDataJson) : { todos: [] };
    setTodos(userData.todos);
  };

  const saveTodosForUser = async (username, newTodos) => {
    let userDataJson = await AsyncStorage.getItem(username);
    let userData = userDataJson ? JSON.parse(userDataJson) : {};
    userData.todos = newTodos;
    await AsyncStorage.setItem(username, JSON.stringify(userData));
  };

  const deleteTodo = async (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    await saveTodosForUser(route.params.username, newTodos);
  };

  const clearAllTodos = async () => {
    if (route.params?.username) {
      const username = route.params.username;
      let userDataJson = await AsyncStorage.getItem(username);
      let userData = JSON.parse(userDataJson);
      await AsyncStorage.setItem(username, JSON.stringify({ ...userData, todos: [] }));
      setTodos([]);
    }
  };

  return (
    <View style={styles.container}>
      {todos.map((todo, index) => (
        <TouchableOpacity key={index} onPress={() => deleteTodo(index)}>
          <Text>{todo}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddToDo', { username: route.params?.username, setTodos })}
      >
        <Text>Add ToDo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.clearButton}
        onPress={clearAllTodos}
      >
        <Text>Clear All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          await setCurrentUser(null);
          navigation.navigate('Login');
        }}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const AddToDoScreen = ({ navigation, route }) => {
  const [newTodo, setNewTodo] = useState('');
  const { username, setTodos } = route.params;

  const addTodo = async () => {
    if (newTodo.trim() !== '') {
      let userDataJson = await AsyncStorage.getItem(username);
      let userData = userDataJson ? JSON.parse(userDataJson) : { todos: [] };
      const newTodos = [...userData.todos, newTodo];
      await AsyncStorage.setItem(username, JSON.stringify({ ...userData, todos: newTodos }));
      setTodos(newTodos);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter ToDo"
        value={newTodo}
        onChangeText={setNewTodo}
      />
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={addTodo}
      >
        <Text>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  const [todos, setTodos] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main">
          {(props) => <MainScreen {...props} todos={todos} setTodos={setTodos} setCurrentUser={setCurrentUser} />}
        </Stack.Screen>
        <Stack.Screen name="AddToDo" component={AddToDoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: 'grey',
    padding: 10,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginTop: 20,
    width: '80%',
  },
  confirmButton: {
    backgroundColor: 'lightgreen',
    padding: 10,
    marginTop: 20,
  },
});
