import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Button from './components/Button';

//<Text style={{ color: '#fff' }}>Hoi</Text>
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="test" />
        <Button theme="add" label="Add ToDo" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
