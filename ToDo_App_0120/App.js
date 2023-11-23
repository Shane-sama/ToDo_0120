import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const MainScreen = ({ navigation, todos, setTodos }) => {
  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <View style={styles.container}>
      <Text>Main Screen</Text>
      {todos.map((todo, index) => (
        <TouchableOpacity key={index} onPress={() => deleteTodo(index)}>
          <Text>{todo}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddToDo')}
      >
        <Text>Add ToDo</Text>
      </TouchableOpacity>
    </View>
  );
};

const AddToDoScreen = ({ navigation, todos, setTodos }) => {
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      navigation.navigate('Main');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Add ToDo Screen</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter ToDo"
        onChangeText={(text) => setNewTodo(text)}
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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          options={{
            title: 'ToDo App',
            headerRight: () => (
              <TouchableOpacity onPress={() => setTodos([])}>
                <Text style={{ marginRight: 20 }}>Clear All</Text>
              </TouchableOpacity>
            ),
          }}
        >
          {(props) => <MainScreen {...props} todos={todos} setTodos={setTodos} />}
        </Stack.Screen>
        <Stack.Screen
          name="AddToDo"
          options={{ title: 'Add ToDo' }}
        >
          {(props) => <AddToDoScreen {...props} todos={todos} setTodos={setTodos} />}
        </Stack.Screen>
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