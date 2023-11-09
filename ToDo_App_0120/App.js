import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Button from './components/Button';


export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff' }}>Hoi</Text>
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Hoi Button" />
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
